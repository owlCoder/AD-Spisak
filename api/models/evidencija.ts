import { IEvidencija } from "../interfaces/IEvidencija";

class Evidencija implements IEvidencija {
  constructor(
    public id: number,
    public redni_broj_casa: number,
    public prisutan: boolean,
    public napomena: string,
    public korisnik_fk: number
  ) {}
}

export default Evidencija;
