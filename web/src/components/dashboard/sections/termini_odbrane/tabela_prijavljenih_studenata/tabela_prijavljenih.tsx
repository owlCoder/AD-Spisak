import React, { useState } from "react";
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../../../../models/projekat/ProjektniZadatak";
import { TerminOdbraneProjekta } from "../../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { StatistikaPrijavljenihOdbranaProjekata } from "../../termini_odbrane/statistika_prijavljenih/statistika_prijavljenih";
import { PrijavljenaOdbranaStudentRed } from "./prijavljeni_row";

export interface GroupedStudent {
  grupa: number;
  tim: number;
  zadatak: string;
  students: Korisnik[];
}

export interface StudentTableProps {
  ukupnoStudenata: number;
  projektniZadaci: ProjektniZadatak[];
  odabraniTermin: TerminOdbraneProjekta;
  groupedStudents: GroupedStudent[];
  editablePoeni: { [key: number]: number };
  editablePolozeno: { [key: number]: boolean };
  setEditablePoeni: (
    fn: (prev: { [key: number]: number }) => { [key: number]: number }
  ) => void;
  setEditablePolozeno: (
    fn: (prev: { [key: number]: boolean }) => { [key: number]: boolean }
  ) => void;
  onSave: (student: Korisnik) => void;
}

export const TabelaPrijavljenihStudenataZaOdbranu: React.FC<
  StudentTableProps
> = ({
  ukupnoStudenata,
  projektniZadaci,
  odabraniTermin,
  groupedStudents,
  editablePoeni,
  editablePolozeno,
  setEditablePoeni,
  setEditablePolozeno,
  onSave,
}) => {
  const [updatedGroupedStudents] = useState(groupedStudents);
  const [updatedProjektniZadaci, setUpdatedProjektniZadaci] =
    useState(projektniZadaci);

  const handleSave = (student: Korisnik) => {
    // Update projektni zadaci
    const updatedTasks = projektniZadaci.map((task) => {
      if (
        task.korisnik_fk === student.id &&
        task.termin_odbrane_id === odabraniTermin.id
      ) {
        return {
          ...task,
          poeni: editablePoeni[student.id] || 0,
          polozeno: editablePolozeno[student.id] || false,
        };
      }
      return task;
    });

    setUpdatedProjektniZadaci(updatedTasks);

    // Call original onSave method
    onSave(student);
  };

  return (
    <>
      <StatistikaPrijavljenihOdbranaProjekata
        ukupnoStudenata={ukupnoStudenata}
        projektniZadaci={updatedProjektniZadaci}
        odabraniTermin={odabraniTermin}
        groupedStudents={updatedGroupedStudents}
      />
      <div className="overflow-x-auto rounded-xl border border-primary-200">
        {/* Desktop Table */}
        <table className="w-full hidden md:table">
          <thead>
            <tr className="bg-primary-200/50">
              <th className="p-2.5 text-primary-600 font-medium tracking-wide uppercase">
                Broj indeksa
              </th>
              <th className="text-primary-600 font-medium tracking-wide uppercase">
                Ime i Prezime
              </th>
              <th className="p-2.5 text-primary-600 font-medium tracking-wide uppercase">
                Zadatak
              </th>
              <th className="p-2.5 text-primary-600 font-medium tracking-wide uppercase">
                Poeni
              </th>
              <th className="p-2.5 text-primary-600 font-medium tracking-wide uppercase">
                Položeno
              </th>
              <th className="p-2.5 text-primary-600 font-medium tracking-wide uppercase">
                Sačuvaj
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-200/50">
            {groupedStudents.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {group.students.map((student) => (
                  <PrijavljenaOdbranaStudentRed
                    key={student.id}
                    student={student}
                    group={group}
                    editablePoeni={editablePoeni}
                    editablePolozeno={editablePolozeno}
                    setEditablePoeni={setEditablePoeni}
                    setEditablePolozeno={setEditablePolozeno}
                    onSave={handleSave}
                  />
                ))}
                {groupIndex < groupedStudents.length - 1 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="bg-primary-600/40 h-[0.5px]"
                    ></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Mobile List */}
        <div className="md:hidden">
          {groupedStudents.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {group.students.map((student) => (
                <PrijavljenaOdbranaStudentRed
                  key={student.id}
                  student={student}
                  group={group}
                  editablePoeni={editablePoeni}
                  editablePolozeno={editablePolozeno}
                  setEditablePoeni={setEditablePoeni}
                  setEditablePolozeno={setEditablePolozeno}
                  onSave={handleSave}
                />
              ))}
              {groupIndex < groupedStudents.length - 1 && (
                <div className="h-0.5 bg-primary-300 my-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
