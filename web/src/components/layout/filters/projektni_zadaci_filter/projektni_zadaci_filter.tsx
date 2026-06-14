export interface FilterState {
  selectedGroups: number[];
  showAssigned: boolean | null;
  searchTerm: string;
}

export interface ProjektniZadaciFiltersProps {
  uniqueGroups: number[];
  filterState: FilterState;
  onFilterChange: (newState: FilterState) => void;
  assignedCount: number;
  unassignedCount: number;
}

export const ProjektniZadaciFilters: React.FC<ProjektniZadaciFiltersProps> = ({
  uniqueGroups,
  filterState,
  onFilterChange,
  assignedCount,
  unassignedCount,
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

  const handleAssignmentFilter = (value: boolean | null) => {
    onFilterChange({
      ...filterState,
      showAssigned: filterState.showAssigned === value ? null : value,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterState,
      searchTerm: event.target.value,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({ selectedGroups: [], showAssigned: null, searchTerm: "" });
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex flex-wrap items-center gap-4">
        {/* Group filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-primary-700 font-medium">Grupa:</span>
          {uniqueGroups.map((grupa) => (
            <button
              key={grupa}
              onClick={() => handleGroupToggle(grupa)}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterState.selectedGroups.includes(grupa)
                  ? "bg-primary-600 text-white"
                  : "bg-white text-primary-700 hover:bg-primary-200"
              }`}
            >
              {grupa}
            </button>
          ))}
        </div>

        {/* Assignment status filters */}
        <div className="space-y-2 pb-2 lg:pb-0 lg:flex lg:items-center lg:gap-2 lg:ml-auto">
          <span className="text-primary-700 font-medium">Status:</span>
          <button
            onClick={() => handleAssignmentFilter(true)}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-2
                ${
                  filterState.showAssigned === true
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-emerald-700 hover:bg-emerald-100"
                }`}
          >
            <span>Raspoređeni</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-sm">
              {assignedCount}
            </span>
          </button>
          <button
            onClick={() => handleAssignmentFilter(false)}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-2
                ${
                  filterState.showAssigned === false
                    ? "bg-rose-700/80 text-white"
                    : "bg-white text-rose-700 hover:bg-rose-100"
                }`}
          >
            <span>Neraspoređeni</span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-sm">
              {unassignedCount}
            </span>
          </button>
        </div>

        {/* Name search input */}
        <div className="flex items-center gap-2">
          <span className="text-primary-700 font-medium">Pretraga:</span>
          <input
            type="text"
            value={filterState.searchTerm}
            onChange={handleSearchChange}
            placeholder="Ime ili prezime studenta"
            className="w-full py-1.5 text-center px-5 bg-primary-200/20 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-200 focus:border-transparent transition duration-300"
          />
        </div>
      </div>

      {/* Active filters summary */}
      {(filterState.selectedGroups.length > 0 ||
        filterState.showAssigned !== null ||
        filterState.searchTerm) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-primary-700">Aktivni filteri:</span>
          {filterState.searchTerm && (
            <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
              Pretraga: {filterState.searchTerm}
            </span>
          )}
          {filterState.selectedGroups.map((grupa) => (
            <span
              key={grupa}
              className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full"
            >
              Grupa {grupa}
            </span>
          ))}
          {filterState.showAssigned !== null && (
            <span
              className={`px-2 py-0.5 rounded-full ${
                filterState.showAssigned
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {filterState.showAssigned ? "Raspoređeni" : "Neraspoređeni"}
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-primary-600 hover:text-primary-800 ml-2"
          >
            Obriši filtere
          </button>
        </div>
      )}
    </div>
  );
};
