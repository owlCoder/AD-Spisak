import { useState, useEffect, useMemo } from "react";
import { getAllPoeniByStudentsFKs } from "../../../api/poeni_api";
import { getPredmetById } from "../../../api/predmeti_api";
import { getClaimsFromToken } from "../../../helpers/jwt_helper";
import { AttendanceManagement } from "../../../hooks/student_attendance/useAttendanceManagment";
import { Korisnik } from "../../../models/korisnik/korisnik";
import { GroupSectionProps } from "../../../models/pages_props/group_section_props.ts/group_section_props";
import { Poeni } from "../../../models/poeni/poeni";
import { Checkbox } from "../../layout/checkbox/checkbox";
import { DodajIkonica } from "../../layout/icons/dodaj_ikonica";
import { StudentInfoCard } from "./student_info_card/StudentInfoCard";

const StudentsPerGroupSection: React.FC<GroupSectionProps> = ({
  grupa,
  korisnici,
  isOpen,
  selectedKorisnici,
  redni_broj_casa,
  onGroupSelect,
  onKorisnikSelect,
  onRedni_broj_casaChange,
  onPrisustvo,
}) => {
  const fond_casova: number = getClaimsFromToken()?.pfond ?? 12;
  const [predispitneNazivi, setPredispitneNazivi] = useState<string[]>([
    "K1",
    "K2",
    "Popravni",
  ]);
  const [poeniData, setPoeniData] = useState<Poeni[]>([]);
  const [showAddPoeniForm, setShowAddPoeniForm] = useState<{
    [key: number]: boolean;
  }>({});

  const {
    evidencijaPoGrupi,
    handleAttendanceClick,
    handleDeleteEvidencija,
    handleGroupAttendanceCreated,
  } = AttendanceManagement(parseInt(grupa), isOpen);

  const handlePrisustvoClick = async () => {
    onPrisustvo();
    await handleGroupAttendanceCreated();
  };

  const claims = getClaimsFromToken();
  const predmetId = claims?.pid;

  // Memoized poeniData for efficient sharing
  const memoizedPoeniData = useMemo(() => poeniData, [poeniData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all students regardless of group when isOpen is true
        const studentsToFetch = isOpen ? korisnici : korisnici.filter((u) => u.grupa.toString() === grupa);

        if (studentsToFetch.length > 0) {
          const ids = studentsToFetch.map((k) => k.id);

          // Fetch predispitne nazivi if predmetId is available
          if (predmetId) {
            const predmet = await getPredmetById(predmetId);
            if (predmet) {
              setPredispitneNazivi(predmet.predispitne_obaveze.split(","));
            }
          }

          // Fetch poeni for students
          const poeni = await getAllPoeniByStudentsFKs(ids);
          setPoeniData(poeni);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [grupa, isOpen, korisnici, predmetId]);

  const handleToggleAddPoeniForm = async (korisnikId: number) => {
    setShowAddPoeniForm((prev) => ({
      ...prev,
      [korisnikId]: !prev[korisnikId],
    }));
    
    // Fetch poeni for the current view (all students or specific group)
    const studentsToFetch = isOpen ? korisnici : korisnici.filter((u) => u.grupa.toString() === grupa);
    const ids = studentsToFetch.map((k) => k.id);
    const poeni = await getAllPoeniByStudentsFKs(ids);
    setPoeniData(poeni);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Checkbox
          id={`group-${grupa}`}
          checked={korisnici.every((k) => selectedKorisnici[k.id])}
          onChange={onGroupSelect}
          label={`Označi celu grupu`}
        />
        <div className="flex items-center space-x-2">
          <select
            value={redni_broj_casa}
            onChange={(e) => onRedni_broj_casaChange(parseInt(e.target.value))}
            className="w-16 py-1.5 bg-primary-200/30 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
          >
            <option value={0}>Čas</option>
            {[...Array(fond_casova).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handlePrisustvoClick}
            className="w-full px-2 py-1.5 bg-primary-700/90 text-white hover:bg-primary-700 flex rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          >
            <DodajIkonica className="h-6 w-6 mr-1 inline-block" /> Prisustvo
          </button>
        </div>
      </div>

      <div className="-mx-2">
        {korisnici.map((korisnik: Korisnik) => (
          <StudentInfoCard
            key={korisnik.id}
            korisnik={korisnik}
            isSelected={selectedKorisnici[korisnik.id] || false}
            onAttendanceClick={handleAttendanceClick}
            fondCasova={fond_casova}
            evidencijaPoGrupi={evidencijaPoGrupi}
            predispitneNazivi={predispitneNazivi}
            poeniData={memoizedPoeniData}
            onKorisnikSelect={onKorisnikSelect}
            onToggleAddPoeniForm={handleToggleAddPoeniForm}
            showAddPoeniForm={showAddPoeniForm[korisnik.id] || false}
            onDeleteEvidencija={handleDeleteEvidencija}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentsPerGroupSection;