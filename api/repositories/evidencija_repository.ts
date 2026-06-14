import db from "../database/connection";
import { IEvidencija } from "../interfaces/IEvidencija";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import Evidencija from "../models/evidencija";
import EvidencijaPodaciBrojIndeksa from "../models/evidencija_broj_indeksa";
import { query } from "express";

class EvidencijaRepository {
  private getTableName(predmet_id: number, tableType: string): string {
    return `${tableType}_${predmet_id}`;
  }

  async create(evidencija: IEvidencija, predmet_id: number): Promise<Evidencija> {
    const tableName = this.getTableName(predmet_id, "evidencija");
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO ${tableName} (redni_broj_casa, prisutan, napomena, korisnik_fk) VALUES (?, ?, ?, ?)`,
      [evidencija.redni_broj_casa, evidencija.prisutan, evidencija.napomena, evidencija.korisnik_fk]
    );

    return new Evidencija(
      result.insertId,
      evidencija.redni_broj_casa,
      evidencija.prisutan,
      evidencija.napomena || "",
      evidencija.korisnik_fk
    );
  }

  async createMultiple(records: IEvidencija[], predmet_id: number): Promise<void> {
    const tableName = this.getTableName(predmet_id, "evidencija");
    const query = `INSERT IGNORE INTO ${tableName} (redni_broj_casa, prisutan, napomena, korisnik_fk) VALUES ?`;
    const values = records.map((record) => [
        record.redni_broj_casa,
        record.prisutan,
        record.napomena || "",
        record.korisnik_fk
    ]);

    await db.query<ResultSetHeader>(query, [values]);
  }

  async readByStudentId(id: number, predmet_id: number): Promise<Evidencija[]> {
    const tableName = this.getTableName(predmet_id, "evidencija");
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE korisnik_fk = ?`,
      [id]
    );

    return rows.map(row => new Evidencija(
      row.id,
      row.redni_broj_casa,
      row.prisutan,
      row.napomena,
      row.korisnik_fk
    ));
  }

  async readAll(predmet_id: number): Promise<EvidencijaPodaciBrojIndeksa[]> {
    const tableName = this.getTableName(predmet_id, "evidencija");
    const korisnikTableName = this.getTableName(predmet_id, "korisnici");

    const [rows] = await db.execute<RowDataPacket[]>(`
      SELECT 
        e.id,
        e.redni_broj_casa, 
        e.prisutan, 
        e.korisnik_fk, 
        k.broj_indeksa 
      FROM 
        ${tableName} e
      JOIN 
        ${korisnikTableName} k ON e.korisnik_fk = k.id;
    `);

    return rows.map((row: any) => ({
      id: row.id,
      redni_broj_casa: row.redni_broj_casa,
      prisutan: row.prisutan,
      korisnik_fk: row.korisnik_fk,
      broj_indeksa: row.broj_indeksa
    }));
  }

  async readAllByGrupa(predmet_id: number, grupa: number): Promise<EvidencijaPodaciBrojIndeksa[]> {
    const tableName = this.getTableName(predmet_id, "evidencija");
    const korisnikTableName = this.getTableName(predmet_id, "korisnici");
    
    const [rows] = await db.execute<RowDataPacket[]>(`
      SELECT 
        e.id,
        e.redni_broj_casa, 
        e.prisutan, 
        e.korisnik_fk, 
        k.broj_indeksa 
      FROM 
        ${tableName} e
      JOIN 
        ${korisnikTableName} k ON e.korisnik_fk = k.id
      WHERE k.grupa = ${grupa};
    `);
    
    return rows.map((row: any) => ({
      id: row.id,
      redni_broj_casa: row.redni_broj_casa,
      prisutan: row.prisutan,
      korisnik_fk: row.korisnik_fk,
      broj_indeksa: row.broj_indeksa
    }));
  }

  async update(id: number, evidencija: IEvidencija, predmet_id: number): Promise<void> {
    const tableName = this.getTableName(predmet_id, "evidencija");
    const { redni_broj_casa, prisutan, korisnik_fk, napomena = null } = evidencija;

    await db.execute<ResultSetHeader>(
      `UPDATE ${tableName} SET redni_broj_casa = ?, prisutan = ?, napomena = ?, korisnik_fk = ? WHERE id = ?`,
      [redni_broj_casa, prisutan, napomena, korisnik_fk, id]
    );
  }

  async delete(id: number, predmet_id: number): Promise<void> {
    const tableName = this.getTableName(predmet_id, "evidencija");
    await db.execute<ResultSetHeader>(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
  }
}

export default EvidencijaRepository;
