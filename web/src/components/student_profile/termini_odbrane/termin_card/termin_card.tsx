import { ProjektniZadatak } from "../../../../models/projekat/ProjektniZadatak";
import { TerminOdbraneProjekta } from "../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { DodajIkonica } from "../../../layout/icons/dodaj_ikonica";
import { UkloniIkonica } from "../../../layout/icons/ukloni_ikonica";
import { InformacijeOdbrana } from "../informacije_odbrana/informacije_odbrana";
import { MestoVremeOdbraneProjekta } from "../mesto_vreme_odbrane/mesto_vreme_odbrane";

export const TerminCard = ({
  termin,
  projekat,
  handlePrijava,
  handleOtkaziPrijavu,
}: {
  termin: TerminOdbraneProjekta;
  projekat: ProjektniZadatak | null;
  handlePrijava: (terminId: number) => Promise<void>;
  handleOtkaziPrijavu: () => Promise<void>;
}) => {
  const renderTerminStatus = () => {
    if (!projekat) {
      return (
        <div className="text-red-600 font-medium text-sm md:text-base">
          Nije dodeljen projektni zadatak
        </div>
      );
    }

    if (!termin.aktivan) {
      return (
        <div className="text-gray-500 font-medium text-sm md:text-base">
          Termin odbrane nije aktuelan
        </div>
      );
    }

    if (!termin.prijava_otvorena) {
      return (
        <div className="text-yellow-600 font-medium text-sm md:text-base">
          Prijava je zatvorena
        </div>
      );
    }

    if (!projekat?.polozeno && projekat?.termin_odbrane_id === termin.id) {
      return (
        <div className="flex flex-col gap-2">
          <div className="text-emerald-600 font-medium text-sm text-center md:text-base">
            Odbrana je prijavljena
          </div>
          {termin.prijava_otvorena && (
            <button
              type="button"
              onClick={handleOtkaziPrijavu}
              className="py-1.5 px-3 md:py-2 md:px-4 bg-red-700/85 text-white text-sm md:text-base rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-red-700/95 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-red-700"
            >
              <UkloniIkonica className="h-6 w-6 -mt-0.5 inline" />
              &nbsp;Otkazivanje
            </button>
          )}
        </div>
      );
    }

    if (!projekat?.polozeno && termin.aktivan && termin.prijava_otvorena) {
      return (
        <button
          type="button"
          onClick={() => handlePrijava(termin.id)}
          className="py-1.5 w-full px-3 md:py-2 md:px-4 bg-primary-700/85 text-white text-sm md:text-base rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-700/95 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-700 inline"
        >
          <DodajIkonica className="h-6 w-6 -ml-2 -mr-1 -mt-0.5 inline" />
          &nbsp;Prijava&nbsp;termina
        </button>
      );
    }
  };

  return (
    <div className="w-full">
      <div className="p-3 md:p-4 bg-primary-50/70 backdrop-blur-lg shadow-md border-[1.15px] border-primary-200 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4">
            <div className="space-y-2">
              <h3 className="text-base md:text-lg font-medium text-gray-900">
                {termin.naziv_termina_odbrane}
              </h3>
              <InformacijeOdbrana termin={termin} />
            </div>
            <div className="md:ml-auto">{renderTerminStatus()}</div>
          </div>
          <MestoVremeOdbraneProjekta termin={termin} />
        </div>
      </div>
    </div>
  );
};
