import { Korisnik } from "../../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../../models/projekat/ProjektniZadatak";
import MoreDetailsIkonica from "../../layout/icons/more_details_ikonica";
import InfoCard from "../info_card/info_card";

interface ProfileSectionProps {
  korisnik: Korisnik;
  ukupnoPoena: number;
  projekat: ProjektniZadatak | null;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  korisnik,
  ukupnoPoena,
  projekat,
}) => (
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-2 -mt-2 text-primary-950">
    <MoreDetailsIkonica className="w-5 h-5 -mt-2 inline text-primary-700" /> Podaci o studentu
    </h3>
    <p className="text-primary-900/50 pb-4">
      Prikazani su Vaši trenutni podaci. U slučaju da je neki podatak netačan
      obratiti se asistentu.
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <InfoCard title="Ime i Prezime" value={korisnik.ime_prezime} />
      <InfoCard title="Email" value={korisnik.email} />
      <InfoCard title="Broj Indeksa" value={korisnik.broj_indeksa} />
      <InfoCard title="Grupa" value={korisnik.grupa} />
      <InfoCard title="Ukupno poena" value={ukupnoPoena} />
      <InfoCard
        title="Ocena"
        value={korisnik.ocena === 5 ? "/" : korisnik.ocena}
      />
      <InfoCard
        title="Tim"
        value={!projekat?.tim ? "Nije dodeljen" : projekat.tim}
      />
      <InfoCard
        title="Projektni Zadatak"
        value={!projekat?.zadatak ? "Nije dodeljen" : projekat.zadatak}
      />
    </div>
  </div>
);
