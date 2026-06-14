import express, { Request, Response } from 'express';
import multer from 'multer';
import { ssluzba_excel_u_korisnike } from '../services/excel_import_service';
import { authenticateToken } from '../middleware/auth_middleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage

// Route to handle Excel file upload
router.post('/xlsx/convert', upload.single('file'), authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const korisnici = await ssluzba_excel_u_korisnike(req.file.buffer);
    res.status(200).json(korisnici);
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
});

export default router;
