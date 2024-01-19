require("dotenv").config();
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const keyLength = 32;
const ivLength = 16;

const personalKey = process.env.SECRET_KEY;
function encrypt(text) {
  const key = crypto
    .createHash("sha256")
    .update(personalKey)
    .digest()
    .slice(0, keyLength);
  const iv = crypto.randomBytes(ivLength);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + encrypted;
}

function decrypt(encryptedText) {
  const iv = Buffer.from(encryptedText.slice(0, ivLength * 2), "hex");
  const encrypted = encryptedText.slice(ivLength * 2);

  const key = crypto
    .createHash("sha256")
    .update(personalKey)
    .digest()
    .slice(0, keyLength);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
