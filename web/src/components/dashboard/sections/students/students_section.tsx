import { Korisnik } from "../../../../models/korisnik/korisnik";
import StudentsPerGroupSection from "../../students_administration/StudentsPerGroupSection";

interface StudentsSectionProps {
  groupedKorisnici: Record<string, Korisnik[]>;
  openSections: Record<string, boolean>;
  selectedKorisnici: Record<number, boolean>;
  redni_broj_casa: Record<string, number>;
  toggleSection: (grupa: string) => void;
  handleGroupSelect: (groupKorisnici: Korisnik[]) => void;
  handleKorisnikSelect: (id: number) => void;
  handleRedni_broj_casaChange: (grupa: string, value: number) => void;
  handlePrisustvo: (grupa: string) => void;
}

const StudentsSection: React.FC<StudentsSectionProps> = ({
  groupedKorisnici,
  openSections,
  selectedKorisnici,
  redni_broj_casa,
  handleGroupSelect,
  handleKorisnikSelect,
  handleRedni_broj_casaChange,
  handlePrisustvo,
}) => {
  return (
    <div className="space-y-4">
      {Object.entries(groupedKorisnici).map(([grupa, grupniKorisnici]) => (
        <StudentsPerGroupSection
          key={grupa}
          grupa={grupa}
          korisnici={grupniKorisnici}
          isOpen={openSections[grupa]}
          selectedKorisnici={selectedKorisnici}
          redni_broj_casa={redni_broj_casa[grupa]}
          onGroupSelect={() => handleGroupSelect(grupniKorisnici)}
          onKorisnikSelect={handleKorisnikSelect}
          onRedni_broj_casaChange={(value) =>
            handleRedni_broj_casaChange(grupa, value)
          }
          onPrisustvo={() => handlePrisustvo(grupa)}
        />
      ))}
    </div>
  );
};

export default StudentsSection;
