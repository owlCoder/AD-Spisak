import db from "../database/connection";
import { ITerminOdbraneProjekta } from "../interfaces/ITerminOdbraneProjekta";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import TerminOdbraneProjekta from "../models/termin_odbrane_projekta";

class TerminOdbraneProjektaRepository {
    private getTableName(predmet_id: number): string {
        return `termini_odbrane_projekata_${predmet_id}`;
    }

    async create(termin: ITerminOdbraneProjekta, predmet_id: number): Promise<TerminOdbraneProjekta> {
        const tableName = this.getTableName(predmet_id);
        const [result] = await db.execute<ResultSetHeader>(
            `INSERT INTO ${tableName} (naziv_termina_odbrane, datum, vreme_odbrane, ucionica, aktivan, prijava_otvorena, napomena) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                termin.naziv_termina_odbrane,
                termin.datum,
                termin.vreme_odbrane,
                termin.ucionica,
                termin.aktivan,
                termin.prijava_otvorena,
                termin.napomena || null
            ]
        );

        return new TerminOdbraneProjekta(
            result.insertId, 
            termin.naziv_termina_odbrane, 
            termin.datum, 
            termin.vreme_odbrane, 
            termin.ucionica, 
            termin.aktivan, 
            termin.prijava_otvorena, 
            termin.napomena
        );
    }

    async readAll(predmet_id: number): Promise<TerminOdbraneProjekta[]> {
        const tableName = this.getTableName(predmet_id);
        const [rows] = await db.execute<RowDataPacket[]>(`SELECT * FROM ${tableName}`);
        
        return rows.map(row => 
            new TerminOdbraneProjekta(
                row.id, 
                row.naziv_termina_odbrane, 
                row.datum, 
                row.vreme_odbrane, 
                row.ucionica, 
                row.aktivan, 
                row.prijava_otvorena, 
                row.napomena
            )
        );
    }

    // ReadById(predmetId, terminId)

    async update(id: number, termin: ITerminOdbraneProjekta, predmet_id: number): Promise<void> {
        const tableName = this.getTableName(predmet_id);
        await db.execute<ResultSetHeader>(
            `UPDATE ${tableName} SET 
                naziv_termina_odbrane = ?, 
                datum = ?, 
                vreme_odbrane = ?, 
                ucionica = ?, 
                aktivan = ?, 
                prijava_otvorena = ?, 
                napomena = ? 
            WHERE id = ?`,
            [
                termin.naziv_termina_odbrane,
                termin.datum,
                termin.vreme_odbrane,
                termin.ucionica,
                termin.aktivan,
                termin.prijava_otvorena,
                termin.napomena || null,
                id
            ]
        );
    }
}

export default TerminOdbraneProjektaRepository;