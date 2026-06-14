import React from 'react';

interface FilterState {
  selectedGroups: number[];
  brojIndeksa: string;
  imePrezime: string;
  grupa: string;
}

interface StudentiFiltersProps {
  uniqueGroups: number[];
  filterState: FilterState;
  onFilterChange: (newState: FilterState) => void;
  children: React.ReactNode;
}

const StudentiFilters: React.FC<StudentiFiltersProps> = ({
  uniqueGroups,
  filterState,
  onFilterChange,
  children
}) => {
  const handleGroupToggle = (grupa: number) => {
    const newGroups = filterState.selectedGroups.includes(grupa)
      ? filterState.selectedGroups.filter((g) => g !== grupa)
      : [...filterState.selectedGroups, grupa];

    onFilterChange({
      ...filterState,
      selectedGroups: newGroups,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4 border bg-primary-200/30 border-primary-300 rounded-xl my-4">
      <h2 className="text-xl font-semibold mb-2 text-primary-950">
        Spisak studenata
      </h2>
      <p className="text-primary-900/50 pb-4">
        Pretraga studenta vrši se kombinacijom unetih kriterijuma. U slučaju da
        nije unet nijedan kriterijum prikazuju se svi studenti.
      </p>

      <div className="flex flex-col space-y-4 w-full">
        {/* Search inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <input
            type="text"
            name="brojIndeksa"
            placeholder="Broj indeksa"
            value={filterState.brojIndeksa}
            onChange={handleInputChange}
            autoComplete="off"
            className="w-full p-2 text-center bg-primary-200/40 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
          />
          <input
            type="text"
            name="imePrezime"
            placeholder="Ime ili prezime"
            value={filterState.imePrezime}
            onChange={handleInputChange}
            className="w-full p-2 text-center bg-primary-200/40 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
          />
        </div>

        {/* Group filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-primary-700 font-medium">Grupe:</span>
          {uniqueGroups.map((grupa) => (
            <button
              key={grupa}
              onClick={() => handleGroupToggle(grupa)}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterState.selectedGroups.includes(grupa)
                  ? "bg-primary-600 text-white"
                  : "bg-white/70 text-primary-700 hover:bg-primary-200"
              }`}
            >
              {grupa}
            </button>
          ))}
        </div>

        {/* Active filters summary */}
        {(filterState.selectedGroups.length > 0 ||
          filterState.brojIndeksa ||
          filterState.imePrezime) && (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-primary-700">Aktivni filteri:</span>
            {filterState.selectedGroups.map((grupa) => (
              <span
                key={grupa}
                className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full"
              >
                Grupa {grupa}
              </span>
            ))}
            {filterState.brojIndeksa && (
              <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                Indeks: {filterState.brojIndeksa}
              </span>
            )}
            {filterState.imePrezime && (
              <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                Ime/Prezime: {filterState.imePrezime}
              </span>
            )}
            <button
              onClick={() =>
                onFilterChange({
                  selectedGroups: [],
                  brojIndeksa: '',
                  imePrezime: '',
                  grupa: ''
                })
              }
              className="text-primary-600 hover:text-primary-800 ml-2"
            >
              Obriši filtere
            </button>
          </div>
        )}
      </div>

      <>{children}</>
    </div>
  );
};

export default StudentiFilters;