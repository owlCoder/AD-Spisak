import express, { Request, Response } from "express";
import PoeniService from "../services/poeni_service";
import { authenticateToken } from "../middleware/auth_middleware";

const router = express.Router();
const poeniService = new PoeniService();

// Create a single poeni record
router.post("/poeni/novi", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1; // Get predmet_id
    const poeni = await poeniService.createPoeni(req.body, pid); // Pass predmet_id to service
    res.status(201).json(poeni);
  } catch (error) {
    res.status(500).json({ error: "Failed to create poeni" });
  }
});

// Get a single poeni by ID
router.get("/poeni/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1; // Get predmet_id
    const poeni = await poeniService.getPoeni(parseInt(req.params.id), pid); // Pass predmet_id to service
    if (poeni) {
      res.status(200).json(poeni);
    } else {
      res.status(404).json({ error: "Poeni not found!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get all poeni by user ID
router.get("/poeni/korisnik/:userId", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1; // Get predmet_id
    const poeni = await poeniService.getAllPoeniByUserId(parseInt(req.params.userId), pid);
    res.status(200).json(poeni);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get all poeni by students fks
router.post("/poeni/studenti/ids", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1; // Get predmet_id
    const ids = req.body.ids;
    const poeni = await poeniService.getAllPoeniByStudentsFKs(ids, pid);
    res.status(200).json(poeni);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update a poeni by ID
router.put("/poeni/azuriraj/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1; // Get predmet_id
    await poeniService.updatePoeni(parseInt(req.params.id), req.body, pid); // Pass predmet_id to service
    res.status(204).send(); // No content response
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
});

// Delete a poeni by ID
router.delete("/poeni/obrisi/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const pid = req.pid ?? 1; // Get predmet_id
    await poeniService.deletePoeni(parseInt(req.params.id), pid); // Pass predmet_id to service
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
