import React from "react";
import toast from "react-hot-toast";
import {
  updateEvidencija,
  deleteEvidencija,
} from "../../../../../api/evidencija_api";
import { Evidencija } from "../../../../../models/evidencija/evidencija";
import DeleteIkonica from "../../../../layout/icons/delete_ikonica";

interface EvidencijaItemProps {
  evidencija: Evidencija;
  onUpdate: () => void;
  onDelete: () => void;
}

const StudentEvidencijaLista: React.FC<EvidencijaItemProps> = ({
  evidencija,
  onUpdate,
  onDelete,
}) => {
  const handleToggle = async () => {
    try {
      await updateEvidencija(evidencija.id, {
        ...evidencija,
        prisutan: !evidencija.prisutan,
      });
      onUpdate();
      toast.success("Status uspešno ažuriran");
    } catch {
      toast.error("Greška pri ažuriranju statusa");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvidencija(evidencija.id);
      onDelete();
      toast.success("Evidencija uspešno obrisana");
    } catch {
      toast.error("Greška pri brisanju evidencije");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4">
      <div className="flex-1 p-4 bg-primary-200/40 border border-primary-300 rounded-lg transition duration-300 hover:bg-primary-200/40">
        <span className="flex flex-col items-center mb-2 font-semibold">
          Čas {evidencija.redni_broj_casa}{" "}
          <span
            className={`font-medium -skew-x-3 ${
              evidencija.prisutan ? "text-primary-500" : "text-rose-700"
            }`}
          >
            {evidencija.prisutan ? "Prisutan" : "Odsutan"}
          </span>
        </span>
        <div className="flex justify-between gap-2 mt-2">
          <button
            onClick={handleToggle}
            className={`px-2 py-1 rounded w-1/2 transition duration-300 ${
              evidencija.prisutan
                ? "bg-slate-500/90 hover:bg-slate-600 text-white"
                : "bg-primary-500 hover:bg-primary-600 text-white"
            }`}
          >
            {evidencija.prisutan ? "Odsutan" : "Prisutan"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600/80 text-white w-1/2 py-1 rounded-sm hover:bg-red-700/80 transition duration-300 disabled:opacity-50"
          >
            <DeleteIkonica className="inline-block w-5 h-5 text-primary-50 -mt-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentEvidencijaLista;
