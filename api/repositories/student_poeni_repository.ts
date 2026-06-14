import db from "../database/connection";
import { ExportDataPredispitne } from "../models/export_data_predispitne";

// Upit koji se koristi za izvoz podataka na kraju semestra u excel
class StudentPoeniRepository {
    private getKorisnikTableName(predmet_id: number): string {
        return `korisnici_${predmet_id}`;
    }

    private getPoeniTableName(predmet_id: number): string {
        return `poeni_${predmet_id}`;
    }

    async getAllData(predmet_id: number): Promise<ExportDataPredispitne[]> {
        const korisnikTableName = this.getKorisnikTableName(predmet_id);
        const poeniTableName = this.getPoeniTableName(predmet_id);

        const query = `
            SELECT DISTINCT
                k.broj_indeksa,
                k.ime_prezime,
                p.naziv AS naziv_poena,
                p.broj_poena
            FROM 
                ${korisnikTableName} k
            LEFT JOIN 
                ${poeniTableName} p ON k.id = p.korisnik_fk
            WHERE 
                k.uloga = 'STUDENT'
            ORDER BY 
                CAST(SUBSTRING_INDEX(k.broj_indeksa, '/', 1) AS UNSIGNED),
                CAST(SUBSTRING_INDEX(k.broj_indeksa, '/', -1) AS UNSIGNED);`;

        const [rows] = await db.execute(query);
        return rows as ExportDataPredispitne[];
    }
}

export default StudentPoeniRepository;
