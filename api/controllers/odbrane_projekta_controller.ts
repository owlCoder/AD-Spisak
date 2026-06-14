import express, { Request, Response } from "express";
import { authenticateToken } from "../middleware/auth_middleware";
import TerminiOdbraneService from "../services/termini_odbrane_service";

const router = express.Router();
const termini_odbrane_service = new TerminiOdbraneService();

// Create a new Termin Odbrane
router.post(
  "/termin/novi",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const pid = req.pid ?? 1; // Get predmet_id
      const termin = req.body;
      const newTermin = await termini_odbrane_service.createTerminOdbrane(termin, pid);
      res.status(201).json(newTermin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Termin Odbrane" });
    }
  }
);

// Get all Termini Odbrane for a given predmet_id
router.get(
  "/termini",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const pid = req.pid ?? 1; // Get predmet_id
      const termini = await termini_odbrane_service.getAllTerminiOdbrane(pid);
      res.status(200).json(termini);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch Termini Odbrane" });
    }
  }
);

// Update a specific Termin Odbrane by ID
router.put(
  "/termin/azuriraj/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const pid = req.pid ?? 1; // Get predmet_id
      const termin = req.body;

      await termini_odbrane_service.updateTerminOdbrane(id, termin, pid);
      res.status(204).send(); // No content response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update Termin Odbrane" });
    }
  }
);

export default router;
