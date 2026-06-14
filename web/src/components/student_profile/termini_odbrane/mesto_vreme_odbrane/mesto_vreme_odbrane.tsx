import {
  formatDate,
  formatTime,
} from "../../../../helpers/date_time_formatter/format_date_time";
import { TerminOdbraneProjekta } from "../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { DatumIkonica } from "../../../layout/icons/date_ikonica";
import { LokacijaIkonica } from "../../../layout/icons/lokacija_ikonica";
import { VremeIkonica } from "../../../layout/icons/vreme_ikonica";

export const MestoVremeOdbraneProjekta = ({
  termin,
}: {
  termin: TerminOdbraneProjekta;
}) => (
  <div className="flex flex-wrap items-center gap-2 text-sm md:text-base text-gray-600">
    <div className="flex items-center gap-1">
      <DatumIkonica className="w-4 h-4" />
      <span>{formatDate(termin.datum)}</span>
    </div>
    <div className="flex items-center gap-1">
      <VremeIkonica className="w-4 h-4" />
      <span>{formatTime(termin.vreme_odbrane)}</span>
    </div>
    <div className="flex items-center gap-1">
      <LokacijaIkonica className="w-4 h-4" />
      <span>{termin.ucionica}</span>
    </div>
  </div>
);
