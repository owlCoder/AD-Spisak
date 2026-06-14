import express, { Request, Response } from "express";
import EvidencijaService from "../services/evidencija_service";
import { authenticateToken } from "../middleware/auth_middleware";

const router = express.Router();
const evidencijaService = new EvidencijaService();

// Add a single evidencija record
router.post("/evidencija/novi", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1;
    const evidencija = await evidencijaService.createEvidencija(req.body, pid);
    res.status(201).json(evidencija);
  } catch (error) {
    res.status(500).json({ error: "Failed to create evidencija" });
  }
});

// Add multiple evidencija records for students
router.post("/evidencija/novi-vise", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1;
    await evidencijaService.createEvidencijaForMultiple(req.body, pid);
    res.status(201).json({ message: "Evidencija added for multiple students." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add evidencija for multiple students" });
  }
});

// Get evidencija by Student ID
router.get("/evidencija/student/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1;
    const evidencija = await evidencijaService.getEvidencijaPerStudent(parseInt(req.params.id), pid);
    if (evidencija) {
      res.status(200).json(evidencija);
    } else {
      res.status(404).json({ error: "Evidencija not found!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get evidencija per group
router.get("/evidencija/grupa/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1;
    const grupa = Number(req.params.id);

    const evidencije = await evidencijaService.getAllEvidencijaByGrupa(pid, grupa);
    if (evidencije) {
      res.status(200).json(evidencije);
    } else {
      res.status(404).json({ error: "Evidencije not found!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get all evidencija
router.get("/evidencija/all", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1;
    const evidencije = await evidencijaService.getAllEvidencija(pid);
    if (evidencije) {
      res.status(200).json(evidencije);
    } else {
      res.status(404).json({ error: "Evidencije not found!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update an evidencija by ID
router.put("/evidencija/azuriraj/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1;
    await evidencijaService.updateEvidencija(parseInt(req.params.id), req.body, pid);
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Delete an evidencija by ID
router.delete("/evidencija/obrisi/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1;
    await evidencijaService.deleteEvidencija(parseInt(req.params.id), pid);
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
