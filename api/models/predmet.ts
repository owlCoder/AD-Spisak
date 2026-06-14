import { IPredmet } from "../interfaces/IPredmet";

export class Predmet implements IPredmet {
  constructor(
    public id: number,
    public naziv: string,
    public sifra_predmeta: string,
    public fond_casova: number,
    public predispitne_obaveze: string
  ) {}
}
