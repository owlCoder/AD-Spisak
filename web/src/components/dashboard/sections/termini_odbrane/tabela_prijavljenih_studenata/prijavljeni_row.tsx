import React from 'react';
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import { SacuvajIkonica } from "../../../../layout/icons/sacuvaj_ikonica";
import { GroupedStudent } from './tabela_prijavljenih';
import { CheckMarkIkonica } from '../../../../layout/icons/checkmark_ikonica';

export interface StudentTableRowProps {
  student: Korisnik;
  group: GroupedStudent;
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

export const PrijavljenaOdbranaStudentRed: React.FC<StudentTableRowProps> = ({
  student,
  group,
  editablePoeni,
  editablePolozeno,
  setEditablePoeni,
  setEditablePolozeno,
  onSave
}) => {
  return (
    <tr className="flex flex-col md:table-row border-b bg-primary-50/80 border-primary-200/50 last:border-b-0 hover:bg-primary-100/30 transition-colors duration-300">
      {/* Mobile layout with grid */}
      <td className="md:hidden grid grid-cols-2 gap-4 p-3">
        <div className="flex flex-col">
          <span className="text-sm text-primary-600 font-semibold">Broj indeksa</span>
          <span className="text-primary-900 font-medium">{student.broj_indeksa}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-primary-600 font-semibold">Ime i Prezime</span>
          <span className="text-primary-900 font-medium">{student.ime_prezime}</span>
        </div>
        <div className="flex flex-col col-span-2">
          <span className="text-sm text-primary-600 font-semibold">Zadatak</span>
          <span className="text-primary-900 font-medium">
            G{group.grupa}_T{group.tim} {group.zadatak}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-primary-600 font-semibold">Poeni</span>
          <input
            type="number"
            value={editablePoeni[student.id] || ""}
            onChange={(e) =>
              setEditablePoeni((prev) => ({
                ...prev,
                [student.id]: Number(e.target.value) || 0,
              }))
            }
            className="w-full px-2 py-1 text-center bg-primary-100 border border-primary-300 rounded-lg text-primary-900 
              focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent 
              transition duration-300"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm text-primary-600 font-semibold mb-1">Položeno</span>
          <input
            type="checkbox"
            checked={editablePolozeno[student.id] || false}
            onChange={() =>
              setEditablePolozeno((prev) => ({
                ...prev,
                [student.id]: !prev[student.id],
              }))
            }
            className="form-checkbox h-4 w-4 text-primary-600 accent-primary-600 bg-primary-500 border-primary-500 rounded-sm focus:ring-primary-500"
          />
        </div>
        <div className="flex justify-start col-span-2 mt-1 mb-1">
          <button
            onClick={() => onSave(student)}
              className="px-4 py-2 text-white inline-flex items-center gap-2 base-button rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent"
            title="Sačuvaj"
          >
            <SacuvajIkonica className="h-6 w-6 text-white inline" />
            <span className="md:hidden">Sačuvaj</span>
          </button>
        </div>
      </td>

      {/* Desktop layout */}
      <td className="hidden md:table-cell p-2 text-center text-primary-900">
        <span className="block font-medium">{student.broj_indeksa}</span>
      </td>
      <td className="hidden md:table-cell text-center text-primary-900">
        <span className="block font-medium">{student.ime_prezime}</span>
      </td>
      <td className="hidden md:table-cell p-2 text-center text-primary-900">
        <span className="block font-medium">
          G{group.grupa}_T{group.tim} {group.zadatak}
        </span>
      </td>
      <td className="hidden md:table-cell text-center">
        <input
          type="number"
          value={editablePoeni[student.id] || ""}
          onChange={(e) =>
            setEditablePoeni((prev) => ({
              ...prev,
              [student.id]: Number(e.target.value) || 0,
            }))
          }
          className="w-16 px-2 py-1 text-center bg-primary-100 border border-primary-300 rounded-lg text-primary-900 
            focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent 
            transition duration-300"
        />
      </td>
      <td className="hidden md:table-cell p-2 text-center">
        <input
          type="checkbox"
          checked={editablePolozeno[student.id] || false}
          onChange={() =>
            setEditablePolozeno((prev) => ({
              ...prev,
              [student.id]: !prev[student.id],
            }))
          }
          className="form-checkbox h-4 w-4 text-primary-600 accent-primary-600 bg-primary-500 border-primary-500 rounded-sm focus:ring-primary-500"
        />
      </td>
      <td className="hidden md:table-cell p-1 text-center">
        <button
          onClick={() => onSave(student)}
          className="px-4 py-1 text-white inline-flex items-center gap-2 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 bg-primary-600/90 hover:bg-primary-700 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent"
          title="Sačuvaj"
        >
          <CheckMarkIkonica className="h-6 w-6" />
        </button>
      </td>
    </tr>
  );
};