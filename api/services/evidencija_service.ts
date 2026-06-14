import { IEvidencija } from "../interfaces/IEvidencija";
import Evidencija from "../models/evidencija";
import EvidencijaPodaciBrojIndeksa from "../models/evidencija_broj_indeksa";
import EvidencijaRepository from "../repositories/evidencija_repository";

class EvidencijaService {
  private evidencijaRepo = new EvidencijaRepository();

  async createEvidencija(evidencija: IEvidencija, predmet_id: number): Promise<Evidencija> {
    return this.evidencijaRepo.create(evidencija, predmet_id);
  }

  async createEvidencijaForMultiple(records: IEvidencija[], predmet_id: number): Promise<void> {
    await this.evidencijaRepo.createMultiple(records, predmet_id);
  }

  async getEvidencijaPerStudent(id: number, predmet_id: number): Promise<Evidencija[]> {
    return this.evidencijaRepo.readByStudentId(id, predmet_id);
  }

  async getAllEvidencija(predmet_id: number): Promise<EvidencijaPodaciBrojIndeksa[]> {
    return this.evidencijaRepo.readAll(predmet_id);
  }

  async getAllEvidencijaByGrupa(predmet_id: number, grupa: number): Promise<EvidencijaPodaciBrojIndeksa[]> {
    return this.evidencijaRepo.readAllByGrupa(predmet_id, grupa);
  }


  async updateEvidencija(id: number, evidencija: IEvidencija, predmet_id: number): Promise<void> {
    await this.evidencijaRepo.update(id, evidencija, predmet_id);
  }

  async deleteEvidencija(id: number, predmet_id: number): Promise<void> {
    await this.evidencijaRepo.delete(id, predmet_id);
  }
}

export default EvidencijaService;
