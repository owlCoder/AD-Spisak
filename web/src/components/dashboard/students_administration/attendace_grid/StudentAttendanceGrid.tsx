import { IEvidencijaPodaciBrojIndeksa } from "../../../../models/evidencija/evidencija_broj_indeksa";
import { UkloniIkonica } from "../../../layout/icons/ukloni_ikonica";

interface StudentAttendanceGridProps {
  korisnikId: number;
  fondCasova: number;
  evidencijaPoGrupi: IEvidencijaPodaciBrojIndeksa[];
  onAttendanceClick: (korisnikId: number, classNumber: number) => void;
  onDeleteEvidencija: (korisnikId: number, classNumber: number) => void;
}

export const StudentAttendanceGrid: React.FC<StudentAttendanceGridProps> = ({
  korisnikId,
  fondCasova,
  evidencijaPoGrupi,
  onAttendanceClick,
  onDeleteEvidencija,
}) => {
  const getColorClass = (id: number, classNumber: number) => {
    const entry = evidencijaPoGrupi.find(
      (e) => e.korisnik_fk === id && e.redni_broj_casa === classNumber
    );
    if (entry) {
      return entry.prisutan ? "text-emerald-600" : "text-red-600";
    }
    return "text-gray-400";
  };

  return (
    <>
      <div className="flex justify-between px-2 pt-2">
        {[...Array(fondCasova)].map((_, num) => {
          const classNumber = num + 1;
          const colorClass = getColorClass(korisnikId, classNumber);
          return (
            <span
              key={num}
              className={`font-bold ${colorClass} w-6 text-center border border-primary-300 shadow-xs lg:bg-primary-100 rounded-sm cursor-pointer hover:bg-primary-200 transition-colors duration-200`}
              onClick={() => onAttendanceClick(korisnikId, classNumber)}
            >
              {classNumber}
            </span>
          );
        })}
      </div>
      <div className="flex justify-between p-2">
        {[...Array(fondCasova)].map((_, num) => {
          const classNumber = num + 1;
          return (
            <button
              key={num}
              onClick={() => onDeleteEvidencija(korisnikId, classNumber)}
              className="text-xs md:text-sm text-red-600 rounded-full hover:bg-white transition duration-300"
            >
              <UkloniIkonica className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </>
  );
};
