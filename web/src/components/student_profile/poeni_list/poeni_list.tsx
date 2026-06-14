import { Poeni } from "../../../models/poeni/poeni";

interface PoeniListProps {
  obaveze: Poeni[];
}

export const PoeniList: React.FC<PoeniListProps> = ({ obaveze }) => {
  if (obaveze.length === 0) {
    return (
      <p className="text-primary-600 text-center font-medium -skew-x-3">
        Nema evidentiranih poena
      </p>
    );
  }

  return (
    <section>
      <p className="text-primary-900/50 pb-4 -mt-4">
        Poeni koje ste osvojili na predispitnim obavezama su prikazani
        hronološki onako kako su uneti u sistem od strane asistenta.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {obaveze.map((o) => (
          <div
            key={o.id}
            className="group relative overflow-hidden bg-primary-500/10 backdrop-blur-xs rounded-xl border border-primary-200 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-200"
          >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content container */}
            <div className="relative">
              {/* Title row */}
              <div className="flex flex-col mb-2">
                <p className="text-primary-600 text-md font-medium tracking-wide uppercase">
                  {o.naziv}
                </p>

                {/* Points display */}
                <p className="text-primary-800 font-semibold text-base -skew-x-3">
                  {o.broj_poena} {o.broj_poena === 1 ? "poen" : "poena"}
                </p>

                {o.napomena &&
                  (/(https?:\/\/)?(www\.)?[a-z0-9]+\.[a-z]{2,6}(\.[a-z]{2})?(\/[a-z0-9#]+\/?)*$/i.test(
                    o.napomena
                  ) ? (
                    <a
                      href={
                        o.napomena.startsWith("http")
                          ? o.napomena
                          : `https://${o.napomena}`
                      }
                      className="text-primary-700 text-sm pt-0.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {o.napomena}
                    </a>
                  ) : (
                    <p className="text-primary-700 text-sm pt-0.5">
                      {o.napomena}
                    </p>
                  ))}
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary-100/50 rounded-full blur-xl group-hover:bg-primary-200/50 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};
