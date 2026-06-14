import express, { Request, Response } from "express";
import AuthService from "../services/auth_service";

const router = express.Router();
const auth_service = new AuthService();

router.post("/auth/prijava/:id", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const predmetId = Number(req.params.id);

    try {
      const result: { token: string; } | null = await auth_service.login(email, password, predmetId);
      if (result) {
        res.status(200).json(result.token);
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });
  
export default router;