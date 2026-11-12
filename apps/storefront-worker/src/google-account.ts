/**
 * Google Identity Services sign-in verification.
 *
 * A browser-supplied JWT is never a buyer identity until Google's own tokeninfo
 * endpoint has validated its signature, expiry and issuer. Only the verified
 * immutable Google subject is an account key; email is display-only.
 */
export interface GoogleIdentity {
  sub: string;
  email: string;
  name: string;
}

export async function verifyGoogleCredential(
  credential: unknown,
  clientId: string | undefined,
  fetcher: typeof fetch = fetch,
  now = Date.now(),
): Promise<GoogleIdentity | null> {
  if (!clientId || typeof credential !== "string" || credential.length > 8192 ||
      !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(credential)) return null;
  const url = new URL("https://oauth2.googleapis.com/tokeninfo");
  url.searchParams.set("id_token", credential);
  let response: Response;
  try {
    response = await fetcher(url.toString(), { method: "GET", headers: { accept: "application/json" } });
  } catch {
    return null;
  }
  if (!response.ok) return null;
  let value: Record<string, unknown>;
  try {
    value = await response.json() as Record<string, unknown>;
  } catch {
    return null;
  }
  if (value.aud !== clientId ||
      (value.iss !== "https://accounts.google.com" && value.iss !== "accounts.google.com") ||
      (value.email_verified !== "true" && value.email_verified !== true) ||
      typeof value.sub !== "string" || !/^\d{10,40}$/.test(value.sub) ||
      typeof value.email !== "string" || value.email.length > 320 ||
      !/^\S+@\S+\.\S+$/.test(value.email) ||
      !/^\d+$/.test(String(value.exp)) || Number(value.exp) * 1000 <= now) return null;
  return {
    sub: value.sub,
    email: value.email,
    name: typeof value.name === "string" ? value.name.slice(0, 120) : value.email,
  };
}
