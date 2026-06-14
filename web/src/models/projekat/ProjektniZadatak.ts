export interface ProjektniZadatak {
  id: number;
  tim: number;
  zadatak: string;
  korisnik_fk: number;
  termin_odbrane_id?: number | null;
  polozeno: boolean;
}
