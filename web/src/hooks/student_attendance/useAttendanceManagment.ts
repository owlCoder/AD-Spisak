import { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import {
  getAllEvidencijaPerGrupa,
  updateEvidencija,
  createEvidencija,
  deleteEvidencija,
} from "../../api/evidencija_api";
import { IEvidencijaPodaciBrojIndeksa } from "../../models/evidencija/evidencija_broj_indeksa";

export const AttendanceManagement = (grupa: number, isOpen: boolean) => {
  const [evidencijaPoGrupi, setEvidencijaPoGrupi] = useState<
    IEvidencijaPodaciBrojIndeksa[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchedGrupa, setLastFetchedGrupa] = useState<number | null>(null);

  const fetchEvidencijaData = useCallback(
    async (targetGrupa: number) => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        const evidencija = await getAllEvidencijaPerGrupa(targetGrupa);
        setEvidencijaPoGrupi(evidencija);
        setLastFetchedGrupa(targetGrupa);
      } catch {
        toast.error("Došlo je do greške pri učitavanju podataka");
        setEvidencijaPoGrupi([]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  // Effect to handle initial load and group changes
  useEffect(() => {
    const targetGrupa = Number(grupa);

    // Fetch data if:
    // 1. We haven't fetched for this group yet
    // 2. The section is open and it's a different group
    // 3. We're switching from closed to open state
    if (
      lastFetchedGrupa === null ||
      (isOpen && targetGrupa !== lastFetchedGrupa) ||
      (isOpen && evidencijaPoGrupi.length === 0)
    ) {
      
      fetchEvidencijaData(targetGrupa);
    }
  }, [
    grupa,
    isOpen,
    lastFetchedGrupa,
    fetchEvidencijaData,
    evidencijaPoGrupi.length,
  ]);

  const handleAttendanceClick = useCallback(
    async (korisnikId: number, classNumber: number) => {
      if (!isOpen) {
        toast.error("Molimo vas da prvo otvorite grupu");
        return;
      }

      const existingEvidencija = evidencijaPoGrupi.find(
        (e) => e.korisnik_fk === korisnikId && e.redni_broj_casa === classNumber
      );

      try {
        if (existingEvidencija) {
          const updatedEvidencija = {
            ...existingEvidencija,
            prisutan: !existingEvidencija.prisutan,
          };

          const success = await updateEvidencija(
            existingEvidencija.id,
            updatedEvidencija
          );

          if (success) {
            setEvidencijaPoGrupi((prev) =>
              prev.map((item) =>
                item.id === existingEvidencija.id
                  ? { ...updatedEvidencija, broj_indeksa: item.broj_indeksa }
                  : item
              )
            );
            toast.success("Prisustvo je ažurirano");
          }
        } else {
          const newEvidencija = {
            id: 0,
            redni_broj_casa: classNumber,
            prisutan: true,
            korisnik_fk: korisnikId,
            napomena: "",
          };

          const success = await createEvidencija(newEvidencija);

          if (success) {
            setEvidencijaPoGrupi((prev) => [
              ...prev,
              { ...newEvidencija, id: success.id, broj_indeksa: "" },
            ]);
            toast.success("Novo prisustvo je evidentirano");
          }
        }
      } catch {
        toast.error("Došlo je do greške pri obradi prisustva");
      }
    },
    [isOpen, evidencijaPoGrupi]
  );

  const handleDeleteEvidencija = useCallback(
    async (korisnikId: number, classNumber: number) => {
      if (!isOpen) {
        toast.error("Molimo vas da prvo otvorite grupu");
        return;
      }

      const existingEvidencija = evidencijaPoGrupi.find(
        (e) => e.korisnik_fk === korisnikId && e.redni_broj_casa === classNumber
      );

      if (!existingEvidencija) {
        toast.error("Nema evidentiranja za ovu kombinaciju.");
        return;
      }

      try {
        const success = await deleteEvidencija(existingEvidencija.id);
        if (success) {
          setEvidencijaPoGrupi((prev) =>
            prev.filter((e) => e.id !== existingEvidencija.id)
          );
          toast.success("Evidencija je obrisana");
        }
      } catch {
        toast.error("Došlo je do greške pri brisanju evidencije");
      }
    },
    [isOpen, evidencijaPoGrupi]
  );

  const handleGroupAttendanceCreated = useCallback(async () => {
    if (!isOpen) {
      toast.error("Molimo vas da prvo otvorite grupu");
      return;
    }
    await fetchEvidencijaData(Number(grupa));
  }, [isOpen, grupa, fetchEvidencijaData]);

  return useMemo(
    () => ({
      evidencijaPoGrupi,
      isLoading,
      handleAttendanceClick,
      handleDeleteEvidencija,
      handleGroupAttendanceCreated,
      fetchEvidencijaData,
    }),
    [
      evidencijaPoGrupi,
      isLoading,
      handleAttendanceClick,
      handleDeleteEvidencija,
      handleGroupAttendanceCreated,
      fetchEvidencijaData,
    ]
  );
};
