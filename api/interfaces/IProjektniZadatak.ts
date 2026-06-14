export interface IProjektniZadatak {
  id?: number;
  tim: number;
  zadatak: string;
  korisnik_fk: number;
  termin_odbrane_id: number;
  polozeno: boolean;
}
