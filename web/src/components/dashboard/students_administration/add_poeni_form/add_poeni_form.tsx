import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createPoeni } from "../../../../api/poeni_api";
import { getPredmetById } from "../../../../api/predmeti_api";
import { getClaimsFromToken } from "../../../../helpers/jwt_helper";
import { DropDownArrowDown } from "../../../layout/icons/dropdown_arrowdown";
import { SacuvajIkonica } from "../../../layout/icons/sacuvaj_ikonica";
import DeleteIkonica from "../../../layout/icons/delete_ikonica";
import { UkloniIkonica } from "../../../layout/icons/ukloni_ikonica";
import { DodajIkonica } from "../../../layout/icons/dodaj_ikonica";
import { ChecklistaIkonica } from "../../../layout/icons/checklist_ikonica";

interface AddPoeniFormProps {
  korisnik_fk: number;
  onPoeniAdded: () => void;
  onOdustani: () => void;
}

interface FormData {
  naziv: string;
  broj_poena: number;
  napomena: string;
}

interface ValidationErrors {
  naziv?: string;
  broj_poena?: string;
}

const AddPoeniForm: React.FC<AddPoeniFormProps> = ({
  korisnik_fk,
  onPoeniAdded,
  onOdustani,
}) => {
  const [formData, setFormData] = useState<FormData>({
    naziv: "",
    broj_poena: 0,
    napomena: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [predispitneNazivi, setPredispitneNazivi] = useState<string[]>([]);
  const [showNapomena, setShowNapomena] = useState(false);

  const claims = getClaimsFromToken();
  const predmetId = claims?.pid;

  useEffect(() => {
    const fetchPredmet = async () => {
      try {
        if (predmetId) {
          const predmet = await getPredmetById(predmetId);
          if (predmet) {
            setPredispitneNazivi(
              predmet.predispitne_obaveze
                .split(",")
                .map((naziv) => naziv.trim())
                .filter((naziv) => naziv.length > 0)
            );
          }
        }
      } catch {
        toast.error("Greška pri učitavanju predispitnih obaveza");
      }
    };

    fetchPredmet();
  }, [predmetId]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.naziv) {
      newErrors.naziv = "Obavezno polje";
    }

    if (formData.broj_poena < 0 || formData.broj_poena > 100) {
      newErrors.broj_poena = "Broj poena mora biti između 0 i 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "broj_poena"
          ? value === ""
            ? 0
            : Math.min(Math.max(parseFloat(value), 0), 100)
          : value,
    }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createPoeni({ ...formData, korisnik_fk });
      if (result) {
        toast.success("Poeni uspešno dodati!");
        onPoeniAdded();
        setFormData({ naziv: "", broj_poena: 0, napomena: "" });
        setShowNapomena(false);
      } else {
        throw new Error("Poeni su već uneti za ovu predispitnu obavezu");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Došlo je do greške pri dodavanju poena"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-4 group relative overflow-hidden bg-primary-50/70 rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChecklistaIkonica className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold text-primary-900">
            Unos nove evidencije poena
          </h2>
        </div>
        <p className="text-primary-900/50 pb-4">
          Unesite podatke o predispitnoj obavezi i broju osvojenih poena.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative col-span-2">
              <select
                name="naziv"
                value={formData.naziv}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-white/50 border rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200 appearance-none
                  ${errors.naziv ? "border-red-500" : "border-primary-200"}`}
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Izaberite predispitnu obavezu
                </option>
                {predispitneNazivi.map((naziv, index) => (
                  <option key={index} value={naziv}>
                    {naziv}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <DropDownArrowDown className="fill-current h-4 w-4" />
              </div>
              {errors.naziv && (
                <p className="mt-1 text-sm text-red-500">{errors.naziv}</p>
              )}
            </div>

            <div className="col-span-2 md:col-span-1">
              <input
                type="number"
                name="broj_poena"
                step={1}
                placeholder="Broj poena"
                value={formData.broj_poena || "0"}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-white/50 border rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200
                  ${
                    errors.broj_poena ? "border-red-500" : "border-primary-200"
                  }`}
                disabled={isSubmitting}
                min="0"
                max="100"
              />
              {errors.broj_poena && (
                <p className="mt-1 text-sm text-red-500">{errors.broj_poena}</p>
              )}
            </div>
          </div>

          {!showNapomena ? (
            <button
              type="button"
              onClick={() => setShowNapomena(true)}
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
            >
              <DodajIkonica className="w-5 h-5" />
              Dodavanje napomene
            </button>
          ) : (
            <div className="relative">
              <input
                name="napomena"
                placeholder="Unesite napomenu"
                value={formData.napomena}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/50 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition duration-200"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => {
                  setShowNapomena(false);
                  setFormData((prev) => ({ ...prev, napomena: "" }));
                }}
                className="absolute top-2 right-2 text-red-600/80 hover:text-red-700/80 transition-colors"
              >
                <DeleteIkonica className="h-5 w-5" />
              </button>
            </div>
          )}

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
              onClick={onOdustani}
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

export default AddPoeniForm;
