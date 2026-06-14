import React, { useState } from "react";
import toast from "react-hot-toast";
import { TerminOdbraneProjekta } from "../../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { createTerminOdbrane } from "../../../../../api/termini_odbrane_api";
import { SacuvajIkonica } from "../../../../layout/icons/sacuvaj_ikonica";
import { UkloniIkonica } from "../../../../layout/icons/ukloni_ikonica";
import { ListaDodajIkonica } from "../../../../layout/icons/lista_dodaj_ikonica";

interface AddTerminOdbraneFormProps {
  onTerminAdded: () => void;
}

const NoviTerminOdbraneForm: React.FC<AddTerminOdbraneFormProps> = ({
  onTerminAdded,
}) => {
  const [formData, setFormData] = useState<TerminOdbraneProjekta>({
    id: 0,
    naziv_termina_odbrane: "",
    datum: "",
    vreme_odbrane: "",
    ucionica: "",
    aktivan: true,
    prijava_otvorena: false,
    napomena: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await createTerminOdbrane(formData);
      if (result) {
        toast.success("Termin odbrane uspešno dodat!");
        onTerminAdded();
        onOcistiPolja();
      } else {
        throw new Error("Termin odbrane nije mogao biti dodat");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Došlo je do greške"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onOcistiPolja = () => {
    setFormData({
      id: 0,
      naziv_termina_odbrane: "",
      datum: "",
      vreme_odbrane: "",
      ucionica: "",
      aktivan: true,
      prijava_otvorena: false,
      napomena: "",
    });
  };

  return (
    <section className="mt-4 group relative overflow-hidden bg-primary-100/70 rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <ListaDodajIkonica className="w-5 h-5 text-primary-700" />
          <h2 className="text-xl font-semibold text-primary-900">
            Novi termin odbrane
          </h2>
        </div>
        <p className="text-primary-900/50 pb-4">
          Za kreiranje novog termina odbrane projekta potrebno je uneti
          informacije o terminu odbrane. Termin inicijalno postaje aktivan, ali je
          zatvoren za prijave od strane studenta.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="naziv_termina_odbrane"
              placeholder="Naziv termina"
              value={formData.naziv_termina_odbrane}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
              required
              disabled={isSubmitting}
            />
            <input
              type="date"
              name="datum"
              value={formData.datum}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
              required
              disabled={isSubmitting}
            />
            <input
              type="time"
              name="vreme_odbrane"
              value={formData.vreme_odbrane}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="ucionica"
              placeholder="Učionica"
              value={formData.ucionica}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
              required
              disabled={isSubmitting}
            />
            <input
              type="text"
              name="napomena"
              placeholder="Napomena (opciono)"
              value={formData.napomena}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-3 justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white inline-flex items-center gap-2 base-button rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent
                ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <SacuvajIkonica className="h-6 w-6 -mr-1" />
              <span>{isSubmitting ? "Čuvanje..." : "Sačuvaj"}</span>
            </button>
            <button
              type="button"
              onClick={onOcistiPolja}
              disabled={isSubmitting}
              className="px-4 py-2 bg-slate-400 text-white inline-flex items-center gap-2 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-slate-500 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-slate-700 focus:border-transparent"
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

export default NoviTerminOdbraneForm;