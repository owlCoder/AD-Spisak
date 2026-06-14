import db from "../database/connection";
import { IPredmet } from "../interfaces/IPredmet";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Predmet } from "../models/predmet";

class PredmetRepository {
  // Create a single predmet
  async create(predmet: IPredmet): Promise<Predmet> {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO predmeti (naziv, sifra_predmeta, fond_casova, predispitne_obaveze) VALUES (?, ?, ?, ?)",
      [predmet.naziv, predmet.sifra_predmeta, predmet.fond_casova, predmet.predispitne_obaveze]
    );

    return new Predmet(
      result.insertId,
      predmet.naziv,
      predmet.sifra_predmeta,
      predmet.fond_casova,
      predmet.predispitne_obaveze
    );
  }

  // Create multiple predmeti
  async createMultiple(records: IPredmet[]): Promise<void> {
    const query = "INSERT INTO predmeti (naziv, sifra_predmeta, fond_casova, predispitne_obaveze) VALUES ?";
    const values = records.map((record) => [
      record.naziv,
      record.sifra_predmeta,
      record.fond_casova,
      record.predispitne_obaveze
    ]);

    await db.query<ResultSetHeader>(query, [values]);
  }

  // Read a single predmet by ID
  async readById(id: number): Promise<Predmet | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM predmeti WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return new Predmet(
      row.id,
      row.naziv,
      row.sifra_predmeta,
      row.fond_casova,
      row.predispitne_obaveze
    );
  }

  // Read all predmeti
  async readAll(): Promise<Predmet[]> {
    const [rows] = await db.execute<RowDataPacket[]>("SELECT * FROM predmeti");

    return rows.map((row: any) => new Predmet(
      row.id,
      row.naziv,
      row.sifra_predmeta,
      row.fond_casova,
      row.predispitne_obaveze
    ));
  }

  // Update a predmet
  async update(id: number, predmet: IPredmet): Promise<void> {
    await db.execute<ResultSetHeader>(
      "UPDATE predmeti SET naziv = ?, sifra_predmeta = ?, fond_casova = ?, predispitne_obaveze = ? WHERE id = ?",
      [predmet.naziv, predmet.sifra_predmeta, predmet.fond_casova, predmet.predispitne_obaveze, id]
    );
  }

  // Delete a predmet
  async delete(id: number): Promise<void> {
    await db.execute<ResultSetHeader>("DELETE FROM predmeti WHERE id = ?", [id]);
  }
}

export default PredmetRepository;
