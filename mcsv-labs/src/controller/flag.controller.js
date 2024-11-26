import { FlagService } from '../service/flag.service.js';

export const FlagController = {
  async getFlagsByLab(req, res) {
    try {
      const { labId } = req.params;
      const flags = await FlagService.getFlagsByLab(labId);
      res.json(flags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async validateAndCreateFlag(req, res) {
    try {
      const { flagId } = req.params;
      const newFlagId = await FlagService.validateAndCreateFlag(flagId);
      res.status(201).json({ newFlagId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
