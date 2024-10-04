import { createCertificate } from "../service/certificate.service.js";

export const generateCertificateHandler = (req, res) => {
  const { name, labName, flag } = req.body;

  try {
    const filePath = createCertificate(name, labName, flag);
    res
      .status(200)
      .json({ message: "Certificado generado con éxito", filePath });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
