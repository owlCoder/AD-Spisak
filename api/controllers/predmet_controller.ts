import express, { Request, Response } from "express";
import PredmetService from "../services/predmet_service";
import { authenticateToken } from "../middleware/auth_middleware";

const router = express.Router();
const predmetService = new PredmetService();

// Add a single predmet record
router.post("/predmet/novi", authenticateToken, async (req: Request, res: Response) => {
  try {
    const predmet = await predmetService.createPredmet(req.body);
    res.status(201).json(predmet);
  } catch (error) {
    res.status(500).json({ error: "Failed to create predmet" });
  }
});

// Add multiple predmet records
router.post("/predmet/novi-vise", authenticateToken, async (req: Request, res: Response) => {
  try {
    await predmetService.createPredmetForMultiple(req.body);
    res.status(201).json({ message: "Predmet(s) added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add predmet(s)" });
  }
});

// Get a predmet by ID
router.get("/predmet/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const predmet = await predmetService.getPredmetById(parseInt(req.params.id));
    if (predmet) {
      res.status(200).json(predmet);
    } else {
      res.status(404).json({ error: "Predmet not found!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get all predmeti
router.get("/predmeti", async (req: Request, res: Response) => {
  try {
    const predmeti = await predmetService.getAllPredmeti();
    if (predmeti.length > 0) {
      res.status(200).json(predmeti);
    } else {
      res.status(404).json({ error: "No predmeti found!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update a predmet by ID
router.put("/predmet/azuriraj/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    await predmetService.updatePredmet(parseInt(req.params.id), req.body);
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Delete a predmet by ID
router.delete("/predmet/obrisi/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    await predmetService.deletePredmet(parseInt(req.params.id));
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
