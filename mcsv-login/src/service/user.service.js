// user.service.js
import { getUserByUsername } from "../model/user.model.js"; // Importa solo getUserByUsername
import { hashPassword } from "../utils/encrypt.utils.js"; // bcrypt hashing

export const verifyUserPassword = async (username, passwordInput) => {
  const user = await getUserByUsername(username);
  //console.log(user);
  if (!user) {
    throw new Error("User not found");
  }

  const { password: storedPassword, salt, rol_id } = user;

  // Convertir el Buffer del salt a string
  const saltString = salt.toString(); // Convertir el buffer en cadena

  // Hash la contraseña de entrada usando el salt convertido a string
  const hashedInputPassword = await hashPassword(passwordInput, saltString);

  if (hashedInputPassword === storedPassword) {
    return rol_id; // Devuelve el rol si la contraseña es correcta
  }
  return null;
};
