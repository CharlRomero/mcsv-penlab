import { createLogger, transports, format } from 'winston';
import path from 'path';

// Configuración del logger
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Agrega timestamp a los logs
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`) // Formato del mensaje
  ),
  transports: [
    new transports.File({
      filename: path.join('logs', 'log.txt'), // Guardar el log en la carpeta "logs"
      level: 'info', // Solo registrar niveles de "info" o superiores
    })
  ],
});

export default logger;