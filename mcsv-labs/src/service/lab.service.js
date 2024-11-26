import { LabModel } from '../model/lab.model.js';

export const LabService = {
  async getAllLabs() {
    return await LabModel.getAllLabs();
  },

  async createLab(name, description, ipAddress) {
    return await LabModel.createLab(name, description, ipAddress);
  },
};
