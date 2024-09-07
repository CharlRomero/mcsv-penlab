import { select } from "../model/user.model.js";

export const selectService = async () => {
  return await select();
};
