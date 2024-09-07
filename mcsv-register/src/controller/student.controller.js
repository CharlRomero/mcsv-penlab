import { createUserService, updateUserPasswordService } from "../service/student.service.js";

export const createUserController = async (req, res) => {
  const { email, password } = req.body;

  // Validación de los datos del usuario
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Crear el nuevo usuario usando el servicio
    const result = await createUserService({
      email,
      password,
    });
    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePasswordController = async (req, res) => {
  const { userId, newPassword } = req.body;
  if (!userId || !newPassword) {
    return res
      .status(400)
      .json({ message: "User ID and new password are required." });
  }

  try {
    await updateUserPasswordService(userId, newPassword);
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating password: ${error.message}` });
  }
};
