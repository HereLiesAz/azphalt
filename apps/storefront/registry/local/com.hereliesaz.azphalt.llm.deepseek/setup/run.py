#!/usr/bin/env python3
"""Runner for an azphalt kind:"llm" package (spec/llm.md § Protocols, `github-actions-runner`).

Runs in the package's private GitHub Actions sandbox. Reads the dispatch `task` (JSON, env TASK),
reports progress to a check run named by the task's correlation id (`<seq>\\t<message>` lines), calls
the model, and writes `result.json` for the workflow to upload as the `azphalt-llm-result` artifact.

It is also the trusted translator of § Rolling delimiters: segments the host wrapped in the current
turn's tag become separate `user`-role messages, with every session tag and native control marker
scrubbed out, so tags never reach the model. Output containing any session tag is rejected.

Standard library only: the sandbox installs nothing it has not pinned.
"""
import base64
import hashlib
import hmac
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
HOME = os.environ.get("AZPHALT_LLM_HOME", os.path.expanduser("~/.azphalt-llm"))
RESULT = os.path.join(os.environ.get("GITHUB_WORKSPACE", os.getcwd()), "result.json")
# spec/llm.md § github-actions-runner: a host bounds result.json at 2 MB; stay well inside it.
MAX_TEXT = 1_500_000
# Chat-template control tokens and role markers of the common open-weight families.
NATIVE_MARKERS = re.compile(r"<\|[A-Za-z0-9_]{1,40}\|>|\[/?INST\]|<</?SYS>>|</?s>|<start_of_turn>|<end_of_turn>")


class TaskError(Exception):
    """A failure to report in result.json rather than as a crash."""


def package_env():
    env = {}
    with open(os.path.join(HERE, "package.env"), encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                env[key] = value
    return env


class Progress:
    """The check run a host follows: `output.text` holds append-only `<seq>\\t<message>` lines."""

    def __init__(self, name):
        self.lines = []
        self.id = None
        self.repo = os.environ.get("GITHUB_REPOSITORY")
        self.token = os.environ.get("GITHUB_TOKEN")
        if not (self.repo and self.token and os.environ.get("GITHUB_SHA")):
            return
        body = {"name": name, "head_sha": os.environ["GITHUB_SHA"], "status": "in_progress",
                "output": {"title": "azphalt-llm", "summary": "Running", "text": ""}}
        created = self._api("POST", f"/repos/{self.repo}/check-runs", body)
        self.id = created.get("id") if created else None

    def _api(self, method, path, body):
        req = urllib.request.Request("https://api.github.com" + path, method=method, data=json.dumps(body).encode(),
                                     headers={"authorization": "Bearer " + self.token, "accept": "application/vnd.github+json",
                                              "content-type": "application/json", "x-github-api-version": "2022-11-28"})
        try:
            with urllib.request.urlopen(req, timeout=30) as res:
                return json.load(res)
        except (urllib.error.URLError, TimeoutError, ValueError) as e:
            # Progress is advisory; the artifact is the result. Never fail a run over it.
            print(f"check run update failed: {e}", file=sys.stderr)
            return None

    def step(self, message, conclusion=None):
        self.lines.append(f"{len(self.lines) + 1}\t{message}")
        print(message)
        if self.id is None:
            return
        body = {"output": {"title": "azphalt-llm", "summary": message, "text": "\n".join(self.lines)[-65000:]}}
        if conclusion:
            body.update(status="completed", conclusion=conclusion)
        self._api("PATCH", f"/repos/{self.repo}/check-runs/{self.id}", body)


def turn_tag(key, n):
    """tag_n = base32(HMAC-SHA256(sessionKey, "azphalt-llm-turn:" || n))[0:26]."""
    digest = hmac.new(key, f"azphalt-llm-turn:{n}".encode(), hashlib.sha256).digest()
    return base64.b32encode(digest).decode()[:26]


def session_key(task):
    raw = task.get("sessionKey")
    if raw is None:
        return None
    if not isinstance(raw, str):
        raise TaskError("sessionKey must be a base64url string")
    try:
        key = base64.urlsafe_b64decode(raw + "=" * (-len(raw) % 4))
    except ValueError as e:
        raise TaskError("sessionKey is not base64url") from e
    if len(key) < 16:
        raise TaskError("sessionKey must decode to at least 16 bytes")
    return key


def scrub(text, tags):
    for tag in tags:
        text = text.replace(f"⟦{tag}⟧", "").replace(f"⟦/{tag}⟧", "")
    return NATIVE_MARKERS.sub("", text)


def translate(messages, key, turn):
    """Map tagged material to separate user-role messages. Returns (messages, every session tag)."""
    if not isinstance(messages, list) or not messages:
        raise TaskError("messages must be a non-empty array")
    tags = [turn_tag(key, n) for n in range(turn + 1)] if key else []
    out = []

    def add(role, content):
        if content.strip():
            out.append({"role": role, "content": content})

    for m in messages:
        if not isinstance(m, dict) or m.get("role") not in ("system", "user", "assistant") or not isinstance(m.get("content"), str):
            raise TaskError("each message needs a system/user/assistant role and string content")
        role, content = m["role"], m["content"]
        if not tags:
            add(role, content)
            continue
        opening, closing = f"⟦{tags[-1]}⟧", f"⟦/{tags[-1]}⟧"
        pos = 0
        while (start := content.find(opening, pos)) >= 0:
            end = content.find(closing, start + len(opening))
            if end < 0:
                raise TaskError("unterminated tagged segment")
            add(role, content[pos:start])
            add("user", scrub(content[start + len(opening):end], tags))
            pos = end + len(closing)
        add(role, content[pos:])

    for m in out:
        if any(tag in m["content"] for tag in tags):
            raise TaskError("a session tag survived translation")
    return out, tags


def start_llama(env, progress):
    server = os.path.join(HOME, "runtime", "llama-server")
    model = os.path.join(HOME, "fetch", "model.gguf")
    if not (os.path.exists(server) and os.path.exists(model)):
        raise TaskError("the runtime or the weights are missing; setup did not complete")
    progress.step("starting llama.cpp")
    env_vars = dict(os.environ, LD_LIBRARY_PATH=os.path.join(HOME, "runtime"))
    subprocess.Popen([server, "-m", model, "--host", "127.0.0.1", "--port", "8088", "-c", env.get("AZPHALT_LLM_CONTEXT", "4096"), "--jinja"],
                     env=env_vars, stdout=subprocess.DEVNULL, stderr=sys.stderr)
    deadline = time.time() + 600
    while time.time() < deadline:
        try:
            with urllib.request.urlopen("http://127.0.0.1:8088/health", timeout=5) as res:
                if res.status == 200:
                    progress.step("model loaded")
                    return "http://127.0.0.1:8088/v1"
        except (urllib.error.URLError, ConnectionError, TimeoutError):
            pass
        time.sleep(2)
    raise TaskError("llama.cpp did not become ready")


def chat(base_url, model, messages, max_tokens, temperature, key):
    body = {"model": model, "messages": messages, "max_tokens": max_tokens}
    if temperature is not None:
        body["temperature"] = temperature
    headers = {"content-type": "application/json"}
    if key:
        headers["authorization"] = "Bearer " + key
    for attempt in range(3):
        req = urllib.request.Request(base_url.rstrip("/") + "/chat/completions", data=json.dumps(body).encode(), headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=900) as res:
                return json.load(res)
        except urllib.error.HTTPError as e:
            # Keyless tiers rate-limit shared runner IPs (§ Sandbox, Shared IP pools); back off, then give up.
            if e.code in (429, 502, 503) and attempt < 2:
                time.sleep(15 * (attempt + 1))
                continue
            detail = e.read(500).decode("utf-8", "replace")
            raise TaskError(f"model endpoint answered HTTP {e.code}: {detail}") from e
        except (urllib.error.URLError, TimeoutError) as e:
            raise TaskError(f"could not reach the model endpoint: {e}") from e
    raise TaskError("model endpoint kept refusing")


def write_result(result):
    with open(RESULT, "w", encoding="utf-8") as f:
        json.dump(result, f)


def main():
    raw = os.environ.get("TASK", "")
    try:
        task = json.loads(raw)
    except ValueError:
        task = None
    name = task.get("correlationId") if isinstance(task, dict) and isinstance(task.get("correlationId"), str) else "azphalt-llm"
    progress = Progress(name)
    try:
        if not isinstance(task, dict):
            raise TaskError("task is not a JSON object")
        if os.environ.get("SETUP_OUTCOME", "success") != "success":
            raise TaskError("setup failed; see the workflow log")
        env = package_env()
        op = task.get("op", "generate")
        if op not in ("generate", "setup"):
            raise TaskError("op must be generate or setup")
        if op == "setup":
            messages, tags = [{"role": "user", "content": "Reply with the single word: ready"}], []
            max_tokens = 16
        else:
            turn = task.get("turn", 0)
            if not isinstance(turn, int) or turn < 0:
                raise TaskError("turn must be a non-negative integer")
            messages, tags = translate(task.get("messages"), session_key(task), turn)
            max_tokens = task.get("maxTokens", 1024)
            if not isinstance(max_tokens, int) or not 1 <= max_tokens <= 32768:
                raise TaskError("maxTokens must be an integer from 1 to 32768")
        temperature = task.get("temperature")
        if temperature is not None and not isinstance(temperature, (int, float)):
            raise TaskError("temperature must be a number")

        if env["AZPHALT_LLM_TIER"] == "sandbox-weights":
            base_url, model = start_llama(env, progress), "model.gguf"
        else:
            base_url = env["AZPHALT_LLM_BASE_URL"]
            override = task.get("model")
            model = override if isinstance(override, str) and override.strip() else env["AZPHALT_LLM_MODEL"]
        key = os.environ.get("PROVIDER_KEY") or None

        progress.step(f"asking {model}")
        response = chat(base_url, model, messages, max_tokens, temperature, key)
        try:
            text = response["choices"][0]["message"]["content"] or ""
        except (KeyError, IndexError, TypeError) as e:
            raise TaskError("the model returned no message") from e
        if any(tag in text for tag in tags):
            raise TaskError("output contained a session tag; rejected")
        usage = response.get("usage") or {}
        result = {"status": "completed", "message": "ready" if op == "setup" else "done", "text": text[:MAX_TEXT]}
        if isinstance(usage.get("prompt_tokens"), int):
            result["inputTokens"] = usage["prompt_tokens"]
        if isinstance(usage.get("completion_tokens"), int):
            result["outputTokens"] = usage["completion_tokens"]
        write_result(result)
        progress.step("completed", conclusion="success")
    except TaskError as e:
        write_result({"status": "failed", "message": str(e)})
        progress.step(f"failed: {e}", conclusion="failure")


if __name__ == "__main__":
    main()
