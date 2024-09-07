/**
 * Genera un nombre de usuario a partir del email.
 * @param {string} email - El email del usuario.
 * @returns {string} - El nombre de usuario generado.
 */
export function generateUsernameFromEmail(email) {
    // Verifica si el email es válido
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email provided');
    }
  
    // Extrae la parte antes del '@' en el email
    const username = email.split('@')[0];
  
    // Puedes agregar más lógica aquí para asegurar la unicidad, como añadir números o verificar la existencia en la base de datos
  
    return username;
  }