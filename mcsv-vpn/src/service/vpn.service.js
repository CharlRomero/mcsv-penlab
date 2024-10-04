import { Client } from 'ssh2';
import { COMMAND } from '../config/env.config.js';
export const createVpnService = (username, password) => {
  const REMOTE_HOST = '192.168.0.102';  // IP o hostname de la máquina remota
  const REMOTE_USER = 'penlab'; // Usuario SSH en la máquina remota
  const REMOTE_SCRIPT = COMMAND;  // Ruta del script en la máquina remota
  
  return new Promise((resolve, reject) => {
    const conn = new Client();

    // Comando que se ejecutará en la máquina remota
    const command = `bash ${REMOTE_SCRIPT} ${username} ${password}`;
    
    // Conectar por SSH

    console.log(`Ejecutando el comando: ${command}`);

    conn.on('ready', () => {
        console.log(`Ejecutando el comando: ${command}`);
      conn.exec(command, (err, stream) => {
        if (err) {
          return reject(new Error(`Error al ejecutar el comando: ${err.message}`));
        }

        let output = '';
        let errorOutput = '';

        // Recoger la salida del script
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
          resolve(output);
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




// vpnService.js
/*import { exec } from "child_process";
import { COMMAND } from '../config/env.config.js';


export const createVpnService = (username, password) => { // Ajusta la ruta del script

  return new Promise((resolve, reject) => {
    const command = `bash ${COMMAND} ${username} ${password}`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(`Error al ejecutar el script: ${error.message}`));
      }
      if (stderr) {
        return reject(new Error(`Error en el script: ${stderr}`));
      }
      resolve("Created VPN");
    });
  });
};*/
