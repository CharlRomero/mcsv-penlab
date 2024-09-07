import { create, updatePassword } from "../model/student.model.js";
import {
  generateSalt,
  hashPassword,
  generateUsernameFromEmail,
} from "../utils/utils.js";

/**
 * Crea un nuevo usuario utilizando los datos proporcionados.
 *
 * Esta función genera un nombre de usuario a partir del correo electrónico,
 * genera un salt, hashea la contraseña usando el salt generado, y finalmente
 * crea el usuario en la base de datos mediante la llamada al modelo `create`.
 *
 * @param {object} data - Los datos necesarios para crear un nuevo usuario.
 * @param {string} data.email - La dirección de correo electrónico del nuevo usuario.
 * @param {string} data.password - La contraseña en texto plano del nuevo usuario.
 *
 * @returns {Promise<object>} - Un Promise que resuelve con el resultado de la creación del usuario.
 * La respuesta puede contener los detalles del usuario creado o el ID del nuevo usuario.
 *
 * @throws {Error} - Lanza un error si ocurre algún problema durante el proceso de creación del usuario.
 * El mensaje del error describe la causa del problema.
 */
export const createUserService = async (data) => {
  try {
    // Genera un nombre de usuario a partir del correo electrónico
    const username = generateUsernameFromEmail(data.email);
    // Genera un salt para la contraseña
    const salt = await generateSalt();
    // Hashea la contraseña usando el salt generado
    const hashedPassword = await hashPassword(data.password, salt);
    // Llama al modelo para crear el usuario con los datos proporcionados
    const result = await create({
      username,
      email: data.email,
      password: hashedPassword,
      salt,
    });
    // Retorna el resultado de la creación del usuario
    return result;
  } catch (error) {
    // Lanza un error si ocurre algún problema durante el proceso
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Actualiza la contraseña de un usuario.
 *
 * @param {number} userId - El ID del usuario cuya contraseña se actualizará.
 * @param {string} newPassword - La nueva contraseña en texto plano.
 * @returns {Promise<object>} - Un Promise que resuelve con el resultado de la actualización.
 *
 * @throws {Error} - Lanza un error si ocurre un problema durante la actualización.
 */
export const updateUserPasswordService = async (userId, newPassword) => {
    try {
      // Genera un nuevo salt para la nueva contraseña
      const newSalt = await generateSalt();
  
      // Hashea la nueva contraseña usando el nuevo salt
      const hashedPassword = await hashPassword(newPassword, newSalt);
  
      // Llama al modelo para actualizar la contraseña del usuario
      const result = await updatePassword(userId, hashedPassword, newSalt);
  
      return result;
    } catch (error) {
      throw new Error(`Error updating user password: ${error.message}`);
    }
  };