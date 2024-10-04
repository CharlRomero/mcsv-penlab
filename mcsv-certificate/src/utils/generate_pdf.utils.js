import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificate = (name, labName) => {
  const certificatesDir = path.join(__dirname, "../../public/certificates");
  const filePath = path.join(certificatesDir, `${name}_certificate.pdf`);

  // Verificar si la carpeta existe; si no, crearla
  if (!fs.existsSync(certificatesDir)) {
    fs.mkdirSync(certificatesDir, { recursive: true });
  }

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  // Configuración del PDF
  doc.fontSize(25).text("Certificado de Aprobación", { align: "center" });
  doc.moveDown();
  doc.fontSize(18).text(`Se certifica que`, { align: "center" });
  doc.moveDown();
  doc.fontSize(22).text(name, { align: "center" });
  doc.moveDown();
  doc
    .fontSize(18)
    .text(`ha aprobado el laboratorio de ${labName}.`, { align: "center" });

  doc.end();
  return filePath; // Retornamos la ruta del archivo generado
};
