import express, { Request, Response } from "express";
import KorisnikService from "../services/korisnik_service";
import bcrypt from "bcryptjs";
import { authenticateToken } from "../middleware/auth_middleware";

const router = express.Router();
const korisnik_service = new KorisnikService();

// Create a new korisnik
router.post(
  "/korisnik/novi",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const pid = req.pid ?? 1; // Get predmet_id
      const korisnik = req.body;
      const hesirano = {
        ...korisnik,
        password: await bcrypt.hash(korisnik.password, 10),
      };
      await korisnik_service.createKorisnik(hesirano, pid); // Pass predmet_id to service
      res.status(201).json(hesirano);
    } catch (error) {
      res.status(500).json({ error: "Failed to create korisnik" });
    }
  }
);

// Get a korisnik by ID
router.get(
  "/korisnik/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const pid = req.pid ?? 1; // Get predmet_id
      const korisnik = await korisnik_service.getKorisnik(parseInt(req.params.id), pid); // Pass predmet_id
      if (korisnik) {
        res.status(200).json(korisnik);
      } else {
        res.status(404).json({ error: "User not found!" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// Get all students
router.get(
  "/studenti",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const pid = req.pid ?? 1; // Get predmet_id
      const korisnici = await korisnik_service.getStudents(pid); // Pass predmet_id
      res.status(200).json(korisnici);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// Update a korisnik by ID
router.put(
  "/korisnik/azuriraj/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const pid = req.pid ?? 1; // Get predmet_id
      const korisnik = await korisnik_service.getKorisnik(id, pid); // Pass predmet_id

      if (korisnik) {
        if (korisnik.password !== req.body.password) {
          const hesirano = {
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
          };
          await korisnik_service.updateKorisnik(id, hesirano, pid); // Pass predmet_id
          res.status(204).send(); // No content response
        } else {
          await korisnik_service.updateKorisnik(id, req.body, pid); // Pass predmet_id
          res.status(204).send(); // No content response
        }
      } else {
        res.status(404).json({ error: "User not found!" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// Delete a korisnik by ID
router.delete(
  "/korisnik/obrisi/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const pid = req.pid ?? 1; // Get predmet_id
      await korisnik_service.deleteKorisnik(parseInt(req.params.id), pid); // Pass predmet_id
      res.status(204).send(); // No content response
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default router;
