import { IKorisnik } from "../interfaces/IKorisnik";
import Korisnik from "../models/korisnik";
import KorisnikRepository from "../repositories/korisnik_repository";

class KorisnikService {
    private korisnikRepo = new KorisnikRepository();

    async createKorisnik(korisnik: IKorisnik, predmet_id: number): Promise<Korisnik> {
        return this.korisnikRepo.create(korisnik, predmet_id);
    }

    async getKorisnik(id: number, predmet_id: number): Promise<Korisnik | null> {
        return this.korisnikRepo.read(id, predmet_id);
    }

    async getKorisnikByEmail(email: string, predmet_id: number): Promise<Korisnik | null> {
        return this.korisnikRepo.findByEmail(email, predmet_id);
    }

    async getStudents(predmet_id: number): Promise<Korisnik[]> {
        return this.korisnikRepo.readAllStudents(predmet_id);
    }

    async updateKorisnik(id: number, korisnik: IKorisnik, predmet_id: number): Promise<void> {
        await this.korisnikRepo.update(id, korisnik, predmet_id);
    }

    async deleteKorisnik(id: number, predmet_id: number): Promise<void> {
        await this.korisnikRepo.delete(id, predmet_id);
    }
}

export default KorisnikService;
