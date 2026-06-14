import { IPredmet } from "../interfaces/IPredmet";
import { Predmet } from "../models/predmet";
import NewPredmetInitTablesRepository from "../repositories/new_predmet_init_tables_repository";
import PredmetRepository from "../repositories/predmet_repository";

class PredmetService {
  private predmetRepo = new PredmetRepository();
  private initRepo = new NewPredmetInitTablesRepository();

  // Create a single predmet
  async createPredmet(predmet: IPredmet): Promise<Predmet> {
    const predmet_kreiran: Predmet = await this.predmetRepo.create(predmet);
    this.initRepo.initializePredmet(predmet_kreiran.id, {
      email: 'ta@ftn.rs', 
      password: '$2a$10$XA45YT.XZKbd7xYcN6JyoOIVb3Ylocwpmeaa4.biYMeeFqmDhJDTW', 
      "ime_prezime": 'Maintance Account', 
      uloga: 'TA'
    });
    return predmet;
  }

  // Create multiple predmeti
  async createPredmetForMultiple(records: IPredmet[]): Promise<void> {
    await this.predmetRepo.createMultiple(records);
  }

  // Get all predmeti
  async getAllPredmeti(): Promise<Predmet[]> {
    return this.predmetRepo.readAll();
  }

  // Get a single predmet by ID
  async getPredmetById(id: number): Promise<Predmet | null> {
    return this.predmetRepo.readById(id);
  }

  // Update a predmet
  async updatePredmet(id: number, predmet: IPredmet): Promise<void> {
    await this.predmetRepo.update(id, predmet);
  }

  // Delete a predmet
  async deletePredmet(id: number): Promise<void> {
    await this.predmetRepo.delete(id);
  }
}

export default PredmetService;
