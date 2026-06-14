import React from "react";
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../../../../models/projekat/ProjektniZadatak";
import { BrojeviIkonica } from "../../../../layout/icons/brojevi_ikonica";
import { CardStatistics } from "../../../../layout/small_card_statistics/card_stat";

interface ZadatakStats {
  [key: string]: Set<string>;
}

interface ZadatakStatisticsProps {
  korisnici: Korisnik[];
  projekti: ProjektniZadatak[];
}

const ZadatakStatistics: React.FC<ZadatakStatisticsProps> = ({
  korisnici,
  projekti,
}) => {
  const zadatakStats: ZadatakStats = {};

  projekti.forEach((projekat: ProjektniZadatak) => {
    const korisnik = korisnici.find((k) => k.id === projekat.korisnik_fk);
    if (korisnik) {
      const key = `${korisnik.grupa}-${projekat.tim}-${projekat.zadatak}`;

      if (!zadatakStats[projekat.zadatak]) {
        zadatakStats[projekat.zadatak] = new Set<string>();
      }
      zadatakStats[projekat.zadatak].add(key);
    }
  });

  const sortedStats = Object.entries(zadatakStats)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([zadatak, combinations]) => ({
      zadatak,
      count: combinations.size,
    }));

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedStats.map(({ zadatak, count }) => (
        <CardStatistics
          key={zadatak}
          icon={
            <BrojeviIkonica className="w-6 h-6 inline -mt-2.5 text-primary-800" />
          }
          title="Zadatak"
          body={zadatak}
          numberOf={count + " kom."}
        />
      ))}

      {/* Annotation */}
      {sortedStats.length > 0 && (
        <div className="col-span-full text-sm text-gray-500 mt-2 -skew-x-6">
          <span className="text-red-700">*</span> Statistika je okviran podatak
          i može varirati
        </div>
      )}
    </div>
  );
};

export default ZadatakStatistics;
