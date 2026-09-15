import {
  createPrivateKey,
  createPublicKey,
  randomBytes,
  sign as cryptoSign,
  verify as cryptoVerify,
} from "node:crypto";

/**
 * Accountless buyer recovery session.
 *
 * The storefront deliberately has no user accounts. Paid purchases still need an authenticated way
 * to recover previously-issued entitlement tokens, so the browser keeps a signed, HttpOnly cookie
 * containing opaque buyer subjects. The subjects themselves are random; the signature prevents a
 * buyer who learns somebody else's subject from adding it to their own recovery session.
 */
const COOKIE_NAME = "azphalt_buyer_session";
const COOKIE_VERSION = 1;
const MAX_SUBJECTS = 12;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const SUBJECT = /^buyer_[A-Za-z0-9_-]{20,128}$/;

interface BuyerSessionPayload {
  v: typeof COOKIE_VERSION;
  subjects: string[];
}

function signingKey(): ReturnType<typeof createPrivateKey> | undefined {
  const pem = process.env.AZPHALT_SIGNING_KEY;
  if (!pem) return undefined;
  try {
    const key = createPrivateKey(pem);
    return key.asymmetricKeyType === "ed25519" ? key : undefined;
  } catch {
    return undefined;
  }
}

function cookieValue(req: Request): string | undefined {
  const raw = req.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const name = part.slice(0, i).trim();
    if (name === COOKIE_NAME) return part.slice(i + 1).trim();
  }
  return undefined;
}

/** Every buyer subject authenticated by this browser session, newest first. */
export function buyerSubjects(req: Request): string[] {
  const value = cookieValue(req);
  const key = signingKey();
  if (!value || !key) return [];

  const dot = value.indexOf(".");
  if (dot <= 0 || dot === value.length - 1) return [];
  const payload64 = value.slice(0, dot);
  const signature64 = value.slice(dot + 1);

  try {
    const signature = Buffer.from(signature64, "base64url");
    const valid = cryptoVerify(
      null,
      Buffer.from(payload64, "utf8"),
      createPublicKey(key),
      signature,
    );
    if (!valid) return [];

    const payload = JSON.parse(Buffer.from(payload64, "base64url").toString("utf8")) as BuyerSessionPayload;
    if (payload.v !== COOKIE_VERSION || !Array.isArray(payload.subjects)) return [];
    return payload.subjects
      .filter((subject): subject is string => typeof subject === "string" && SUBJECT.test(subject))
      .slice(0, MAX_SUBJECTS);
  } catch {
    return [];
  }
}

/** A new opaque buyer subject with 144 bits of randomness. */
export function newBuyerSubject(): string {
  return `buyer_${randomBytes(18).toString("base64url")}`;
}

/**
 * Build the Set-Cookie value that adds [subject] to this browser's authenticated purchase session.
 * Returns undefined when entitlement signing is not configured (normal for bare local development).
 */
export function buyerSessionCookie(req: Request, subject: string): string | undefined {
  if (!SUBJECT.test(subject)) return undefined;
  const key = signingKey();
  if (!key) return undefined;

  const subjects = [subject, ...buyerSubjects(req).filter((s) => s !== subject)].slice(0, MAX_SUBJECTS);
  const payload64 = Buffer.from(JSON.stringify({ v: COOKIE_VERSION, subjects } satisfies BuyerSessionPayload), "utf8")
    .toString("base64url");
  const signature64 = cryptoSign(null, Buffer.from(payload64, "utf8"), key).toString("base64url");
  const secure = process.env.NODE_ENV === "production" || new URL(req.url).protocol === "https:";

  return [
    `${COOKIE_NAME}=${payload64}.${signature64}`,
    "Path=/",
    `Max-Age=${MAX_AGE_SECONDS}`,
    "HttpOnly",
    "SameSite=Lax",
    secure ? "Secure" : "",
  ].filter(Boolean).join("; ");
}
