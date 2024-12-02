import { createCertificate } from "../service/certificate.service.js";
import path from 'path';
import { fileURLToPath } from 'url'; // Para convertir URL a path
import fs from 'fs'; // Para manipular archivos

// Obtener el directorio del archivo actual (equivalente a __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Construir una ruta absoluta para la carpeta 'public/certificates'
const certificatesDir = path.resolve(__dirname, '../../public/certificates'); // Resuelve la ruta desde el directorio raíz del proyecto
console.log("certificatesDir", certificatesDir);

export const generateCertificateHandler = async (req, res) => {
  const { username, labName, flag } = req.body;
  console.log("name", username);
  console.log("labName", labName);
  console.log("flag", flag);
  console.log("req.body", req.body);

  try {
    // Llamar a la función asincrónica para crear el certificado
    const filePath = await createCertificate(username, labName, flag);
    res.status(200).json({ message: "Certificado generado con éxito", filePath });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Función para manejar la descarga del certificado
// Función para manejar la descarga del certificado
export const downloadCertificateHandler = (req, res) => {
  const { username } = req.params; // Extraer el 'username' correctamente
  console.log("parametro", req.params); // Asegúrate de que 'username' esté aquí
  
  if (!username) {
    console.error('No se proporcionó un nombre de usuario válido');
    return res.status(400).send('Nombre de usuario no proporcionado');
  }

  // Generar la ruta completa al archivo certificado
  const filePath = path.join(certificatesDir, `${username}_certificate.pdf`);
  console.log("filePath", filePath);

  // Verificar si el archivo existe
  if (fs.existsSync(filePath)) {
    // Enviar el archivo como respuesta
    res.download(filePath, `${username}_certificate.pdf`, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).send('Error al enviar el archivo');
      }
    });
  } else {
    // Si no se encuentra el archivo
    console.error('Certificado no encontrado');
    res.status(404).send('Certificado no encontrado');
  }
};