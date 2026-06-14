import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  deleteProjektniZadatakByKorisnikFK,
  updateProjektniZadatak,
  createProjektniZadatak,
} from "../../api/projektni_zadaci_api";
import { ProjektniZadatak } from "../../models/projekat/ProjektniZadatak";

export interface ZadatakInput {
  tim: string;
  zadatak: string;
}

const hasZadatakChanged = (
  original: ProjektniZadatak,
  current: ZadatakInput
): boolean => {
  return (
    original.tim !== parseInt(current.tim) ||
    original.zadatak !== current.zadatak
  );
};

export const useProjektniZadaci = (
  projekti: ProjektniZadatak[],
  onUpdate: () => void
) => {
  const [zadaci, setZadaci] = useState<Record<number, ZadatakInput>>({});
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [, setOriginalZadaci] = useState<Record<number, ZadatakInput>>({});

  useEffect(() => {
    const initialZadaci: Record<number, ZadatakInput> = {};
    projekti.forEach((projekt) => {
      initialZadaci[projekt.korisnik_fk] = {
        tim: projekt.tim.toString(),
        zadatak: projekt.zadatak,
      };
    });
    setZadaci(initialZadaci);
    setOriginalZadaci(initialZadaci);
  }, [projekti]);

  const handleInputChange = (
    korisnikId: number,
    field: keyof ZadatakInput,
    value: string
  ) => {
    setZadaci((prev) => ({
      ...prev,
      [korisnikId]: {
        ...prev[korisnikId],
        [field]: value,
      },
    }));
  };

  const handleDeleteZadatak = async (korisnikId: number) => {
    try {
      const ok = await deleteProjektniZadatakByKorisnikFK(korisnikId);

      if (ok) {
        toast.success("Projekat uklonjen");
        setZadaci((prev) => {
          const newZadaci = { ...prev };
          delete newZadaci[korisnikId];
          return newZadaci;
        });
        setOriginalZadaci((prev) => {
          const newOriginal = { ...prev };
          delete newOriginal[korisnikId];
          return newOriginal;
        });
      } else {
        toast.error("Nije moguće dodati studentu projekat");
      }
    } catch {
      toast.error("Nije moguće obrisati projektni zadatak");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const { toUpdate, toCreate } = Object.entries(zadaci).reduce(
        (acc, [korisnikId, data]) => {
          if (data.tim && data.zadatak) {
            const existing = projekti.find(
              (p) => p.korisnik_fk === parseInt(korisnikId)
            );

            const zadatak: ProjektniZadatak = {
              id: existing?.id || 0,
              korisnik_fk: parseInt(korisnikId),
              tim: parseInt(data.tim),
              zadatak: data.zadatak,
              termin_odbrane_id: existing?.termin_odbrane_id,
              polozeno: existing?.polozeno ?? false,
            };

            if (existing) {
              // Only add to update if the data has actually changed
              if (hasZadatakChanged(existing, data)) {
                acc.toUpdate.push(zadatak);
              }
            } else {
              acc.toCreate.push(zadatak);
            }
          }
          return acc;
        },
        {
          toUpdate: [] as ProjektniZadatak[],
          toCreate: [] as ProjektniZadatak[],
        }
      );

      let success = true;
      const updateResults: boolean[] = [];
      const createResults: (ProjektniZadatak | null)[] = [];

      // Handle updates one by one
      for (const zadatak of toUpdate) {
        const result = await updateProjektniZadatak(zadatak);
        updateResults.push(result);
      }

      // Handle creates one by one
      for (const zadatak of toCreate) {
        const result = await createProjektniZadatak(zadatak);
        createResults.push(result);
      }

      const allUpdatesSuccessful = updateResults.every((result) => result);
      const allCreatesSuccessful = createResults.every(
        (result) => result !== null
      );
      success = allUpdatesSuccessful && allCreatesSuccessful;

      if (success) {
        toast.success("Uspešno sačuvane promene");
        // Update original state to match current state for successful updates
        setOriginalZadaci(zadaci);
        onUpdate();
      } else {
        const failedUpdates = updateResults.filter((r) => !r).length;
        const failedCreates = createResults.filter((r) => r === null).length;
        toast.error(
          `Došlo je do greške: ${failedUpdates} neuspešnih ažuriranja, ${failedCreates} neuspešnih kreiranja`
        );
      }
    } catch (error) {
      toast.error("Došlo je do greške prilikom čuvanja promena");
      console.error("Save changes error:", error);
    }
  };

  return {
    zadaci,
    selectedGroups,
    setSelectedGroups,
    handleInputChange,
    handleDeleteZadatak,
    handleSaveChanges,
  };
};
