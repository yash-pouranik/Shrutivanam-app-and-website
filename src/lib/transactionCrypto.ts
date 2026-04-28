import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

const getKey = (): Buffer => {
  const secret = process.env.TSX_ID_SECRET;
  if (!secret) {
    throw new Error("TSX_ID_SECRET is not set");
  }

  if (/^[0-9a-fA-F]{64}$/.test(secret)) {
    return Buffer.from(secret, "hex");
  }

  const base64Key = Buffer.from(secret, "base64");
  if (base64Key.length === 32) {
    return base64Key;
  }

  const rawKey = Buffer.from(secret);
  if (rawKey.length === 32) {
    return rawKey;
  }

  throw new Error("TSX_ID_SECRET must be 32 bytes (hex, base64, or raw)");
};

export const encryptTransactionId = (plainText: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };
};

export const decryptTransactionId = (payload: {
  ciphertext: string;
  iv: string;
  tag: string;
}) => {
  const key = getKey();
  const iv = Buffer.from(payload.iv, "base64");
  const tag = Buffer.from(payload.tag, "base64");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "base64")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
};
