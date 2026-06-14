import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateTerminOdbrane } from "../../../../../api/termini_odbrane_api";
import { TerminOdbraneProjekta } from "../../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import PojedinacniTerminRow from "./pojedinacni_termin_row";
import { ChecklistaIkonica } from "../../../../layout/icons/checklist_ikonica";

interface ListaTerminaIzmenaProps {
  termini: TerminOdbraneProjekta[];
  onEdit: () => void;
}

const ListaTerminaIzmena: React.FC<ListaTerminaIzmenaProps> = ({
  termini,
  onEdit,
}) => {
  const [editingTermin, setEditingTermin] =
    useState<TerminOdbraneProjekta | null>(null);

  const handleEditClick = (termin: TerminOdbraneProjekta) => {
    setEditingTermin({
      ...termin,
      datum: termin.datum
        ? new Date(new Date(termin.datum).getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]
        : "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editingTermin) {
      const { name, value, type } = e.target;
      const newValue =
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

      setEditingTermin((prev) => ({
        ...prev!,
        [name]: newValue,
      }));
    }
  };

  const handleSave = async () => {
    if (editingTermin) {
      const success = await updateTerminOdbrane(
        editingTermin.id,
        editingTermin
      );
      if (success) {
        toast.success("Termin uspešno ažuriran");
        onEdit();
        setEditingTermin(null);
      } else {
        toast.error("Greška pri ažuriranju termina");
      }
    }
  };

  const handleCancel = () => {
    setEditingTermin(null);
  };

  return (
    <section className="mt-4 group relative overflow-hidden bg-primary-100/70 rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChecklistaIkonica className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold text-primary-900">
            Termini odbrane projekata
          </h2>
        </div>
        <p className="text-primary-900/50 pb-4">
          Prikazani su termini odbrane projekata, hronološki po unosu u sistem.
          Moguće je kreirati nove termine odbrane, kao menjati postojeće i
          postavljati njihov status u aktivan i/ili moguć za prijavu od strane
          studenta.
        </p>
        {termini.length === 0 ? (
          <p className="text-primary-700 -skew-x-6 text-center">
            Termini odbrane će biti vidljivi kada budu kreirani.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-primary-200">
            {termini.map((termin) => (
              <PojedinacniTerminRow
                key={termin.id}
                termin={termin}
                editingTermin={editingTermin}
                onEditClick={handleEditClick}
                onSave={handleSave}
                onCancel={handleCancel}
                onChange={handleChange}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ListaTerminaIzmena;
