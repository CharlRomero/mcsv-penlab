import { Client } from 'ssh2';
import { COMMAND } from '../config/env.config.js';
import path from 'path';


import fs from 'fs';

import { fileURLToPath } from 'url';


export const createVpnService = (username, password) => {
  const REMOTE_HOST = '192.168.10.240';  // IP o hostname de la máquina remota
  const REMOTE_USER = 'penlab'; // Usuario SSH en la máquina remota
  const REMOTE_SCRIPT = COMMAND;  // Ruta del script en la máquina remota
  
  return new Promise((resolve, reject) => {
    const conn = new Client();

    // Comando que se ejecutará en la máquina remota
    const command = `echo "penlab" | sudo -S bash ${REMOTE_SCRIPT} ${username} ${password}`;

    // Conectar por SSH
    console.log(`Ejecutando el comando: ${command}`);

    conn.on('ready', () => {
      conn.exec(command, { pty: true }, (err, stream) => {
        if (err) {
          return reject(new Error(`Error al ejecutar el comando: ${err.message}`));
        }

        let output = '';
        let errorOutput = '';

        // Capturar salida estándar
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

          // Filtrar la salida para eliminar mensajes no deseados
          const cleanedOutput = output
            .replace(/\[sudo\] password for penlab:\s*/g, '') // Eliminar el mensaje de sudo
            .replace(/Pseudo-terminal will not be allocated because stdin is not a terminal.\s*/g, '') // Eliminar la advertencia de pseudo-terminal
            .trim(); // Eliminar espacios en blanco al principio y al final

          resolve(cleanedOutput || "Comando ejecutado sin salida adicional.");
        });
      });
    }).connect({
      host: REMOTE_HOST,
      port: 22,
      username: REMOTE_USER,
      password: "penlab"  // Autenticación usando contraseña
    });
  });
};

// Simular __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadVpnService = (username, res) => {
  const REMOTE_HOST = '192.168.10.240';
  const REMOTE_USER = 'penlab';
  const REMOTE_PATH = `/etc/openvpn/client/files/${username}.zip`; // Ruta del archivo en el servidor remoto

  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn.on('ready', () => {
      // Usar sudo para acceder al archivo como root
      const command = `echo "penlab" | sudo -S cat ${REMOTE_PATH}`;  // Usamos cat para leer el archivo remoto

      conn.exec(command, (err, stream) => {
        if (err) {
          return reject(new Error(`Error al ejecutar el comando: ${err.message}`));
        }

        // Enviar archivo como respuesta HTTP
        res.setHeader('Content-Disposition', `attachment; filename=${username}.zip`);
        res.setHeader('Content-Type', 'application/zip');

        // Enviar el archivo directamente al navegador del cliente
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
      host: REMOTE_HOST,
      port: 22,
      username: REMOTE_USER,
      password: 'penlab'  // Autenticación usando contraseña
    });
  });
};