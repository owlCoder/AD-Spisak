import React, { useState } from "react";
import toast from "react-hot-toast";
import { readFromSSluzbaExcel } from "../../../../api/excel_import_api";
import { createKorisnik } from "../../../../api/korisnik_api";
import { exportToExcel } from "../../../../services/export_to_excel/export_to_excel";
import { ExcelIkonica } from "../../../layout/icons/excel_ikonica";
import { ImportIkonica } from "../../../layout/icons/import_ikonica";
import { ChecklistaIkonica } from "../../../layout/icons/checklist_ikonica";

const DataMigrationSection: React.FC = () => {
  const [importProgress, setImportProgress] = useState<number | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      toast.error("Molimo vas izaberite Excel fajl (.xls)");
      return;
    }

    try {
      setImportProgress(0);
      const korisniciFromExcel = await readFromSSluzbaExcel(file);

      if (!korisniciFromExcel) {
        toast.error("Nije moguće pročitati Excel spisak");
        return;
      }

      for (let i = 0; i < korisniciFromExcel.length; i++) {
        const korisnik = korisniciFromExcel[i];
        await createKorisnik(korisnik);
        setImportProgress(
          Math.round(((i + 1) / korisniciFromExcel.length) * 100)
        );
      }

      window.location.reload();
      toast.success("Uvoz spiska uspešno završen!");
    } catch (error) {
      toast.error(
        "Greška prilikom importa: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setImportProgress(null);
    }
  };

  return (
    <section className="mt-4 group relative overflow-hidden bg-primary-100/40 rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChecklistaIkonica className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold text-primary-900">
            Upravljanje spiskom studenata
          </h2>
        </div>
        <p className="text-primary-900/50 pb-4">
          Podaci se mogu sačuvati pomoću izvoza trenutnog spiska studenata
          (evidencija i poeni) u Excel format. U slučaju tek kreiranog predmeta
          moguće je pokrenuti uvoz novog spiska iz Excel datoteke studentske
          službe.
        </p>

        {importProgress !== null && (
          <div className="mb-6 p-4 bg-white/60 rounded-lg border border-primary-200">
            <p className="text-primary-900">
              Uvoz podataka je u toku:{" "}
              <span className="font-semibold">{importProgress}%</span>
            </p>
            <p className="text-rose-800/90 mt-1">
              Ne zatvarajte ili osvežavajte stranicu dok je uvoz podataka u
              toku!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/60 rounded-lg border border-primary-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-lg font-medium text-primary-900 mb-3">
              Izvoz Podataka
            </h3>
            <p className="text-primary-900/50 mb-4">
              Izvezite trenutni spisak studenata u Excel format za dalju obradu
              ili arhiviranje.
            </p>
            <button
              onClick={exportToExcel}
              className="w-full px-4 py-2 bg-emerald-700/85 text-white inline-flex items-center justify-center gap-2 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-emerald-700 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <ExcelIkonica />
              <span>Izvoz Spiska u Excel</span>
            </button>
          </div>

          <div className="p-4 bg-white/60 rounded-lg border border-primary-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-lg font-medium text-primary-900 mb-3">
              Uvoz Podataka
            </h3>
            <p className="text-primary-900/50 mb-4">
              Uvoz novog spisak studenata iz Excel datoteke kreirane od strane
              studentske službe.
            </p>
            <label className="w-full px-4 py-2 bg-sky-700/85 text-white inline-flex items-center justify-center gap-2 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-sky-700 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent cursor-pointer">
              <ImportIkonica />
              <span>Uvoz iz Spiska Stud. Službe</span>
              <input
                type="file"
                accept=".xls,.xlsx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataMigrationSection;
