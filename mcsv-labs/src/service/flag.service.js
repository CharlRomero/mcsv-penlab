import { FlagModel } from '../model/flag.model.js';

export const FlagService = {
  async getFlagsByLab(labId) {
    return await FlagModel.getFlagsByLab(labId);
  },

  async validateAndCreateFlag(flagId) {
    return await FlagModel.validateAndCreateFlag(flagId);
  },
};
