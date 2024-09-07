import bcrypt from "bcrypt";

/**
 * Genera un salt usando bcrypt.
 * @returns {Promise<string>} - El salt generado.
 */
export async function generateSalt() {
  const saltRounds = 10; // Número de rondas de salt
  const salt = await bcrypt.genSalt(saltRounds);
  return salt;
}

/**
 * Hashea una contraseña usando bcrypt y un salt proporcionado.
 * @param {string} password - La contraseña a hashear.
 * @param {string} salt - El salt a usar para hashear la contraseña.
 * @returns {Promise<string>} - La contraseña hasheada.
 */
export async function hashPassword(password, salt) {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
