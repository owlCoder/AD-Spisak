import express, { Request, Response } from "express";
import { authenticateToken } from "../middlware/auth_middleware";
import { exportToExcel } from "../services/xlsx_service";
import { exportProjekatToExcel } from "../services/projekat_export_service";

const router = express.Router();

router.post(
  "/xlsx/export",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { fond_casova, predispitne } = req.body;
      const token = req.headers["authorization"];

      if (!token) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      const excel: Buffer = await exportToExcel(token, fond_casova, predispitne);

      // Set headers for file download
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="studenti.xlsx"'
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      // Send the file as a response
      res.send(excel);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while generating the Excel file." });
    }
  }
);

router.post(
  "/xlsx/projects/export",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const token = req.headers["authorization"];

      if (!token) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      const excel: Buffer = await exportProjekatToExcel(req.body);

      // Set headers for file download
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="projekti.xlsx"'
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      // Send the file as a response
      res.send(excel);
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: "An error occurred while generating the Excel file." });
    }
  }
);

export default router;
