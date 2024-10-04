import { Certificate } from "../model/certificate.model.js";
import { generateCertificate } from "../utils/generate_pdf.utils.js";

export const createCertificate = (name, labName, flag) => {
  const certificate = new Certificate(name, labName);

  // Validar la flag del laboratorio
  if (!certificate.isValidFlag(flag)) {
    throw new Error("La flag del laboratorio no es válida");
  }

  // Generar el certificado
  const filePath = generateCertificate(certificate.name, certificate.labName);
  return filePath;
};
