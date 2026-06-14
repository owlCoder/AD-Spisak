import { useState } from "react";
import toast from "react-hot-toast";
import { updateKorisnik } from "../../../api/korisnik_api";
import { Korisnik } from "../../../models/korisnik/korisnik";
import { SacuvajIkonica } from "../../layout/icons/sacuvaj_ikonica";

interface UpdateKorisnikProps {
  korisnik: Korisnik;
}

const UpdateStudentProfile: React.FC<UpdateKorisnikProps> = ({ korisnik }) => {
  const [formData, setFormData] = useState({
    email: korisnik.email,
    password: korisnik.password,
    ime_prezime: korisnik.ime_prezime,
    uloga: korisnik.uloga,
    broj_indeksa: korisnik.broj_indeksa,
    grupa: korisnik.grupa,
    ocena: korisnik.ocena,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "grupa" || name === "ocena" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateKorisnik(korisnik.id, formData);
    if (success) {
      toast.success("Korisnik je uspešno ažuriran");
    } else {
      toast.error("Neuspešno ažuriranje korisnika");
    }
  };

  return (
    <div>
      <p className="text-primary-900/50 pb-4">
        Moguće je da je student promenio neki od svojih ličnih podataka, u tom
        slučaju neophodno je trenutne podatke ažurirati aktuelnim.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-primary-200/10 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-blue-200 transition duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="ime_prezime"
              className="block text-sm font-medium text-primary-900"
            >
              Ime i prezime
            </label>
            <input
              type="text"
              name="ime_prezime"
              id="ime_prezime"
              value={formData.ime_prezime}
              onChange={handleChange}
              className="w-full p-2 bg-primary-200/10 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-blue-200 transition duration-200"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="broj_indeksa"
              className="block text-sm font-medium text-primary-900"
            >
              Broj indeksa
            </label>
            <input
              type="text"
              name="broj_indeksa"
              id="broj_indeksa"
              value={formData.broj_indeksa}
              onChange={handleChange}
              className="w-full p-2 bg-primary-200/10 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-blue-200 transition duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="grupa"
              className="block text-sm font-medium text-primary-900"
            >
              Grupa
            </label>
            <select
              name="grupa"
              id="grupa"
              value={formData.grupa}
              onChange={handleChange}
              className="w-full p-2 bg-primary-200/10 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-blue-200 transition duration-200"
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="ocena"
              className="block text-sm font-medium text-primary-900"
            >
              Ocena
            </label>
            <select
              name="ocena"
              id="ocena"
              value={formData.ocena}
              onChange={handleChange}
              className="w-full p-2 bg-primary-200/10 border border-primary-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-blue-200 transition duration-200"
            >
              {[...Array(6).keys()].map((num) => (
                <option key={num + 5} value={num + 5}>
                  {num + 5}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="text-white inline-flex items-center gap-2 px-4 py-2 base-button rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent"
        >
          <SacuvajIkonica className="h-6 w-6 inline" />
          Sačuvaj
        </button>
      </form>
    </div>
  );
};

export default UpdateStudentProfile;
