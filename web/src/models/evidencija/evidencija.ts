export interface Evidencija {
  id: number;
  redni_broj_casa: number;
  prisutan: boolean;
  napomena?: string;
  korisnik_fk: number;
}
