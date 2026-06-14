import { Korisnik } from "../../../../models/korisnik/korisnik";
import { Poeni } from "../../../../models/poeni/poeni";

interface StudentScoresProps {
  korisnikId: number;
  poeniData: Poeni[];
  predispitneNazivi: string[];
  onOpenModal: (korisnik: Korisnik) => void;
  korisnik: Korisnik;
}

export const StudentScores: React.FC<StudentScoresProps> = ({
  korisnikId,
  poeniData,
  predispitneNazivi,
  onOpenModal,
  korisnik,
}) => {
  // If no points data for this student, return early
  const studentPoeni = poeniData.filter((p) => p.korisnik_fk === korisnikId);

  if (studentPoeni.length === 0) {
    return (
      <div className="-skew-x-6 font-normal text-center text-primary-600">
        Nema evidentiranih predispitnih obaveza
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 gap-x-4">
      {predispitneNazivi.map((naziv) => {
        // Explicitly match both korisnik_fk and naziv
        const poeniEntry = studentPoeni.find(
          (p) => p.naziv === naziv
        );

        // Only render if an entry is found
        return poeniEntry ? (
          <div
            key={naziv}
            onClick={() => onOpenModal(korisnik)}
            className="flex hover:cursor-pointer items-center border border-primary-100 shadow-xs bg-blue-200/20 rounded-md px-2 py-1"
          >
            <span className="text-primary-800 font-medium">
              {poeniEntry.naziv}:
            </span>
            <span className="font-semibold text-primary-600 ml-1">
              {poeniEntry.broj_poena}
            </span>
          </div>
        ) : null;
      })}
    </div>
  );
};