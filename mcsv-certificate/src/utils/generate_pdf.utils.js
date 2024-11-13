import { PDFDocument as PDFLib, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fontkit from 'fontkit'; // Importa el fontkit correctamente

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificate = async (name, labName) => {
  const templatePath = path.join(__dirname, "../../public/templates/certificate_template.pdf");
  const certificatesDir = path.join(__dirname, "../../public/certificates");
  const fontPath = path.join(__dirname, "../../src/fonts/the-youngest-script.ttf"); // Ruta a la fuente 'The Youngest Script'
  const poppinsFontPath = path.join(__dirname, "../../src/fonts/Poppins-Regular.ttf"); // Ruta a la fuente 'Poppins-Regular'
  const filePath = path.join(certificatesDir, `${name}_certificate.pdf`);

  // Verificar si la carpeta de certificados existe; si no, crearla
  if (!fs.existsSync(certificatesDir)) {
    fs.mkdirSync(certificatesDir, { recursive: true });
  }

  // Cargar la plantilla PDF
  const templateBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFLib.load(templateBytes);

  // Registrar fontkit antes de incrustar las fuentes
  pdfDoc.registerFontkit(fontkit);

  // Cargar las fuentes personalizadas
  const fontBytes = fs.readFileSync(fontPath); // Leer el archivo de la fuente 'The Youngest Script'
  const customFont = await pdfDoc.embedFont(fontBytes); // Incrustar la fuente 'The Youngest Script'

  const poppinsFontBytes = fs.readFileSync(poppinsFontPath); // Leer el archivo de la fuente 'Poppins-Regular'
  const poppinsFont = await pdfDoc.embedFont(poppinsFontBytes); // Incrustar la fuente 'Poppins-Regular'

  // Obtener la primera página del PDF para editarla
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();

  const fontSize = 50;
  const textWidth = customFont.widthOfTextAtSize(name, fontSize); // Calcula el ancho del texto
  
  page.drawText(name, {
    x: (width - textWidth) / 2, // Centra el texto en función de su ancho
    y: height / 2, // Colocar en el centro
    size: fontSize,
    font: customFont, // Aplica la fuente 'The Youngest Script'
    color: rgb(102 / 255, 204 / 255, 0 / 255),  // Texto en verde
  });


  

  // Ajustes para el texto del laboratorio con la fuente Poppins-Regular
  const offsetX = 263; // Ajusta este valor para mover el texto más a la izquierda
  const offsetY = -10; // Ajusta este valor para mover el texto más abajo (salto de línea)

  page.drawText(`Laboratorio: ${labName}`, {
    x: width / 2 - 100 - offsetX,
    y: height / 2 - 50 + offsetY,
    size: 17,
    font: poppinsFont, // Aplica la fuente 'Poppins-Regular'
    color: rgb(0, 100 / 255, 0), 
  });

  // Guardar el PDF editado
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(filePath, pdfBytes);

  return filePath;
};
