import { IPoeni } from "../interfaces/IPoeni";

class Poeni implements IPoeni {
  constructor(
    public id: number,
    public naziv: string,
    public broj_poena: number,
    public napomena: string,
    public korisnik_fk: number
  ) {}
}

export default Poeni;