import { IEvidencijaPodaciBrojIndeksa } from "../interfaces/IEvidencijaPodaciBrojIndeksa";

class EvidencijaPodaciBrojIndeksa implements IEvidencijaPodaciBrojIndeksa {
  constructor(
    public redni_broj_casa: number,
    public prisutan: boolean,
    public korisnik_fk: number,
    public broj_indeksa: string
  ) {}
}

export default EvidencijaPodaciBrojIndeksa;
