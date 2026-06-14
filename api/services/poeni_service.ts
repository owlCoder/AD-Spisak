import { IPoeni } from "../interfaces/IPoeni";
import Poeni from "../models/poeni";
import PoeniRepository from "../repositories/poeni_repository";

class PoeniService {
    private poeniRepo = new PoeniRepository();

    async createPoeni(poeni: IPoeni, predmet_id: number): Promise<Poeni> {
        return this.poeniRepo.create(poeni, predmet_id);
    }

    async getPoeni(id: number, predmet_id: number): Promise<Poeni | null> {
        return this.poeniRepo.read(id, predmet_id);
    }

    async getAllPoeniByUserId(userId: number, predmet_id: number): Promise<Poeni[]> {
        return this.poeniRepo.getAllPoeniByUserId(userId, predmet_id);
    }

    async getAllPoeniByStudentsFKs(ids: number[], predmet_id: number): Promise<Poeni[]> {
        return this.poeniRepo.getAllPoeniByGroupKorisnikFK(ids, predmet_id);
    }

    async updatePoeni(id: number, poeni: IPoeni, predmet_id: number): Promise<void> {
        await this.poeniRepo.update(id, poeni, predmet_id);
    }

    async deletePoeni(id: number, predmet_id: number): Promise<void> {
        await this.poeniRepo.delete(id, predmet_id);
    }
}

export default PoeniService;
