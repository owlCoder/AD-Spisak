import { useMemo } from "react";
import { GroupedStudent } from "../../../components/dashboard/sections/termini_odbrane/tabela_prijavljenih_studenata/tabela_prijavljenih";
import { Korisnik } from "../../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../../models/projekat/ProjektniZadatak";

export const useGroupedStudents = (
  studenti: Korisnik[],
  projektniZadaci: ProjektniZadatak[]
) => {
  return useMemo(() => {
    if (!projektniZadaci.length) return [];

    const studentMap = new Map<string, GroupedStudent>();

    projektniZadaci.forEach((zadatak) => {
      const student = studenti.find((s) => s.id === zadatak.korisnik_fk);
      if (student) {
        const key = `${student.grupa}-${zadatak.tim}-${zadatak.zadatak}`;
        if (!studentMap.has(key)) {
          studentMap.set(key, {
            grupa: student.grupa,
            tim: zadatak.tim,
            zadatak: zadatak.zadatak,
            students: [],
          });
        }
        studentMap.get(key)?.students.push(student);
      }
    });

    return Array.from(studentMap.values()).sort((a, b) => {
      if (a.grupa !== b.grupa) return a.grupa - b.grupa;
      if (a.tim !== b.tim) return a.tim - b.tim;
      return a.zadatak.localeCompare(b.zadatak);
    });
  }, [studenti, projektniZadaci]);
};
