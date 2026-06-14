import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createPredmet } from "../../../../../api/predmeti_api";
import { Predmet } from "../../../../../models/predmet/predmet";
import { SacuvajIkonica } from "../../../../layout/icons/sacuvaj_ikonica";
import { UkloniIkonica } from "../../../../layout/icons/ukloni_ikonica";
import { ChecklistaIkonica } from "../../../../layout/icons/checklist_ikonica";

interface CreatePredmetFormProps {
  onPredmetCreated: () => void;
}

const AddPredmetForm: React.FC<CreatePredmetFormProps> = ({
  onPredmetCreated,
}) => {
  const defaultData = {
    id: 0,
    naziv: "",
    sifra_predmeta: "",
    fond_casova: 12,
    predispitne_obaveze: "",
  };

  const [formData, setFormData] = useState<Predmet>(defaultData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "fond_casova" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const predmetData = {
      ...formData,
      sifra_predmeta: formData.sifra_predmeta.trim() || "ESI0XX",
    };

    try {
      const result = await createPredmet(predmetData);
      if (result) {
        toast.success("Predmet uspešno dodat!");
        onPredmetCreated();
        setFormData({
          id: 0,
          naziv: "",
          sifra_predmeta: "",
          fond_casova: 0,
          predispitne_obaveze: "",
        });
      } else {
        throw new Error("Greška prilikom dodavanja predmeta");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Došlo je do greške"
      );
    }
  };

  return (
    <section className="mt-4 group relative overflow-hidden bg-primary-100/40 rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChecklistaIkonica className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold text-primary-900">
            Kreiranje novog predmeta
          </h2>
        </div>
        <p className="text-primary-900/50 pb-4">
          Dodavanje novog predmeta kreira nove tabele u bazi podataka i dobijate
          privremeni asistencki nalog <b>(ta@ftn.rs, 123)</b> na koji trebate da
          se ulogujete i promenite lozinku što pre.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="font-medium text-center text-red-700/80 -skew-x-6">
            Naziv Akademska godina: npr. Primenjeni Algoritmi 2024/2025
            <br />
            Predispitne obaveze moraju biti razdvojene zarezom: npr:
            K1,K2,Projekat 1
          </p>

          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <input
              type="text"
              name="sifra_predmeta"
              placeholder="Šifra predmeta (opciono)"
              value={formData.sifra_predmeta}
              onChange={handleChange}
              className="flex-1 p-2 text-center bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
            />
            <input
              type="text"
              name="naziv"
              placeholder="npr. Primenjeni Algoritmi 2024/2025"
              value={formData.naziv}
              onChange={handleChange}
              required
              className="flex-1 p-2 text-center bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
            />
          </div>

          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <input
              type="number"
              name="fond_casova"
              placeholder="Fond časova"
              value={formData.fond_casova}
              onChange={handleChange}
              required
              className="flex-1 p-2 text-center bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
            />
            <input
              type="text"
              name="predispitne_obaveze"
              placeholder="Predispitne obaveze (npr. K1,K2,Popravni)"
              value={formData.predispitne_obaveze}
              onChange={handleChange}
              required
              className="flex-1 p-2 text-center bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3 justify-end pt-2">
            <button
              type="submit"
              className={`px-4 py-2 text-white inline-flex items-center gap-2 base-button rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent`}
            >
              <SacuvajIkonica className="h-5 w-5" />
              <span>Sačuvaj</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData(defaultData);
              }}
              className="px-4 py-2 bg-slate-400 text-white inline-flex items-center gap-2 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-slate-500 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <UkloniIkonica className="h-5 w-5" />
              <span>Odustani</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPredmetForm;
