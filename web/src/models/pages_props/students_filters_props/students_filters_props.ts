import { Korisnik } from "../../korisnik/korisnik";

export interface FiltersProp {
  brojIndeksa: string;
  imePrezime: string;
  grupa: string;
  selectedGroups: number[];
}

export interface KorisniciFiltersProps {
  filters: FiltersProp;
  onFilterChange: (filters: FiltersProp) => void;
  korisnici: Korisnik[];
  setFilteredKorisnici: (korisnici: Korisnik[]) => void;
  onGroupPickup: (grupa: number) => void;
  children: React.ReactNode;
}
