import db from "../database/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IProjektniZadatak } from "../interfaces/IProjektniZadatak";
import ProjektniZadatak from "../models/projektni_zadatak";

class ProjektniZadatakRepository {
    private getTableName(predmet_id: number): string {
        return `projekti_${predmet_id}`;
    }

    async createSingle(predmet_id: number, zadatak: IProjektniZadatak): Promise<ProjektniZadatak | null> {
        try {
            const tableName = this.getTableName(predmet_id);
            const [result] = await db.execute<ResultSetHeader>(
                `INSERT INTO ${tableName} (tim, zadatak, korisnik_fk) VALUES (?, ?, ?)`,
                [zadatak.tim, zadatak.zadatak, zadatak.korisnik_fk]
            );

            return new ProjektniZadatak(
                result.insertId,
                zadatak.tim,
                zadatak.zadatak,
                zadatak.korisnik_fk,
                zadatak.termin_odbrane_id,
                zadatak.polozeno
            );
        } catch (error) {
            console.error('Failed to create single task:', error);
            return null;
        }
    }

    async updateSingle(predmet_id: number, zadatak: IProjektniZadatak): Promise<boolean> {
        try {
            if (!zadatak?.id || zadatak?.tim == null || !zadatak?.zadatak || !zadatak?.korisnik_fk) {
                return false;
            }

            const tableName = this.getTableName(predmet_id);
            await db.execute<ResultSetHeader>(
                `UPDATE ${tableName} SET tim = ?, zadatak = ?, korisnik_fk = ?, termin_odbrane_id = ?, polozeno = ? WHERE id = ?`,
                [zadatak.tim, zadatak.zadatak, zadatak.korisnik_fk, zadatak.termin_odbrane_id, zadatak.polozeno, zadatak.id]
            );
            return true;
        } catch (error) {
            console.error('Failed to update single task:', error);
            return false;
        }
    }

    async getAllZadaci(predmet_id: number): Promise<ProjektniZadatak[]> {
        const tableName = this.getTableName(predmet_id);
        const [rows] = await db.execute<RowDataPacket[]>(
            `SELECT * FROM ${tableName}`
        );

        return rows.map(
            (row) => new ProjektniZadatak(
                row.id,
                row.tim,
                row.zadatak,
                row.korisnik_fk,
                row.termin_odbrane_id,
                row.polozeno
            )
        );
    }

    async getZadatakByStudent(predmet_id: number, korisnik_fk: number): Promise<ProjektniZadatak | null> {
        const tableName = this.getTableName(predmet_id);
        const [rows] = await db.execute<RowDataPacket[]>(
            `SELECT * FROM ${tableName} WHERE korisnik_fk = ? LIMIT 1`,
            [korisnik_fk]
        );

        if (rows.length === 0) {
          return null;
        }

        const row = rows[0];
        return new ProjektniZadatak(
          row.id,
          row.tim,
          row.zadatak,
          row.korisnik_fk,
          row.termin_odbrane_id,
          row.polozeno
        );
    }

    async getProjektiByTerminOdbraneId(predmet_id: number, termin_odbrane_id: number): Promise<ProjektniZadatak[]> {
        const tableName = this.getTableName(predmet_id);
        const [rows] = await db.execute<RowDataPacket[]>(
            `SELECT * FROM ${tableName} WHERE termin_odbrane_id = ?`,
            [termin_odbrane_id]
        );

        if (rows.length === 0) {
          return [];
        }

        return rows.map(
            (row) => new ProjektniZadatak(
                row.id,
                row.tim,
                row.zadatak,
                row.korisnik_fk,
                row.termin_odbrane_id,
                row.polozeno
            )
        );
    }

    async deleteByKorisnikFK(predmet_id: number, id: number): Promise<void> {
        const tableName = this.getTableName(predmet_id);
        await db.execute<ResultSetHeader>(
            `DELETE FROM ${tableName} WHERE korisnik_fk = ?`,
            [id]
        );
    }
}

export default ProjektniZadatakRepository;
