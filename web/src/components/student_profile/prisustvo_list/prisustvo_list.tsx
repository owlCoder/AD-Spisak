import { Evidencija } from "../../../models/evidencija/evidencija";

interface PrisustvoListProps {
  prisustva: Evidencija[];
}

export const PrisustvoList: React.FC<PrisustvoListProps> = ({ prisustva }) => {
  if (prisustva.length === 0) {
    return (
      <p className="text-primary-600 text-center font-medium -skew-x-3">
        Nema evidentiranih prisustva
      </p>
    );
  }

  const sortedPrisustva = [...prisustva].sort(
    (a: Evidencija, b: Evidencija) => a.redni_broj_casa - b.redni_broj_casa
  );

  return (
    <section>
      <p className="text-primary-900/50 pb-4 -mt-4">
        Prisustva su prikazana hronološki kako su uneta u sistem od strane
        asistenta.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPrisustva.map((evidencija) => (
          <div
            key={evidencija.id}
            className="group relative overflow-hidden bg-primary-500/10 backdrop-blur-xs rounded-xl border border-primary-200 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-200"
          >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content container */}
            <div className="relative">
              {/* Title row with optional icon */}
              <div className="flex items-center gap-2 mb-1">
              <h3 className="text-primary-600 text-md font-medium tracking-wide uppercase">
                  Čas {evidencija.redni_broj_casa}
                </h3>
              </div>

              {/* Value with dynamic styling based on content type */}
              <p
                className={`font-medium text-primary-900 break-words whitespace-normal text-base ${
                  evidencija.prisutan ? "text-green-800" : "text-rose-700"
                }`}
              >
                {evidencija.prisutan ? "Prisustvo" : "Odsustvo"}
              </p>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary-100/50 rounded-full blur-xl group-hover:bg-primary-200/50 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};
