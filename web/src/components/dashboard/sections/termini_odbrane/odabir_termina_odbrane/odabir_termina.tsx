import { TerminOdbraneProjekta } from "../../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";

export interface TerminSelectorProps {
  termini: TerminOdbraneProjekta[];
  selectedTermin: TerminOdbraneProjekta | null;
  onTerminSelect: (termin: TerminOdbraneProjekta) => void;
}

export const TerminSelector: React.FC<TerminSelectorProps> = ({
  termini,
  selectedTermin,
  onTerminSelect,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-primary-700 font-medium">Termin odbrane:</span>
        <div className="flex flex-wrap gap-2">
          {termini.map((termin) => (
            <button
              key={termin.id}
              onClick={() => onTerminSelect(termin)}
              className={`px-3 py-1 rounded-md transition-colors ${
                selectedTermin?.id === termin.id
                  ? "bg-primary-600 text-white"
                  : "bg-white text-primary-700 hover:bg-primary-200"
              }`}
            >
              <span className="font-semibold">{termin.naziv_termina_odbrane}</span> -{" "}
              {new Date(termin.datum).toLocaleDateString("sr-RS").replace(/\s/g, '')}{" "}
              {termin.vreme_odbrane.substring(0, 5)}h
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
