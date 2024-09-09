// user.service.js
import { getUserByUsername } from "../model/user.model.js";
import { hashPassword } from "../utils/encrypt.utils.js"; // bcrypt hashing

export const verifyUserPassword = async (username, passwordInput) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  
  const { password: storedPassword, salt } = user;
  console.log(user);
  
  // Convertir el Buffer del salt a string
  const saltString = salt.toString(); // Convertir el buffer en cadena
  
  // Hash la contraseña de entrada usando el salt convertido a string
  const hashedInputPassword = await hashPassword(passwordInput, saltString);

  if (hashedInputPassword === storedPassword) {
    return true; // Contraseña correcta
  } else {
    return false; // Contraseña incorrecta
  }
};
