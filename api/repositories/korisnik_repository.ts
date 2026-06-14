import db from "../database/connection";
import { IKorisnik } from "../interfaces/IKorisnik";
import Korisnik from "../models/korisnik";
import { ResultSetHeader, RowDataPacket } from "mysql2";

class KorisnikRepository {
    private getTableName(predmet_id: number): string {
        return `korisnici_${predmet_id}`;
    }

    async create(korisnik: IKorisnik, predmet_id: number): Promise<Korisnik> {
        const tableName = this.getTableName(predmet_id);
        const [result] = await db.execute<ResultSetHeader>(
            `INSERT INTO ${tableName} (email, password, ime_prezime, uloga, broj_indeksa, grupa, ocena) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                korisnik.email,
                korisnik.password,
                korisnik.ime_prezime,
                korisnik.uloga,
                korisnik.broj_indeksa,
                korisnik.grupa,
                korisnik.ocena
            ]
        );

        return new Korisnik(result.insertId, korisnik.email, korisnik.password, korisnik.ime_prezime, korisnik.uloga, korisnik.broj_indeksa, korisnik.grupa, korisnik.ocena);
    }

    async read(id: number, predmet_id: number): Promise<Korisnik | null> {
        const tableName = this.getTableName(predmet_id);
        const [rows] = await db.execute<RowDataPacket[]>(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);

        return rows.length
            ? new Korisnik(rows[0].id, rows[0].email, rows[0].password, rows[0].ime_prezime, rows[0].uloga, rows[0].broj_indeksa, rows[0].grupa, rows[0].ocena)
            : null;
    }

    async findByEmail(email: string, predmet_id: number): Promise<Korisnik | null> {
        const tableName = this.getTableName(predmet_id);
        const [rows] = await db.execute<RowDataPacket[]>(`SELECT * FROM ${tableName} WHERE email = ?`, [email]);
        return rows.length
            ? new Korisnik(rows[0].id, rows[0].email, rows[0].password, rows[0].ime_prezime, rows[0].uloga, rows[0].broj_indeksa, rows[0].grupa, rows[0].ocena)
            : null;
    }

    async readAllStudents(predmet_id: number): Promise<Korisnik[]> {
        const tableName = this.getTableName(predmet_id);
        const [rows] = await db.execute<RowDataPacket[]>(`SELECT * FROM ${tableName} WHERE uloga = 'STUDENT'`);
        return rows.map(row => new Korisnik(row.id, row.email, row.password, row.ime_prezime, row.uloga, row.broj_indeksa, row.grupa, row.ocena));
    }

    async update(id: number, korisnik: IKorisnik, predmet_id: number): Promise<void> {
        const tableName = this.getTableName(predmet_id);
        await db.execute<ResultSetHeader>(
            `UPDATE ${tableName} SET email = ?, password = ?, ime_prezime = ?, uloga = ?, broj_indeksa = ?, grupa = ?, ocena = ? WHERE id = ?`,
            [
                korisnik.email,
                korisnik.password,
                korisnik.ime_prezime,
                korisnik.uloga,
                korisnik.broj_indeksa,
                korisnik.grupa,
                korisnik.ocena,
                id
            ]
        );
    }

    async delete(id: number, predmet_id: number): Promise<void> {
        const tableName = this.getTableName(predmet_id);
        await db.execute<ResultSetHeader>(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    }
}

export default KorisnikRepository;
