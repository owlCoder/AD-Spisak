import { IKorisnik } from "../interfaces/IKorisnik";

class Korisnik implements IKorisnik {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public ime_prezime: string,
    public uloga: "STUDENT" | "TA",
    public broj_indeksa: string,
    public grupa: number,
    public ocena: number
  ) {}
}

export default Korisnik;
