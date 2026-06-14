import { Korisnik } from "../../korisnik/korisnik";

export interface GroupSectionProps {
  grupa: string;
  korisnici: Korisnik[];
  isOpen: boolean;
  selectedKorisnici: Record<number, boolean>;
  redni_broj_casa: number;
  onGroupSelect: () => void;
  onKorisnikSelect: (id: number) => void;
  onRedni_broj_casaChange: (value: number) => void;
  onPrisustvo: () => void;
}
