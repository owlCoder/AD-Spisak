import express, { Request, Response } from "express";
import ProjektniZadatakService from "../services/projektni_zadatak_service";
import { authenticateToken } from "../middleware/auth_middleware";

const router = express.Router();
const projektniZadatakService = new ProjektniZadatakService();

router.get("/projektni-zadaci", authenticateToken, async (req: Request, res: Response) => {
    try {
        const predmet_id = req.pid ?? 1;
        const zadaci = await projektniZadatakService.getAllZadaci(predmet_id);
        res.status(200).json(zadaci);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get("/projektni-zadatak/student/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const predmet_id = req.pid ?? 1;
        const korisnik_fk = parseInt(req.params.id);
        const zadaci = await projektniZadatakService.getZadatakByStudent(predmet_id, korisnik_fk);
        res.status(200).json(zadaci);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get("/projektni-zadatak/termin-odbrane/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const predmet_id = req.pid ?? 1;
        const termin_odbrane_id = parseInt(req.params.id);
        const zadaci = await projektniZadatakService.getProjektiByTerminOdbraneId(predmet_id, termin_odbrane_id);
        res.status(200).json(zadaci);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post("/projektni-zadatak/novi", authenticateToken, async (req: Request, res: Response) => {
    try {
        const predmet_id = req.pid ?? 1;
        const zadatak = await projektniZadatakService.createSingleZadatak(predmet_id, req.body);
        if (zadatak) {
            res.status(201).json(zadatak);
        } else {
            res.status(400).json({ error: "Failed to create project task" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error while creating project task" });
    }
});

router.put("/projektni-zadatak/azuriranje", authenticateToken, async (req: Request, res: Response) => {
    try {
        const predmet_id = req.pid ?? 1;
        const success = await projektniZadatakService.updateSingleZadatak(predmet_id, req.body);
        if (success) {
            res.status(204).send();
        } else {
            res.status(400).json({ error: "Failed to update project task" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error while updating project task" });
    }
});

router.delete("/projektni-zadatak/obrisi/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const predmet_id = req.pid ?? 1;
        await projektniZadatakService.deleteZadatakByKorisnikFK(predmet_id, parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;