// user.service.js
import { getUserByUsername } from "../model/user.model.js"; // Importa solo getUserByUsername
import { hashPassword } from "../utils/encrypt.utils.js"; // bcrypt hashing

export const verifyUserPassword = async (username, passwordInput) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }

  const { password: storedPassword, salt } = user;

  // Convertir el Buffer del salt a string
  const saltString = salt.toString(); // Convertir el buffer en cadena

  // Hash la contraseña de entrada usando el salt convertido a string
  const hashedInputPassword = await hashPassword(passwordInput, saltString);

  return hashedInputPassword === storedPassword; // Retorna si la contraseña es correcta o no
};
