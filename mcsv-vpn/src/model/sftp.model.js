import Client from 'ssh2-sftp-client';

const sftp = new Client();

const sftpConfig = {
  host: '192.169.10.238', // Cambia esto por tu servidor
  port: '22',
  username: 'penlab',
  password: 'penlab',
  // o usa privateKey: fs.readFileSync('ruta/a/tu/clave/privada')
};

export { sftp, sftpConfig };