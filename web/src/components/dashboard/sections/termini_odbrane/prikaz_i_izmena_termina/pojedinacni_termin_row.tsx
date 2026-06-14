import React from "react";
import { TerminOdbraneProjekta } from "../../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { SacuvajIkonica } from "../../../../layout/icons/sacuvaj_ikonica";
import { UkloniIkonica } from "../../../../layout/icons/ukloni_ikonica";
import { IzmeniIkonica } from "../../../../layout/icons/izmeni_ikonica";
import {
  formatDate,
  formatTime,
} from "../../../../../helpers/date_time_formatter/format_date_time";
import { formatDateForInput } from "../../../../../helpers/date_time_formatter/date_time_input_formatter";

interface TerminRowProps {
  termin: TerminOdbraneProjekta;
  editingTermin: TerminOdbraneProjekta | null;
  onEditClick: (termin: TerminOdbraneProjekta) => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const PojedinacniTerminRow: React.FC<TerminRowProps> = ({
  termin,
  editingTermin,
  onEditClick,
  onSave,
  onCancel,
  onChange,
}) => {
  const isEditing = editingTermin?.id === termin.id;

  return (
    <div className="border-b-2 border-primary-500 last:border-b-0 bg-primary-50 hover:bg-primary-50/70">
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Naziv termina */}
          <div className="lg:col-span-1">
            <label className="block text-sm text-primary-600 font-semibold mb-1">
              Naziv termina
            </label>
            {isEditing ? (
              <input
                type="text"
                name="naziv_termina_odbrane"
                value={editingTermin.naziv_termina_odbrane}
                onChange={onChange}
                className="w-full px-3 py-2 text-center bg-primary-100 border border-primary-300 rounded-lg text-primary-900 
                focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent 
                transition duration-300"
              />
            ) : (
              <span className="block text-primary-900 font-medium">
                {termin.naziv_termina_odbrane}
              </span>
            )}
          </div>

          {/* Datum, Vreme, Ucionica */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:col-span-3 gap-4">
            <div>
              <label className="block text-sm text-primary-600 font-semibold mb-1">
                Datum
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="datum"
                  value={formatDateForInput(editingTermin.datum || "")}
                  onChange={onChange}
                  className="w-full px-3 py-2 text-center bg-primary-100 border border-primary-300 rounded-lg text-primary-900 
      focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent 
      transition duration-300"
                />
              ) : (
                <span className="block text-primary-900 font-medium">
                  {formatDate(termin.datum)}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm text-primary-600 font-semibold mb-1">
                Vreme
              </label>
              {isEditing ? (
                <input
                  type="time"
                  name="vreme_odbrane"
                  value={editingTermin.vreme_odbrane}
                  onChange={onChange}
                  className="w-full px-3 py-2 text-center bg-primary-100 border border-primary-300 rounded-lg text-primary-900 
                  focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent 
                  transition duration-300"
                />
              ) : (
                <span className="block text-primary-900 font-medium">
                  {formatTime(termin.vreme_odbrane)}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm text-primary-600 font-semibold mb-1">
                Učionica
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="ucionica"
                  value={editingTermin.ucionica}
                  onChange={onChange}
                  className="w-full px-3 py-2 text-center bg-primary-100 border border-primary-300 rounded-lg text-primary-900 
                  focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent 
                  transition duration-300"
                />
              ) : (
                <span className="block text-primary-900 font-medium">
                  {termin.ucionica}
                </span>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 lg:col-span-2 gap-4 justify-items-center text-center">
            <div>
              <label className="block text-sm text-primary-600 font-semibold mb-1">
                Aktivan
              </label>
              {isEditing ? (
                <input
                  type="checkbox"
                  name="aktivan"
                  checked={editingTermin.aktivan}
                  onChange={onChange}
                  className="mt-2 h-4 w-4 text-primary-600 accent-primary-600 bg-primary-500 border-primary-500 rounded-sm focus:ring-primary-500"
                />
              ) : (
                <span className="block text-primary-900 font-medium">
                  {termin.aktivan ? "Da" : "Ne"}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm text-primary-600 font-semibold mb-1">
                Prijava
              </label>
              {isEditing ? (
                <input
                  type="checkbox"
                  name="prijava_otvorena"
                  checked={editingTermin.prijava_otvorena}
                  onChange={onChange}
                  className="mt-2 h-4 w-4 text-primary-600 accent-primary-600 bg-primary-500 border-primary-500 rounded-sm focus:ring-primary-500"
                />
              ) : (
                <span className="block text-primary-900 font-medium">
                  {termin.prijava_otvorena ? "Otvorena" : "Zatvorena"}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-end lg:col-span-1">
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={onSave}
                  className="px-4 py-2 text-white inline-flex items-center gap-2 base-button rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent"
                  title="Sačuvaj"
                >
                  <SacuvajIkonica className="h-6 w-6" />
                  <span className="inline md:hidden">Sačuvaj</span>
                </button>
                <button
                  onClick={onCancel}
                  className="px-4 py-2 bg-slate-400 text-white inline-flex items-center gap-2 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-slate-500 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                  title="Otkaži"
                >
                  <UkloniIkonica className="h-6 w-6" />
                  <span className="inline md:hidden">Otkaži</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onEditClick(termin)}
                className="px-4 py-2 text-white inline-flex items-center gap-2 base-button rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent"
                title="Izmeni"
              >
                <IzmeniIkonica className="h-6 w-6" />
                <span className="inline">Izmeni</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PojedinacniTerminRow;
