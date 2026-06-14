import React, { useState } from "react";
import toast from "react-hot-toast";
import { updatePoeni, deletePoeni } from "../../../../../api/poeni_api";
import { Poeni } from "../../../../../models/poeni/poeni";
import DeleteIkonica from "../../../../layout/icons/delete_ikonica";
import { IzmeniIkonica } from "../../../../layout/icons/izmeni_ikonica";
import { SacuvajIkonica } from "../../../../layout/icons/sacuvaj_ikonica";
import { UkloniIkonica } from "../../../../layout/icons/ukloni_ikonica";

interface PoeniItemProps {
  poen: Poeni;
  onUpdate: () => void;
  onDelete: () => void;
}

const StudentListaPoena: React.FC<PoeniItemProps> = ({
  poen,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [brojPoena, setBrojPoena] = useState(poen.broj_poena);
  const [napomena, setNapomena] = useState(poen.napomena || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updatePoeni(poen.id, { ...poen, broj_poena: brojPoena, napomena });
      setIsEditing(false);
      onUpdate();
      toast.success("Poeni uspešno ažurirani");
    } catch {
      toast.error("Greška pri ažuriranju poena");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deletePoeni(poen.id);
      onDelete();
      toast.success("Poeni uspešno obrisani");
    } catch {
      toast.error("Greška pri brisanju poena");
    } finally {
      setIsLoading(false);
    }
  };

  const truncateNapomena = (text: string) => {
    return text.length > 20 ? text.slice(0, 20) + "..." : text;
  };

  return (
    <div className="w-full mb-2">
      <div className="p-4 bg-primary-50/70 shadow-md border-[1.15px] border-primary-200 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-start w-full sm:w-auto">
            {!isEditing && (
              <span className="text-md font-medium text-gray-900">
                {poen.naziv}
              </span>
            )}
            {isEditing ? (
              <div className="w-full">
                <input
                  type="number"
                  value={brojPoena}
                  onChange={(e) => setBrojPoena(Number(e.target.value))}
                  className="w-12 px-3 py-1.5 border border-primary-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            ) : (
              <span className="text-lg font-medium text-primary-600 -skew-x-3">
                {poen.broj_poena} poena
              </span>
            )}
          </div>

          <div className="w-full sm:w-auto flex max-w-md">
            {isEditing ? (
              <input
                type="text"
                value={napomena}
                onChange={(e) => setNapomena(e.target.value)}
                placeholder="Dodaj napomenu..."
                className="w-full px-3 py-1.5 border border-primary-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
              />
            ) : (
              <span className="text-sm text-gray-600">
                {napomena ? truncateNapomena(napomena) : "Bez napomene"}
              </span>
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none py-1.5 px-4 bg-emerald-800/85 text-white rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-emerald-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                >
                  <SacuvajIkonica className="inline-block w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none py-1.5 px-4 bg-gray-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-gray-600 active:translate-y-0 active:shadow-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-gray-500"
                >
                  <UkloniIkonica className="w-5 h-5 inline" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none py-1.5 px-4 bg-primary-800/85 text-white rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-primary-700"
                >
                  <IzmeniIkonica className="inline-block w-5 h-5 -mt-1.5 text-white" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none py-1.5 px-4 bg-red-700/85 text-white rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-red-700/90 active:translate-y-0 active:shadow-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-red-700"
                >
                  <DeleteIkonica className="inline-block w-5 h-5 text-white -mt-1.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentListaPoena;
