import React from 'react';
import { CardStatistics } from "../../../../layout/small_card_statistics/card_stat";
import UsersIkonica from "../../../../layout/icons/users_ikonica";
import { ProjekatIkonica } from "../../../../layout/icons/projekat_ikonica";
import { BrojeviIkonica } from "../../../../layout/icons/brojevi_ikonica";
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../../../../models/projekat/ProjektniZadatak";
import { TerminOdbraneProjekta } from "../../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";

export interface ProjectDefenseStatsProps {
  ukupnoStudenata: number;
  projektniZadaci: ProjektniZadatak[];
  odabraniTermin: TerminOdbraneProjekta;
  groupedStudents: {
    grupa: number;
    tim: number;
    zadatak: string;
    students: Korisnik[];
  }[];
}

export const StatistikaPrijavljenihOdbranaProjekata: React.FC<ProjectDefenseStatsProps> = ({
  ukupnoStudenata,
  projektniZadaci,
  odabraniTermin,
  groupedStudents,
}) => {
  const prijaviloOdbranuUkupno = groupedStudents.reduce(
    (acc, group) => acc + group.students.length,
    0
  );

  const poloziloZaTerminProcenat = Math.round(
    (groupedStudents
      .flatMap((group) => group.students.map((student) => student.id)) // Get all student IDs
      .filter((studentId) =>
        projektniZadaci.some(
          (task) =>
            task.korisnik_fk === studentId &&
            task.polozeno &&
            task.termin_odbrane_id === odabraniTermin.id
        )
      ).length /
      prijaviloOdbranuUkupno) *
      100
  );

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
      <CardStatistics
        icon={
          <UsersIkonica className="w-6 h-6 inline -mt-2.5 text-primary-800" />
        }
        title="Studenata"
        body={"Prijavilo odbranu"}
        numberOf={prijaviloOdbranuUkupno + ""}
      />
      <CardStatistics
        icon={
          <ProjekatIkonica className="w-6 h-6 inline -mt-2.5 text-primary-800" />
        }
        title="Studenata"
        body={"Prijavljeno"}
        numberOf={
          Math.round((prijaviloOdbranuUkupno / ukupnoStudenata) * 100) + "%"
        }
      />
      <CardStatistics
        icon={
          <BrojeviIkonica className="w-6 h-6 inline -mt-2.5 text-primary-800" />
        }
        title="Prolaznost"
        body={"Položilo"}
        numberOf={poloziloZaTerminProcenat + "%"}
      />
    </div>
  );
};