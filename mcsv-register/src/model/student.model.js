import { userPool } from "../config/database.config.js";

/**
 * Crea un nuevo usuario en la base de datos utilizando el procedimiento almacenado `CreateUser`.
 *
 * Esta función llama al procedimiento almacenado `CreateUser` en la base de datos para insertar un nuevo usuario
 * con los datos proporcionados. El procedimiento almacenado maneja la inserción del usuario en la tabla correspondiente.
 *
 * @param {object} data - Los datos del nuevo usuario.
 * @param {string} data.username - El nombre de usuario del nuevo usuario.
 * @param {string} data.email - La dirección de correo electrónico del nuevo usuario.
 * @param {string} data.password - La contraseña hasheada del nuevo usuario.
 * @param {string} data.salt - El salt utilizado para hashear la contraseña del nuevo usuario.
 * @returns {Promise<object>} - Un Promise que resuelve con el resultado de la operación.
 * La respuesta contiene los detalles del usuario creado o el ID del nuevo usuario.
 *
 * @throws {Error} - Lanza un error si la operación falla.
 */
export const create = async (data) => {
  // Ejecuta el procedimiento almacenado `CreateUser` con los datos del nuevo usuario
  const [rows] = await userPool.execute("CALL CreateUser(?, ?, ?, ?)", [
    data.username,
    data.email,
    data.password,
    data.salt,
  ]);
  // Retorna el primer elemento de la respuesta, que contiene los detalles del usuario creado
  return rows[0];
};

/**
 * Actualiza la contraseña de un usuario en la base de datos.
 *
 * @param {number} userId - El ID del usuario cuya contraseña se actualizará.
 * @param {string} newPassword - La nueva contraseña hasheada.
 * @param {string} newSalt - El nuevo salt usado para hashear la contraseña.
 * @returns {Promise<object>} - Un Promise que resuelve con el resultado de la operación de actualización.
 *
 * @throws {Error} - Lanza un error si la operación falla.
 */
export const updatePassword = async (userId, newPassword, newSalt) => {
    try {
      const [result] = await userPool.execute("CALL UpdateUserPassword(?, ?, ?)", [
        userId,
        newPassword,
        newSalt
      ]);
      return result;
    } catch (error) {
      throw new Error(`Error updating password: ${error.message}`);
    }
  };