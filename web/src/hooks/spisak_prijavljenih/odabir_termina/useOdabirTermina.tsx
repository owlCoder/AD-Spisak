import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllPoeniByStudentsFKs } from "../../../api/poeni_api";
import { getProjektniZadaciByTerminOdbraneId } from "../../../api/projektni_zadaci_api";
import { Poeni } from "../../../models/poeni/poeni";
import { ProjektniZadatak } from "../../../models/projekat/ProjektniZadatak";
import { TerminOdbraneProjekta } from "../../../models/termini_odbrane_projekta/termin_odbrane_projekta";

export const useOdabirTerminaData = () => {
    const [selectedTermin, setSelectedTermin] = useState<TerminOdbraneProjekta | null>(null);
    const [poeni, setPoeni] = useState<Poeni[]>([]);
    const [projektniZadaci, setProjektniZadaci] = useState<ProjektniZadatak[]>([]);
    const [editablePoeni, setEditablePoeni] = useState<{ [key: number]: number }>({});
    const [editablePolozeno, setEditablePolozeno] = useState<{ [key: number]: boolean }>({});
  
    useEffect(() => {
      const fetchTermData = async () => {
        if (!selectedTermin) return;
  
        try {
          const zadaci = await getProjektniZadaciByTerminOdbraneId(selectedTermin.id);
          if (!zadaci) return;
  
          setProjektniZadaci(zadaci);
          const studentIds = zadaci.map(z => z.korisnik_fk);
          const poeniData = await getAllPoeniByStudentsFKs(studentIds);
          setPoeni(poeniData || []);
  
          const poeniMap: { [key: number]: number } = {};
          const polozenoMap: { [key: number]: boolean } = {};
          zadaci.forEach(zadatak => {
            const studentPoeni = poeniData?.find(p => p.korisnik_fk === zadatak.korisnik_fk && p.naziv === "Projekat");
            poeniMap[zadatak.korisnik_fk] = studentPoeni?.broj_poena || 0;
            polozenoMap[zadatak.korisnik_fk] = zadatak.polozeno;
          });
  
          setEditablePoeni(poeniMap);
          setEditablePolozeno(polozenoMap);
        } catch {
          toast.error('Greška pri učitavanju podataka');
        }
      };
  
      fetchTermData();
    }, [selectedTermin]);
  
    return {
      selectedTermin,
      setSelectedTermin,
      poeni,
      projektniZadaci,
      editablePoeni,
      setEditablePoeni,
      editablePolozeno,
      setEditablePolozeno,
    };
  };
  