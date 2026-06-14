import toast from "react-hot-toast";
import { Korisnik } from "../../models/korisnik/korisnik";
import { Evidencija } from "../../models/evidencija/evidencija";
import { createMultipleEvidencija } from "../../api/evidencija_api";

export const evidencijaService = {
  async createGroupEvidencija(
    groupKorisnici: Korisnik[],
    selectedKorisnici: Record<number, boolean>,
    redni_broj_casa: number
  ) {
    if (redni_broj_casa < 1) {
      toast.error("Odaberite redni broj časa");
      return false;
    }

    const evidencijaArray: Evidencija[] = groupKorisnici.map((korisnik) => ({
      id: 0,
      redni_broj_casa,
      prisutan: selectedKorisnici[korisnik.id] || false,
      korisnik_fk: korisnik.id,
    }));

    try {
      const result = await createMultipleEvidencija(evidencijaArray);
      if (result) {
        toast.success("Prisustvo uspešno zabeleženo!");
        return true;
      }
      throw new Error("Greška prilikom beleženja prisustva");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Došlo je do greške");
      return false;
    }
  },
};
