import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createKorisnik } from "../../../../../api/korisnik_api";
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import { SacuvajIkonica } from "../../../../layout/icons/sacuvaj_ikonica";
import { UkloniIkonica } from "../../../../layout/icons/ukloni_ikonica";
import { UserAddIkonica } from "../../../../layout/icons/user_add_ikonica";

interface AddAssistantFormProps {
  onAssistantAdded: () => void;
  onOdustani?: () => void;
}

const AddAssistantForm: React.FC<AddAssistantFormProps> = ({
  onAssistantAdded,
}) => {
  const defaultData: Omit<Korisnik, "id" | "ocena"> = {
    email: "",
    password: "",
    ime_prezime: "",
    uloga: "TA",
    broj_indeksa: "",
    grupa: 0,
  };
  const [formData, setFormData] =
    useState<Omit<Korisnik, "id" | "ocena">>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "grupa" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await createKorisnik({
        ...formData,
        ocena: 5,
        broj_indeksa: "TA-" + Math.random().toString(36).slice(-8),
      });
      if (result) {
        toast.success("Asistent uspešno dodat!");
        onAssistantAdded();
        setFormData({
          email: "",
          password: "",
          ime_prezime: "",
          uloga: "TA",
          broj_indeksa: "",
          grupa: 0,
        });
      } else {
        throw new Error("Greška prilikom dodavanja asistenta");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Došlo je do greške"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-4 group relative overflow-hidden bg-primary-100/40 rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserAddIkonica className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold text-primary-900">
          Dodavanje novog asistenta
          </h2>
        </div>
        <p className="text-primary-900/50 pb-4">
        Kako bi svaki asistent imao svoj nalog, potrebno je da popunite formu
          ispod podacima i kolegi dati inicijalnu lozinku nakon čega treba da je
          promeni.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid for form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1">
              <input
                type="text"
                name="ime_prezime"
                placeholder="Ime i Prezime"
                value={formData.ime_prezime}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="col-span-1">
              <input
                type="password"
                name="password"
                placeholder="Lozinka"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white inline-flex items-center gap-2 base-button rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent
                ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <SacuvajIkonica className="h-5 w-5" />
              <span>{isSubmitting ? "Čuvanje..." : "Sačuvaj"}</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData(defaultData)}
              disabled={isSubmitting}
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

export default AddAssistantForm;
