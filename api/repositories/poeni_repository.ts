import db from "../database/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import Poeni from "../models/poeni";
import { IPoeni } from "../interfaces/IPoeni";

class PoeniRepository {
  private getTableName(predmet_id: number): string {
    return `poeni_${predmet_id}`;
  }

  async create(poeni: IPoeni, predmet_id: number): Promise<Poeni> {
    const tableName = this.getTableName(predmet_id);
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO ${tableName} (naziv, broj_poena, napomena, korisnik_fk) VALUES (?, ?, ?, ?)`,
      [poeni.naziv, poeni.broj_poena, poeni.napomena || "", poeni.korisnik_fk]
    );

    return new Poeni(
      result.insertId,
      poeni.naziv,
      poeni.broj_poena,
      poeni.napomena || "",
      poeni.korisnik_fk
    );
  }

  async read(id: number, predmet_id: number): Promise<Poeni | null> {
    const tableName = this.getTableName(predmet_id);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    return rows.length
      ? new Poeni(
          rows[0].id,
          rows[0].naziv,
          rows[0].broj_poena,
          rows[0].napomena,
          rows[0].korisnik_fk
        )
      : null;
  }

  async getAllPoeniByUserId(
    userId: number,
    predmet_id: number
  ): Promise<Poeni[]> {
    const tableName = this.getTableName(predmet_id);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE korisnik_fk = ?`,
      [userId]
    );

    return rows.map(
      (row) =>
        new Poeni(
          row.id,
          row.naziv,
          row.broj_poena,
          row.napomena,
          row.korisnik_fk
        )
    );
  }

  async getAllPoeniByGroupKorisnikFK(
    idijevi_studenata: number[],
    predmet_id: number
  ): Promise<Poeni[]> {
    const tableName = this.getTableName(predmet_id);

    // Ensure that idijevi_studenata is not empty to avoid SQL errors
    if (idijevi_studenata.length === 0) {
      return [];
    }

    const query = `
            SELECT 
                id, naziv, broj_poena, korisnik_fk
            FROM 
                ${tableName}
            WHERE 
                korisnik_fk IN (${idijevi_studenata.join(",")})
        `;

    const [rows] = await db.execute<RowDataPacket[]>(query);

    var data = rows.map(
      (row) =>
        new Poeni(
          row.id,
          row.naziv,
          row.broj_poena,
          row.napomena,
          row.korisnik_fk
        )
    );

    return data;
  }

  async update(id: number, poeni: IPoeni, predmet_id: number): Promise<void> {
    const tableName = this.getTableName(predmet_id);
    if (poeni.napomena)
      await db.execute<ResultSetHeader>(
        `UPDATE ${tableName} SET naziv = ?, broj_poena = ?, napomena = ? WHERE id = ?`,
        [poeni.naziv, poeni.broj_poena, poeni.napomena || "", id]
      );
    else
      await db.execute<ResultSetHeader>(
        `UPDATE ${tableName} SET naziv = ?, broj_poena = ? WHERE id = ?`,
        [poeni.naziv, poeni.broj_poena, id]
      );
  }

  async delete(id: number, predmet_id: number): Promise<void> {
    const tableName = this.getTableName(predmet_id);
    await db.execute<ResultSetHeader>(`DELETE FROM ${tableName} WHERE id = ?`, [
      id,
    ]);
  }
}

export default PoeniRepository;
