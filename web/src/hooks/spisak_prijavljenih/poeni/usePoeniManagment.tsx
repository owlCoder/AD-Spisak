import toast from "react-hot-toast";
import { createPoeni, updatePoeni } from "../../../api/poeni_api";
import { updateProjektniZadatak } from "../../../api/projektni_zadaci_api";
import { Korisnik } from "../../../models/korisnik/korisnik";
import { Poeni } from "../../../models/poeni/poeni";
import { ProjektniZadatak } from "../../../models/projekat/ProjektniZadatak";

export const usePointsManagement = (
  poeni: Poeni[],
  projektniZadaci: ProjektniZadatak[]
) => {
  const handleSave = async (
    student: Korisnik,
    editablePoeni: { [key: number]: number },
    editablePolozeno: { [key: number]: boolean }
  ) => {
    try {
      const postojeciPoeni = poeni.find((p) => p.korisnik_fk === student.id && p.naziv === "Projekat");
      const brojPoena = editablePoeni[student.id];

      if (!postojeciPoeni && brojPoena > 0) {
        const noviPoeni = await createPoeni({
          naziv: `Projekat`,
          broj_poena: brojPoena,
          korisnik_fk: student.id,
        });

        if (noviPoeni) {
          toast.success("Poeni uspešno sačuvani");
          return noviPoeni;
        }
      }

      if (postojeciPoeni) {
        const uspesno = await updatePoeni(postojeciPoeni?.id, {
          ...postojeciPoeni,
          broj_poena: brojPoena,
        });

        const projekat = projektniZadaci.find(
          (p) => p.korisnik_fk == student.id
        );

        if (uspesno && projekat) {
          const status_polozeno = await updateProjektniZadatak({
            ...projekat,
            polozeno: editablePolozeno[student.id],
          });

          if (status_polozeno) {
            toast.success("Poeni evidentirati");
            return postojeciPoeni;
          }
        }
      }

      throw new Error("Nije moguće sačuvati poene");
    } catch (error) {
      toast.error("Greška pri čuvanju podataka");
      throw error;
    }
  };

  return { handleSave };
};
