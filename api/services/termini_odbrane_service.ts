import TerminOdbraneProjektaRepository from "../repositories/termin_odbrane_projekta_repository";
import { ITerminOdbraneProjekta } from "../interfaces/ITerminOdbraneProjekta";
import TerminOdbraneProjekta from "../models/termin_odbrane_projekta";

class TerminiOdbraneService {
    private terminiRepo = new TerminOdbraneProjektaRepository();

    // Call to create a Termin Odbrane
    async createTerminOdbrane(termin: ITerminOdbraneProjekta, predmet_id: number): Promise<TerminOdbraneProjekta> {
        return this.terminiRepo.create(termin, predmet_id);
    }

    // Call to get all Termini Odbrane for a given predmet_id
    async getAllTerminiOdbrane(predmet_id: number): Promise<TerminOdbraneProjekta[]> {
        return this.terminiRepo.readAll(predmet_id);
    }

    // Call to update a specific Termin Odbrane by id
    async updateTerminOdbrane(id: number, termin: ITerminOdbraneProjekta, predmet_id: number): Promise<void> {
        return this.terminiRepo.update(id, termin, predmet_id);
    }
}

export default TerminiOdbraneService;
