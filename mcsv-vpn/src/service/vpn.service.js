import { Client } from 'ssh2';
import { COMMAND, SSH_PORT, SSH_PASSWORD, REMOTE_HOST, REMOTE_USER, REMOTE_PATH } from '../config/env.config.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

export const createVpnService = (username, password) => {
  const REMOTE_SCRIPT = COMMAND;  // Ruta del script en la máquina remota

  return new Promise((resolve, reject) => {
    const conn = new Client();

    // Comando que se ejecutará en la máquina remota
    const command = `echo "${SSH_PASSWORD}" | sudo -S bash ${REMOTE_SCRIPT} ${username} ${password}`;

    console.log(`Ejecutando el comando: ${command}`);

    conn.on('ready', () => {
      conn.exec(command, { pty: true }, (err, stream) => {
        if (err) {
          return reject(new Error(`Error al ejecutar el comando: ${err.message}`));
        }

        let output = '';
        let errorOutput = '';

        stream.on('data', (data) => {
          output += data;
        }).stderr.on('data', (data) => {
          errorOutput += data;
        });

        stream.on('close', (code) => {
          conn.end();
          if (code !== 0 || errorOutput) {
            return reject(new Error(`Error en el script: ${errorOutput || 'Código de error: ' + code}`));
          }

          const cleanedOutput = output
            .replace(/\[sudo\] password for penlab:\s*/g, '')
            .replace(/Pseudo-terminal will not be allocated because stdin is not a terminal.\s*/g, '')
            .trim();

          resolve(cleanedOutput || "Comando ejecutado sin salida adicional.");
        });
      });
    }).connect({
      host: REMOTE_HOST,  // Usar la variable de entorno
      port: SSH_PORT,
      username: REMOTE_USER,  // Usar la variable de entorno
      password: SSH_PASSWORD
    });
  });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadVpnService = (username, res) => {
  const REMOTE_PATH_FILE = `${REMOTE_PATH}/${username}.zip`; // Usar la variable de entorno para la ruta del archivo

  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn.on('ready', () => {
      const command = `echo "${SSH_PASSWORD}" | sudo -S cat ${REMOTE_PATH_FILE}`;

      conn.exec(command, (err, stream) => {
        if (err) {
          return reject(new Error(`Error al ejecutar el comando: ${err.message}`));
        }

        res.setHeader('Content-Disposition', `attachment; filename=${username}.zip`);
        res.setHeader('Content-Type', 'application/zip');

        stream.pipe(res);

        stream.on('close', (code) => {
          conn.end();
          if (code !== 0) {
            return reject(new Error(`Error en el script, código de error: ${code}`));
          }
          resolve();
        });

        stream.on('error', (error) => {
          reject(new Error(`Error al descargar el archivo: ${error.message}`));
        });
      });
    }).connect({
      host: REMOTE_HOST,  // Usar la variable de entorno
      port: SSH_PORT,
      username: REMOTE_USER,  // Usar la variable de entorno
      password: SSH_PASSWORD
    });
  });
};
