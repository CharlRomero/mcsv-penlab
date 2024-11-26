import { LabService } from '../service/lab.service.js';

export const LabController = {
  async getAllLabs(req, res) {
    try {
      const labs = await LabService.getAllLabs();
      res.json(labs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createLab(req, res) {
    try {
      const { name, description, ipAddress } = req.body;
      const labId = await LabService.createLab(name, description, ipAddress);
      res.status(201).json({ id: labId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
