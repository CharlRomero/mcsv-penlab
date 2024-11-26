import { vulnerablePool } from '../config/database.config.js';  // Import db from database.config.js

export const LabModel = {
  async getAllLabs() {
    const [rows] = await vulnerablePool.query('SELECT * FROM machines');
    return rows;
  },

  async createLab(name, description, ipAddress) {
    const [result] = await vulnerablePool.query(
      'INSERT INTO machines (name, description, ip_address) VALUES (?, ?, ?)',
      [name, description, ipAddress]
    );
    return result.insertId;
  },
};
