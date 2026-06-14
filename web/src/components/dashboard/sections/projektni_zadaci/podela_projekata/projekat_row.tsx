import React from "react";
import { ZadatakInput } from "../../../../../hooks/projektni_zadaci/projektni_zadaci";
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import DeleteIkonica from "../../../../layout/icons/delete_ikonica";

interface ProjektniZadatakRowProps {
  korisnik: Korisnik;
  zadatak?: ZadatakInput;
  onInputChange: (field: keyof ZadatakInput, value: string) => void;
  onDelete: () => void;
}

export const ProjektniZadatakRow: React.FC<ProjektniZadatakRowProps> = ({
  korisnik,
  zadatak,
  onInputChange,
  onDelete,
}) => (
  <tr className="border-b bg-primary-50/80 border-primary-200/50 last:border-b-0 hover:bg-primary-100/30 transition-colors duration-300">
    <td className="p-3 text-primary-900">
      <span className="block text-center font-medium">
        {korisnik.broj_indeksa}
      </span>
    </td>
    <td className="p-3 hidden lg:table-cell text-primary-900">
      <span className="block text-center font-medium">
        {korisnik.ime_prezime}
      </span>
    </td>
    <td className="p-3 hidden lg:table-cell text-primary-900">
      <span className="block text-center font-medium">{korisnik.grupa}</span>
    </td>
    <td className="p-3">
      <input
        type="number"
        min="1"
        value={zadatak?.tim || ""}
        onChange={(e) => onInputChange("tim", e.target.value)}
        className="w-full px-3 py-2 text-center bg-primary-100 border border-primary-300 rounded-lg text-primary-900 
        focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent 
        transition duration-300 placeholder-primary-500/50"
        placeholder="/"
      />
    </td>
    <td className="p-3 relative">
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={zadatak?.zadatak || ""}
          onChange={(e) => onInputChange("zadatak", e.target.value.toUpperCase())}
          className="w-full px-3 py-2 text-center bg-primary-100 border border-primary-300 rounded-lg text-primary-900 
          focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent 
          transition duration-300 placeholder-primary-500/50"
          placeholder="npr. S01"
        />
        {zadatak?.tim && zadatak?.zadatak ? (
          <button
            onClick={onDelete}
            className="absolute right-3.5 p-1 hover:bg-red-50 rounded-full transition-colors duration-300"
            title="Obriši projekni zadatak"
          >
            <DeleteIkonica className="w-5 h-5 text-red-600/70 hover:text-red-700" />
          </button>
        ) : (
          <button className="absolute right-2 p-1 cursor-default">
            <DeleteIkonica className="w-5 h-5 text-transparent" />
          </button>
        )}
      </div>
    </td>
  </tr>
);
