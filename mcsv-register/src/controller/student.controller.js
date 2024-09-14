import { createUserService } from "../service/student.service.js";
import logger from "../utils/logger.js"; // Importamos el logger

export const createUserController = async (req, res) => {
  const { email, password } = req.body;

  // Validación de los datos del usuario
  if (!email || !password) {
    logger.warn("Intento de registro fallido: faltan campos obligatorios.");
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Crear el nuevo usuario usando el servicio
    const result = await createUserService({ email, password });

    // Log exitoso del registro
    logger.info(`Nuevo usuario registrado exitosamente con el correo: ${email}.`);

    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    // Log de error si ocurre un problema
    logger.error(`Error en el registro del usuario con el correo ${email}: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const updatePasswordController = async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    logger.warn("Intento fallido de actualización de contraseña: faltan campos obligatorios.");
    return res.status(400).json({ message: "User ID and new password are required." });
  }

  try {
    await updateUserPasswordService(userId, newPassword);

    // Log exitoso de la actualización de contraseña
    logger.info(`Contraseña actualizada exitosamente para el usuario con ID: ${userId}.`);

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    // Log de error si ocurre un problema
    logger.error(`Error actualizando la contraseña del usuario con ID ${userId}: ${error.message}`);
    res.status(500).json({ message: `Error updating password: ${error.message}` });
  }
};