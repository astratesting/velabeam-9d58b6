import { createHash, randomBytes } from "crypto";

export function generateApiKey(): { token: string; hash: string; last4: string } {
  const raw = randomBytes(32).toString("hex");
  const token = `vb_live_${raw}`;
  const hash = createHash("sha256").update(token).digest("hex");
  const last4 = token.slice(-4);
  return { token, hash, last4 };
}

export function hashApiKey(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
