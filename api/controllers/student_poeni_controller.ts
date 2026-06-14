import { authenticateToken } from "../middleware/auth_middleware";
import AllDataService from "../services/student_poeni_service";
import express, { Request, Response } from "express";

const router = express.Router();
const export_service = new AllDataService();

// Get all data
router.get(
  "/export",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const pid = req.pid ?? 1; // Get predmet_id
      const data = await export_service.getAllStudentPoeniData(pid);
      res.status(200).json(data);
    } catch (error) {
      console.warn(error)
      res.status(500).json({ error });
    }
  }
);

export default router;
