import { useState } from "react";
import { Korisnik } from "../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../models/projekat/ProjektniZadatak";
import { FilterState } from "../../components/layout/filters/projektni_zadaci_filter/projektni_zadaci_filter";

export const useProjektniZadaciFilters = (
  korisnici: Korisnik[],
  projekti: ProjektniZadatak[]
) => {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedGroups: [],
    showAssigned: null,
    searchTerm: '', // Initialize search term
  });

  const getFilteredKorisnici = (zadaci: Record<number, ProjektniZadatak>) => {
    return [...korisnici]
      .filter((korisnik) => {
        // Check group filter
        if (
          filterState.selectedGroups.length > 0 &&
          !filterState.selectedGroups.includes(korisnik.grupa)
        ) {
          return false;
        }

        // Check assignment filter
        if (filterState.showAssigned !== null) {
          const isAssigned = Boolean(
            zadaci[korisnik.id]?.tim && zadaci[korisnik.id]?.zadatak
          );
          if (filterState.showAssigned !== isAssigned) {
            return false;
          }
        }

        // Check name search
        if (filterState.searchTerm.trim()) {
          const searchLower = filterState.searchTerm.toLowerCase().trim();
          const fullName = `${korisnik.ime_prezime}`.toLowerCase();
          return fullName.includes(searchLower);
        }

        return true;
      })
      .sort((a, b) => {
        const aHasProject = projekti.some((p) => p.korisnik_fk === a.id);
        const bHasProject = projekti.some((p) => p.korisnik_fk === b.id);
        if (!aHasProject && bHasProject) return -1;
        if (aHasProject && !bHasProject) return 1;
        return a.grupa - b.grupa;
      });
  };

  return {
    filterState,
    setFilterState,
    getFilteredKorisnici,
  };
};