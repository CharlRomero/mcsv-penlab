import { selectService } from "../service/user.service.js";

export const selectController = async (req, res) => {
  try {
    const result = await selectService();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
