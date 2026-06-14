import React, { useCallback } from "react";
import { KorisniciFiltersProps } from "../../../../models/pages_props/students_filters_props/students_filters_props";
import UsersIkonica from "../../icons/users_ikonica";
import { useMemo } from "react";
import { useEffect } from "react";
import { Korisnik } from "../../../../models/korisnik/korisnik";

const StudentiFilters: React.FC<KorisniciFiltersProps> = ({
  filters,
  onFilterChange,
  korisnici,
  setFilteredKorisnici,
  onGroupPickup,
  children,
}) => {
  // Get unique groups from korisnici - memoized
  const uniqueGroups = useMemo(() => {
    const groups = korisnici.map((k) => Number(k.grupa));
    return Array.from(new Set(groups)).sort((a, b) => a - b);
  }, [korisnici]);

  // Debounce function
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  // Debounced filter values
  const debouncedBrojIndeksa = useDebounce(filters.brojIndeksa, 300);
  const debouncedImePrezime = useDebounce(filters.imePrezime, 300);

  // Set grupa 1 as default on initial render
  useEffect(() => {
    if (filters.selectedGroups.length === 0 && uniqueGroups.length > 0) {
      onFilterChange({
        ...filters,
        selectedGroups: [1],
      });
    }
  }, [filters, onFilterChange, uniqueGroups.length]);

  // Memoized filter function
  const filterKorisnici = useCallback(
    (
      korisnici: Korisnik[],
      brojIndeksa: string,
      imePrezime: string,
      selectedGroups: number[]
    ) => {
      return korisnici.filter((korisnik) => {
        if (brojIndeksa || imePrezime) {
          const matchesBrojIndeksa =
            !brojIndeksa ||
            korisnik.broj_indeksa
              .toLowerCase()
              .includes(brojIndeksa.toLowerCase());

          const matchesImePrezime =
            !imePrezime ||
            korisnik.ime_prezime
              .toLowerCase()
              .includes(imePrezime.toLowerCase());

          const matchesGroup =
            selectedGroups.length === 0 ||
            selectedGroups.includes(Number(korisnik.grupa));

          return matchesBrojIndeksa && matchesImePrezime && matchesGroup;
        }

        return (
          selectedGroups.length === 0 ||
          selectedGroups.includes(Number(korisnik.grupa))
        );
      });
    },
    []
  );

  // Handle group selection
  const handleGroupToggle = useCallback(
    (grupa: number | "all") => {
      let newGroups: number[];

      if (grupa === "all") {
        newGroups = uniqueGroups;
      } else {
        newGroups = filters.selectedGroups.includes(grupa as number)
          ? []
          : [grupa as number];
      }

      onFilterChange({
        ...filters,
        selectedGroups: newGroups,
      });

      if (grupa !== "all") {
        onGroupPickup(grupa as number);
      }
    },
    [filters, uniqueGroups, onFilterChange, onGroupPickup]
  );

  // Handle input change with debouncing
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({
        ...filters,
        [e.target.name]: e.target.value,
      });
    },
    [filters, onFilterChange]
  );

  // Filter effect with debounced values
  useEffect(() => {
    const filtered = filterKorisnici(
      korisnici,
      debouncedBrojIndeksa,
      debouncedImePrezime,
      filters.selectedGroups
    );
    setFilteredKorisnici(filtered);
  }, [
    korisnici,
    debouncedBrojIndeksa,
    debouncedImePrezime,
    filters.selectedGroups,
    filterKorisnici,
    setFilteredKorisnici,
  ]);

  // Check if all groups are selected - memoized
  const isAllSelected = useMemo(
    () =>
      filters.selectedGroups.length === uniqueGroups.length &&
      uniqueGroups.every((group) => filters.selectedGroups.includes(group)),
    [filters.selectedGroups, uniqueGroups]
  );

  return (
    <section className="px-6 py-4">
      <h2 className="text-xl font-semibold mb-2 text-primary-950">
        <UsersIkonica className="w-6 h-6 inline -mt-1 text-primary-700" />{" "}
        Spisak studenata
      </h2>
      <p className="text-primary-900/50 pb-4">
        Pretraga studenata vrši se kombinacijom unetih kriterijuma. U slučaju da
        nije unet nijedan kriterijum prikazuju se svi studenti u aktuelnoj
        grupi.
      </p>
      <div className="flex flex-col space-y-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
          <input
            type="text"
            name="brojIndeksa"
            placeholder="Broj indeksa"
            value={filters.brojIndeksa}
            onChange={handleInputChange}
            autoComplete="off"
            className="w-full p-2 text-center bg-primary-200/15 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
          />
          <input
            type="text"
            name="imePrezime"
            placeholder="Ime ili prezime"
            value={filters.imePrezime}
            onChange={handleInputChange}
            className="w-full p-2 text-center bg-primary-200/15 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-4">
          <span className="text-primary-800 font-medium">Grupa:</span>
          <span
            onClick={() => handleGroupToggle("all")}
            className={`px-3 py-1 text-center border border-primary-200 shadow-xs rounded-lg cursor-pointer transition-colors duration-200 font-bold
              ${
                isAllSelected
                  ? "bg-blue-800/85 text-white"
                  : "bg-white/70 text-primary-800 hover:bg-primary-200"
              }`}
          >
            Svi
          </span>
          {uniqueGroups.map((grupa) => (
            <span
              key={grupa}
              onClick={() => handleGroupToggle(grupa)}
              className={`px-3 py-1 text-center border border-primary-200 shadow-xs rounded-lg cursor-pointer transition-colors duration-200 font-bold
                ${
                  filters.selectedGroups.includes(grupa)
                    ? "bg-blue-800/85 text-white"
                    : "bg-white/70 text-primary-800 hover:bg-primary-200"
                }`}
            >
              {grupa}
            </span>
          ))}
        </div>
      </div>

      {(filters.selectedGroups.length > 0 ||
        filters.brojIndeksa ||
        filters.imePrezime) && (
        <div className="flex flex-wrap items-center gap-2 text-sm pb-4">
          <span className="text-primary-700">Aktivni filteri:</span>
          {isAllSelected ? (
            <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
              Sve grupe
            </span>
          ) : (
            filters.selectedGroups.map((grupa) => (
              <span
                key={grupa}
                className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full"
              >
                Grupa {grupa}
              </span>
            ))
          )}
          {filters.brojIndeksa && (
            <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
              Indeks: {filters.brojIndeksa}
            </span>
          )}
          {filters.imePrezime && (
            <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
              Ime/Prezime: {filters.imePrezime}
            </span>
          )}
          <button
            onClick={() =>
              onFilterChange({
                selectedGroups: [],
                brojIndeksa: "",
                imePrezime: "",
                grupa: "",
              })
            }
            className="text-primary-600 hover:text-primary-800 ml-2"
          >
            Obriši filtere
          </button>
        </div>
      )}
      {children}
    </section>
  );
};

export default StudentiFilters;
