import { formatDate } from "../../../../helpers/date_time_formatter/format_date_time";
import { getDaysUntil } from "../../../../helpers/date_time_formatter/get_day_until";
import { TerminOdbraneProjekta } from "../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { WarningIkonica } from "../../../layout/icons/warning_ikonica";

export const InformacijeOdbrana = ({
  termin,
}: {
  termin: TerminOdbraneProjekta;
}) => {
  const renderDateInfo = (label: string, date: string) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <span className="whitespace-nowrap">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="font-medium">{formatDate(date, true)}</span>
        <span className="text-gray-500">({getDaysUntil(date)})</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2.5 text-sm text-gray-700">
      {renderDateInfo("Poslednji commit do:", termin.datum)}
      {renderDateInfo("Prijava se zatvara u:", termin.datum)}
      
      {termin.napomena && (
        <div className="flex items-start gap-2 mt-1 text-red-600">
          <WarningIkonica className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="font-medium leading-tight md:max-w-sm">{termin.napomena}</span>
        </div>
      )}
    </div>
  );
};