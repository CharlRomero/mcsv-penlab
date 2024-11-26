import { vulnerablePool } from "../config/database.config.js";

export const FlagModel = {
  async getFlagsByLab(labId) {
    const [rows] = await vulnerablePool.query('SELECT * FROM flags WHERE machine_id = ?', [labId]);
    return rows;
  },

  async validateAndCreateFlag(flagId) {
    const [machine] = await vulnerablePool.query('SELECT machine_id FROM flags WHERE id = ?', [flagId]);
    if (!machine.length) throw new Error('Flag not found');

    const machineId = machine[0].machine_id;

    await vulnerablePool.query('UPDATE flags SET is_active = FALSE WHERE id = ?', [flagId]);

    const [result] = await vulnerablePool.query(
      'INSERT INTO flags (machine_id, flag) VALUES (?, CONCAT("FLAG{", UUID(), "}"))',
      [machineId]
    );
    return result.insertId;
  },
};
