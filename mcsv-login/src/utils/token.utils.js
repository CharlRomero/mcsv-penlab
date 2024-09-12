// token.utils.js
import crypto from "crypto";

/**
 * Genera un token aleatorio de 64 bytes codificado en formato hexadecimal.
 * @returns {string} - El token generado.
 */
export const generateToken = () => {
  return crypto.randomBytes(64).toString('hex');
};