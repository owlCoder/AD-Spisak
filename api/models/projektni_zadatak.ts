import { IProjektniZadatak } from "../interfaces/IProjektniZadatak";

class ProjektniZadatak implements IProjektniZadatak {
  constructor(
    public id: number,
    public tim: number,
    public zadatak: string,
    public korisnik_fk: number,
    public termin_odbrane_id: number,
    public polozeno: boolean
  ) {}
}

export default ProjektniZadatak;