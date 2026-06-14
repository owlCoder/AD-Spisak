import React, { useState } from "react";
import { IEvidencijaPodaciBrojIndeksa } from "../../../../models/evidencija/evidencija_broj_indeksa";
import { Korisnik } from "../../../../models/korisnik/korisnik";
import { Poeni } from "../../../../models/poeni/poeni";
import { Checkbox } from "../../../layout/checkbox/checkbox";
import { DodajIkonica } from "../../../layout/icons/dodaj_ikonica";
import MoreDetailsIkonica from "../../../layout/icons/more_details_ikonica";
import AddPoeniForm from "../add_poeni_form/add_poeni_form";
import { StudentScores } from "../poeni_grid/PoeniGrid";
import DeleteIkonica from "../../../layout/icons/delete_ikonica";
import { HelpIkonica } from "../../../layout/icons/help_ikonica";
import StudentDetails from "../student_details/student_details";

interface StudentCardProps {
  korisnik: Korisnik;
  isSelected: boolean;
  fondCasova: number;
  evidencijaPoGrupi: IEvidencijaPodaciBrojIndeksa[];
  poeniData: Poeni[];
  predispitneNazivi: string[];
  onKorisnikSelect: (id: number) => void;
  onAttendanceClick: (
    korisnikId: number,
    classNumber: number,
    status: boolean
  ) => void;
  onDeleteEvidencija: (korisnikId: number, classNumber: number) => void;
  onToggleAddPoeniForm: (korisnikId: number) => void;
  showAddPoeniForm: boolean;
}

export const StudentInfoCard: React.FC<StudentCardProps> = ({
  korisnik,
  isSelected,
  fondCasova,
  evidencijaPoGrupi,
  poeniData,
  predispitneNazivi,
  onKorisnikSelect,
  onAttendanceClick,
  onDeleteEvidencija,
  onToggleAddPoeniForm,
  showAddPoeniForm,
}) => {
  const studentAttendance = evidencijaPoGrupi.filter(
    (ev) => ev.korisnik_fk === korisnik.id
  );
  const prisutnost = evidencijaPoGrupi.filter(
    (ev) => ev.korisnik_fk === korisnik.id && ev.prisutan
  );
  const attendanceCount = prisutnost.length;
  const attendancePercentage = ((attendanceCount / fondCasova) * 100).toFixed(
    1
  );

  const [selectedKorisnik, setSelectedKorisnik] = useState<Korisnik | null>(
    null
  );

  const totalPoints = poeniData
    .filter((poeni) => poeni.korisnik_fk === korisnik.id)
    .reduce((sum, poeni) => sum + poeni.broj_poena, 0);

  const getAttendanceStatus = (classNumber: number) => {
    const record = studentAttendance.find(
      (ev) => ev.redni_broj_casa === classNumber
    );
    if (!record) return "absent";
    return record.prisutan ? "present" : "excused";
  };

  const handleAttendanceClick = (
    classNumber: number,
    currentStatus: string
  ) => {
    if (currentStatus === "absent") {
      onAttendanceClick(korisnik.id, classNumber, true);
    } else if (currentStatus === "present") {
      onAttendanceClick(korisnik.id, classNumber, false);
    } else {
      onAttendanceClick(korisnik.id, classNumber, true);
    }
  };

  return (
    <div className="w-full mb-2">
      <div className="gap-2 mb-6 p-2 bg-white rounded-xl shadow-md border-[1.15px] border-primary-300/80 hover:shadow-lg transition-all duration-200 transform-gpu will-change-transform">
        <div className="grid grid-cols-12 gap-2 p-3 items-center">
          {/* Student Info Section */}
          <div className="col-span-12 sm:col-span-3 flex items-center space-x-2">
            <Checkbox
              id={`korisnik-${korisnik.id}`}
              checked={isSelected}
              onChange={() => onKorisnikSelect(korisnik.id)}
              label=""
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {korisnik.ime_prezime}
              </span>
              <span className="text-sm text-gray-600">
                {korisnik.broj_indeksa}
              </span>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-2 flex flex-col">
            <span className="text-sm text-gray-600 pb-1">Prisustvo</span>
            <div className="items-center space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-800/80 h-2.5 rounded-full"
                  style={{ width: `${attendancePercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-center pt-1 font-medium">
                {attendancePercentage}%
              </p>
            </div>
          </div>

          {/* Points Section */}
          <div className="col-span-12 sm:col-span-2 md:pl-4">
            <span className="text-sm text-gray-600">Ukupno poena</span>
            <div className="font-medium">{totalPoints}</div>
          </div>

          {/* Action Buttons */}
          <div className="col-span-12 sm:col-span-5 flex justify-end space-x-2">
            <button
              onClick={() => onToggleAddPoeniForm(korisnik.id)}
              className="py-1.5 px-3 bg-emerald-700/95 text-white hover:bg-emerald-700 flex rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-emerald-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
            >
              <DodajIkonica className="h-6 w-6 mr-0.5 text-white" />
              <span className="hidden sm:inline text-white">Unos poena</span>
            </button>
            <button
              onClick={() =>
                selectedKorisnik
                  ? setSelectedKorisnik(null)
                  : setSelectedKorisnik(korisnik)
              }
              className="py-1.5 px-3 bg-primary-800/85 text-white hover:bg-primary-700 flex rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-700 focus:border-transparent"
            >
              <MoreDetailsIkonica className="h-6 w-6 mr-0.5 text-white" />
              <span className="hidden sm:inline">Detalji</span>
            </button>
          </div>
        </div>

        <div>
          {selectedKorisnik && <StudentDetails korisnik={selectedKorisnik} />}
        </div>

        {/* Class Attendance Grid */}
        <div className="px-3 pb-3 border-t border-gray-300">
          <div className="mt-2">
            <div className="text-md -skew-x-3 text-gray-600 mb-3 block">
              Evidencija prisustva
              <div className="group pl-0.5 hidden lg:inline">
                <button className="text-primary-700">
                  <HelpIkonica className="h-5 w-5 -mt-1 inline" />
                </button>
                <span className="absolute top-0 ml-2 -mt-1.5 scale-0 transition-all rounded-sm bg-slate-100 p-2 text-base group-hover:scale-100">
                  Ako evidencija ne postoji, klikom na rbr. časa biće kreirana,
                  ako postoji postaće suprotna.
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: fondCasova }, (_, i) => i + 1).map(
                (classNumber) => {
                  const status = getAttendanceStatus(classNumber);
                  return (
                    <div key={classNumber} className="relative">
                      <button
                        onClick={() =>
                          handleAttendanceClick(classNumber, status)
                        }
                        className={`
                          w-8 h-8 text-sm rounded-md flex items-center justify-center transition-colors duration-200
                          ${
                            status === "present"
                              ? "bg-blue-800/80 text-white hover:bg-blue-800/70"
                              : status === "excused"
                              ? "bg-red-800/85 text-white hover:bg-red-800/70"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }
                        `}
                      >
                        {classNumber}
                      </button>
                      {status !== "absent" && (
                        <button
                          onClick={() =>
                            onDeleteEvidencija(korisnik.id, classNumber)
                          }
                          className="absolute -top-2.5 -right-1 bg-white/90 rounded-full p-0.5 shadow-xs hover:bg-gray-100"
                        >
                          <DeleteIkonica className="w-4 h-4 text-slate-700" />
                        </button>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Add Points Form */}
        {showAddPoeniForm && (
          <div className="px-3 pb-3 border-t border-gray-300">
            <AddPoeniForm
              korisnik_fk={korisnik.id}
              onPoeniAdded={() => onToggleAddPoeniForm(korisnik.id)}
              onOdustani={() => onToggleAddPoeniForm(korisnik.id)}
            />
          </div>
        )}

        {/* Detailed Scores */}
        <div className="px-3 pb-3 border-t border-gray-300">
          <div className="mt-2">
            <span className="text-md -skew-x-3 text-gray-600 mb-3 block">
              Evidencija poena
              <div className="group pl-0.5 hidden lg:inline">
                <button className="text-primary-700">
                  <HelpIkonica className="h-5 w-5 -mt-1 inline" />
                </button>
                <span className="absolute top-0 ml-2 -mt-1.5 scale-0 transition-all rounded-sm bg-slate-100 p-2 text-base group-hover:scale-100">
                  Klikom na željenu evidenciju poena otvara se brza izmena poena.
                </span>
              </div>
            </span>
            <StudentScores
              korisnikId={korisnik.id}
              poeniData={poeniData}
              predispitneNazivi={predispitneNazivi}
              onOpenModal={setSelectedKorisnik}
              korisnik={korisnik}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
