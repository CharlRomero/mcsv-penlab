import { Certificate } from "../model/certificate.model.js";
import { generateCertificate } from "../utils/generate_pdf.utils.js";
import { poolVulnerableMachines } from '../config/database.js'; // Usar la nueva conexión

export const createCertificate = async (username, labName, flag) => {
  // Validar la flag del laboratorio en la base de datos
  const isFlagValid = await validateFlag(flag);
  console.log("isFlagValid",isFlagValid);
  if (!isFlagValid) {
    throw new Error("La flag proporcionada no es válida");
  }
  
  // Generar el certificado
  const filePath = generateCertificate(username, labName);
  return filePath;
};

// Función para validar la flag en la base de datos
const validateFlag = async (flag) => {
  try {
    const [rows] = await poolVulnerableMachines.query(
      'SELECT * FROM flags WHERE flag = ? AND is_active = TRUE',
      [flag]
    );

    // Si se encuentra una fila, significa que la flag es válida
    return rows.length > 0;
  } catch (error) {
    console.error('Error al validar la flag:', error);
    throw new Error('Error en la validación de la flag');
  }
};