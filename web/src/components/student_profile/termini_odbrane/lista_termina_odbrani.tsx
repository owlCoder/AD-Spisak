import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getStudentProjektniZadatak,
  updateProjektniZadatak,
} from "../../../api/projektni_zadaci_api";
import { getAllTerminiOdbrane } from "../../../api/termini_odbrane_api";
import { Korisnik } from "../../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../../models/projekat/ProjektniZadatak";
import { TerminOdbraneProjekta } from "../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { Spinner } from "../../layout/loading/loading";
import { TerminCard } from "./termin_card/termin_card";

export const ListaTerminaOdbrane: React.FC<{ student: Korisnik }> = ({
  student,
}) => {
  const [termini, setTermini] = useState<TerminOdbraneProjekta[]>([]);
  const [projekat, setProjekat] = useState<ProjektniZadatak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTermini();
    fetchProjekat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTermini = async () => {
    setLoading(true);
    const fetchedTermini = await getAllTerminiOdbrane();
    setTermini(fetchedTermini);
    setLoading(false);
  };

  const fetchProjekat = async () => {
    setLoading(true);
    const data = await getStudentProjektniZadatak(student.id);
    setProjekat(data);
    setLoading(false);
  };

  const handlePrijava = async (terminId: number) => {
    if (!projekat) return;

    try {
      const updatedProjekat: ProjektniZadatak = {
        ...projekat,
        termin_odbrane_id: terminId,
      };

      const success = await updateProjektniZadatak(updatedProjekat);
      if (success) {
        setProjekat(updatedProjekat);
        toast.success("Prijava projekta je uspešna");
      }
    } catch {
      toast.error("Nije moguća izmena prijave");
    }
  };

  const handleOtkaziPrijavu = async () => {
    if (!projekat) return;

    try {
      const updatedProjekat: ProjektniZadatak = {
        ...projekat,
        termin_odbrane_id: null,
      };

      const success = await updateProjektniZadatak(updatedProjekat);
      if (success) {
        setProjekat(updatedProjekat);
        toast.success("Prijava je uspešno otkazana");
      }
    } catch {
      toast.error("Nije moguće otkazati prijavu");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center text-center gap-8 items-center">
        <Spinner size="lg" text="Učitavanje..." />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {termini.map((termin) => (
        <TerminCard
          key={termin.id}
          termin={termin}
          projekat={projekat}
          handlePrijava={handlePrijava}
          handleOtkaziPrijavu={handleOtkaziPrijavu}
        />
      ))}
    </div>
  );
};

export default ListaTerminaOdbrane;
