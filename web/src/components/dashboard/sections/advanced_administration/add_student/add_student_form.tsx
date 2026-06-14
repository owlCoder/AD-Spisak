import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createKorisnik } from "../../../../../api/korisnik_api";
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import { SacuvajIkonica } from "../../../../layout/icons/sacuvaj_ikonica";
import { UkloniIkonica } from "../../../../layout/icons/ukloni_ikonica";
import UsersIkonica from "../../../../layout/icons/users_ikonica";

interface AddStudentFormProps {
  onStudentAdded: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({
  onStudentAdded,
}) => {
  const defaultData: Korisnik = {
    id: 0,
    email: "",
    password: "",
    ime_prezime: "",
    uloga: "STUDENT",
    broj_indeksa: "",
    grupa: 1,
    ocena: 5,
  };

  const [formData, setFormData] = useState<Korisnik>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "grupa" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await createKorisnik(formData);
      if (result) {
        toast.success("Student uspešno dodat!");
        onStudentAdded();
        setFormData(defaultData);
      } else {
        throw new Error("Greška prilikom dodavanja studenta");
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
        <UsersIkonica className="w-5 h-5 text-primary-500" />
        <h2 className="text-xl font-semibold text-primary-900">
        Dodavanje novog studenta
        </h2>
      </div>
      <p className="text-primary-900/50 pb-4">
      Moguće je i dodati novog studenta u slučaju da se upisao kasnije u
      odnosu na aktuelni spisak studentske službe.
      </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                type="email"
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
            <div className="col-span-1">
              <input
                type="text"
                name="broj_indeksa"
                placeholder="Broj indeksa"
                value={formData.broj_indeksa}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="lg:col-span-2">
              <input
                type="number"
                name="grupa"
                placeholder="Grupa"
                value={formData.grupa}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
                disabled={isSubmitting}
                min={1}
                max={20}
                required
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col lg:flex-row gap-3 justify-end pt-2">
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
              onClick={() => {
                setFormData(defaultData);
              }}
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

export default AddStudentForm;
