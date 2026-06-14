import React from "react";
import { exportProjectsDataToExcel } from "../../../../../api/excel_export_projects_api";
import { getClaimsFromToken } from "../../../../../helpers/jwt_helper";
import { useProjektniZadaci } from "../../../../../hooks/projektni_zadaci/projektni_zadaci";
import { useProjektniZadaciFilters } from "../../../../../hooks/projektni_zadaci/projektni_zadaci_filteri";
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../../../../models/projekat/ProjektniZadatak";
import { ProjektniZadaciFilters } from "../../../../layout/filters/projektni_zadaci_filter/projektni_zadaci_filter";
import { ProjekatIkonica } from "../../../../layout/icons/projekat_ikonica";
import { SacuvajIkonica } from "../../../../layout/icons/sacuvaj_ikonica";
import ZadatakStatistics from "../projects_statistics/projekti_stats";
import { ProjektniZadatakRow } from "./projekat_row";
import toast from "react-hot-toast";

interface ProjektniZadaciTableProps {
  korisnici: Korisnik[];
  projekti: ProjektniZadatak[];
  onUpdate: () => void;
}

const ProjektniZadaciTable: React.FC<ProjektniZadaciTableProps> = ({
  korisnici,
  projekti,
  onUpdate,
}) => {
  const { zadaci, handleInputChange, handleDeleteZadatak, handleSaveChanges } =
    useProjektniZadaci(projekti, onUpdate);

  const { filterState, setFilterState, getFilteredKorisnici } =
    useProjektniZadaciFilters(korisnici, projekti);

  const zadaciForFilter: Record<number, ProjektniZadatak> = Object.entries(
    zadaci
  ).reduce(
    (acc, [id, zadatak]) => ({
      ...acc,
      [id]: {
        id: Number(id),
        korisnik_fk: Number(id),
        tim: zadatak.tim || 0,
        zadatak: zadatak.zadatak,
      },
    }),
    {}
  );

  const uniqueGroups = Array.from(new Set(korisnici.map((k) => k.grupa))).sort(
    (a, b) => a - b
  );

  const filteredAndSortedKorisnici = getFilteredKorisnici(zadaciForFilter).sort(
    (a, b) => {
      if (a.grupa !== b.grupa) {
        return a.grupa - b.grupa;
      }

      const timA = parseInt(zadaci[a.id]?.tim) || 0;
      const timB = parseInt(zadaci[b.id]?.tim) || 0;
      return timA - timB;
    }
  );

  const assignedCount = korisnici.filter(
    (k) => zadaci[k.id]?.tim && zadaci[k.id]?.zadatak
  ).length;
  const unassignedCount = korisnici.length - assignedCount;

  const exportProjects = async () => {
    const blob = await exportProjectsDataToExcel(korisnici, zadaci);
    if (!blob) return;

    const claims = getClaimsFromToken();
    const pnaziv = claims?.pnaziv;
    const FILE_NAME = pnaziv ? pnaziv + " - Projekti.xlsx" : "spisak.xlsx";
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = FILE_NAME;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const prepareExport = async () => {
    toast.promise(
      exportProjects(),
      {
        loading: "Priprema podataka...",
        success: "Spisak projekata je spreman",
        error: "Spisak nije kreiran"
      }
    )
  }

  return (
    <div className="w-full space-y-4">
      <div className="w-full space-y-4">
        <ZadatakStatistics korisnici={korisnici} projekti={projekti} />
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-end">
        <ProjektniZadaciFilters
          uniqueGroups={uniqueGroups}
          filterState={filterState}
          onFilterChange={setFilterState}
          assignedCount={assignedCount}
          unassignedCount={unassignedCount}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSaveChanges}
            className="py-1.5 px-3 bg-primary-800/85 text-white hover:bg-primary-700 flex rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-700 focus:border-transparent"
          >
            <SacuvajIkonica className="h-6 w-6 mr-0.5 text-white" />
            <span className="hidden sm:inline">Sačuvaj promene</span>
          </button>

          <button
            onClick={prepareExport}
            className="py-1.5 px-3 bg-emerald-700/95 text-white hover:bg-emerald-700 flex rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-emerald-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
          >
            <ProjekatIkonica className="h-6 w-6 mr-0.5 text-white" />
            <span className="hidden sm:inline">Izvoz podataka u Excel</span>
          </button>
        </div>
      </div>

      <div className="group relative overflow-hidden bg-primary-500/10 rounded-lg border border-primary-300 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-300">
        <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <table className="w-full relative z-10">
          <thead>
            <tr className="bg-primary-200/50">
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Broj indeksa
              </th>
              <th className="p-3 hidden lg:table-cell text-primary-600 font-medium tracking-wide uppercase">
                Ime i prezime
              </th>
              <th className="p-3 hidden lg:table-cell text-primary-600 font-medium tracking-wide uppercase">
                Grupa
              </th>
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Tim
              </th>
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Projekat
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedKorisnici.map((korisnik) => (
              <ProjektniZadatakRow
                key={korisnik.id}
                korisnik={korisnik}
                zadatak={zadaci[korisnik.id]}
                onInputChange={(field, value) =>
                  handleInputChange(korisnik.id, field, value)
                }
                onDelete={() => handleDeleteZadatak(korisnik.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjektniZadaciTable;
