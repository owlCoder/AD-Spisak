import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateKorisnik } from "../../../../api/korisnik_api";
import { getAllPoeniByUserId } from "../../../../api/poeni_api";
import { Korisnik } from "../../../../models/korisnik/korisnik";
import { Poeni } from "../../../../models/poeni/poeni";
import ResetIkonica from "../../../layout/icons/reset_ikonica";
import UpdateStudentProfile from "../../../student_profile/update_profile/update_student_profile";
import StudentListaPoena from "./poeni_list/student_poeni_lista";
import { ChecklistaIkonica } from "../../../layout/icons/checklist_ikonica";
import MoreDetailsIkonica from "../../../layout/icons/more_details_ikonica";

interface StudentDetailsModalProps {
  korisnik: Korisnik;
}

const StudentDetails: React.FC<StudentDetailsModalProps> = ({ korisnik }) => {
  const [poeni, setPoeni] = useState<Poeni[]>([]);
  const [loading, setLoading] = useState(true);
  const [novaLozinka, setNovaLozinka] = useState<string | null>(null);

  useEffect(() => {
    fetchPoeni();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [korisnik.id]);

  const fetchPoeni = async () => {
    setLoading(true);
    const data = await getAllPoeniByUserId(korisnik.id);
    setPoeni(data);
    setLoading(false);
  };

  const handleResetPassword = async () => {
    const newPassword = Math.random().toString(36).slice(-8);
    const success = await updateKorisnik(korisnik.id, {
      ...korisnik,
      password: newPassword,
    });
    setNovaLozinka(newPassword);
    if (success) {
      toast.success(`Lozinka je ponovo postavljena`);
    } else {
      toast.error("Neuspešno resetovanje lozinke");
    }
  };

  return (
    <div className="space-y-6 p-4 border-t border-slate-300">
      {/* Pre-exam Requirements Section */}
      <section className="group relative overflow-hidden bg-primary-50/70 backdrop-blur-xs rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
        <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <ChecklistaIkonica className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold text-primary-900">
              Predispitne obaveze
            </h2>
          </div>
          <p className="text-primary-900/50 pb-4">
            {" "}
            Poeni sa predispitnih obaveza prikazani su po redosledu unosa, u
            slučaju greške moguće je poene promeniti.
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {poeni.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-primary-900/50 pb-4">
                    {" "}
                    Nema evidentiranih poena sa predispitnih obaveza
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {" "}
                  {poeni.map((poen) => (
                    <StudentListaPoena
                      key={poen.id}
                      poen={poen}
                      onUpdate={fetchPoeni}
                      onDelete={fetchPoeni}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Profile Update Section */}
      <section className="group relative overflow-hidden bg-primary-50/70 backdrop-blur-xs rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <MoreDetailsIkonica className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold text-primary-900">
              Ažuriranje podataka
            </h2>
          </div>
          <UpdateStudentProfile korisnik={korisnik} />
        </div>
      </section>

      {/* Password Reset Section */}
      <section className="group relative overflow-hidden bg-primary-50/50 backdrop-blur-xs rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
        <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <ResetIkonica className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold text-primary-900">
              Resetovanje lozinke
            </h2>
          </div>
          <p className="text-primary-900/50 pb-4">
            {" "}
            U slučaju da je student zaboravio lozinku moguće je njeno ponovno
            postavljanje na novu.
          </p>

          {novaLozinka && (
            <div className="mb-4 p-4 bg-primary-100/50 rounded-lg border border-primary-200">
              <p className="text-primary-700">
                Nova lozinka:{" "}
                <span className="font-mono font-semibold text-primary-900">
                  {novaLozinka}
                </span>
              </p>
            </div>
          )}

          <button
            onClick={handleResetPassword}
            className="text-white inline-flex items-center gap-2 px-4 py-2 base-button rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-primary-800/90 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-primary-800 focus:border-transparent"
          >
            <ResetIkonica className="w-5 h-5" />
            <span>Resetovanje lozinke</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default StudentDetails;
