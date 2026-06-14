import { ProjektniZadatak } from "../../../../models/projekat/ProjektniZadatak";
import { TerminOdbraneProjekta } from "../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { DodajIkonica } from "../../../layout/icons/dodaj_ikonica";
import { UkloniIkonica } from "../../../layout/icons/ukloni_ikonica";
import { PrijavaOdjavaButton } from "../prijava_otkazi_dugme/prijava_dugme";

export const StatusTermina = ({
  termin,
  projekat,
  onPrijava,
  onOtkaziPrijavu,
}: {
  termin: TerminOdbraneProjekta;
  projekat: ProjektniZadatak | null;
  onPrijava: (terminId: number) => void;
  onOtkaziPrijavu: () => void;
}) => {
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

  if (projekat?.termin_odbrane_id === termin.id) {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-emerald-600 font-medium text-sm text-center md:text-base">
          Odbrana je prijavljena
        </div>
        {termin.prijava_otvorena && (
          <PrijavaOdjavaButton
            onClick={onOtkaziPrijavu}
            variant="danger"
            icon={<UkloniIkonica className="h-5 w-5 -mt-0.5 inline" />}
          >
            Otkazivanje prijave
          </PrijavaOdjavaButton>
        )}
      </div>
    );
  }

  if (!projekat?.polozeno && termin.aktivan && termin.prijava_otvorena) {
    return (
      <PrijavaOdjavaButton
        onClick={() => onPrijava(termin.id)}
        variant="primary"
        icon={<DodajIkonica className="h-6 w-6 -ml-2 -mr-1 -mt-0.5 inline" />}
      >
        Prijava termina
      </PrijavaOdjavaButton>
    );
  }

  return null;
};
