// userModel.js
export const validateUserInput = (email, password) => {
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos");
    }
  };
  