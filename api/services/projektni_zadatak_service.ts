import ProjektniZadatakRepository from "../repositories/projektni_zadatak_repository";
import { IProjektniZadatak } from "../interfaces/IProjektniZadatak";
import ProjektniZadatak from "../models/projektni_zadatak";

class ProjektniZadatakService {
    private projektniZadatakRepo = new ProjektniZadatakRepository();

    async createSingleZadatak(predmet_id: number, zadatak: IProjektniZadatak): Promise<ProjektniZadatak | null> {
        return this.projektniZadatakRepo.createSingle(predmet_id, zadatak);
    }

    async updateSingleZadatak(predmet_id: number, zadatak: IProjektniZadatak): Promise<boolean> {
        return this.projektniZadatakRepo.updateSingle(predmet_id, zadatak);
    }

    async getAllZadaci(predmet_id: number): Promise<ProjektniZadatak[]> {
        return this.projektniZadatakRepo.getAllZadaci(predmet_id);
    }

    async getZadatakByStudent(predmet_id: number, korisnik_fk: number): Promise<ProjektniZadatak | null> {
        return this.projektniZadatakRepo.getZadatakByStudent(predmet_id, korisnik_fk);
    }

    async getProjektiByTerminOdbraneId(predmet_id: number, termin_odbrane_id: number): Promise<ProjektniZadatak[]> {
        return this.projektniZadatakRepo.getProjektiByTerminOdbraneId(predmet_id, termin_odbrane_id);
    }

    async deleteZadatakByKorisnikFK(predmet_id: number, id: number): Promise<void> {
        await this.projektniZadatakRepo.deleteByKorisnikFK(predmet_id, id);
    }
}

export default ProjektniZadatakService;
