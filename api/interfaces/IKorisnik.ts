export interface IKorisnik {
  id: number;
  email: string;
  password: string;
  ime_prezime: string;
  uloga: "STUDENT" | "TA";
  broj_indeksa: string;
  grupa: number;
  ocena: number;
}
