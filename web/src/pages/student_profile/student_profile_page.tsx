import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvidencijaByStudentId } from "../../api/evidencija_api";
import { updateKorisnik, getKorisnikById } from "../../api/korisnik_api";
import { getAllPoeniByUserId } from "../../api/poeni_api";
import { getStudentProjektniZadatak } from "../../api/projektni_zadaci_api";
import { Header } from "../../components/layout/header/header";
import { Spinner } from "../../components/layout/loading/loading";
import ChangePassword from "../../components/student_profile/change_password/change_password";
import { PoeniList } from "../../components/student_profile/poeni_list/poeni_list";
import { PrisustvoList } from "../../components/student_profile/prisustvo_list/prisustvo_list";
import {
  logout,
  isTokenValid,
  getClaimsFromToken,
} from "../../helpers/jwt_helper";
import { Evidencija } from "../../models/evidencija/evidencija";
import { Korisnik } from "../../models/korisnik/korisnik";
import { Poeni } from "../../models/poeni/poeni";
import { ProjektniZadatak } from "../../models/projekat/ProjektniZadatak";
import { TabPanel } from "../../components/layout/tabs/tab_panel";
import { ProfileSection } from "../../components/student_profile/profile/profile_section";
import { TabContent } from "../../components/layout/tabs/tab_content";
import { TabsContainer } from "../../components/layout/tabs/tabs_container";
import { TabButton } from "../../components/layout/tabs/tab_button";
import {
  student_profile_tabs,
  StudentTabType,
} from "../../helpers/students/student_profile_tabs";
import { ChecklistaIkonica } from "../../components/layout/icons/checklist_ikonica";
import { BrojeviIkonica } from "../../components/layout/icons/brojevi_ikonica";
import { DatumIkonica } from "../../components/layout/icons/date_ikonica";
import ListaTerminaOdbrane from "../../components/student_profile/termini_odbrane/lista_termina_odbrani";

const StudentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<StudentTabType>("profile");
  const [prisustvo, setPrisustvo] = useState<Evidencija[]>([]);
  const [predispitneObaveze, setPredispitneObaveze] = useState<Poeni[]>([]);
  const [korisnik, setKorisnik] = useState<Korisnik | null>(null);
  const [projekat, setProjekat] = useState<ProjektniZadatak | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = async (
    id: number,
    newPassword: string
  ): Promise<boolean> => {
    if (!korisnik) return false;
    const success = await updateKorisnik(id, {
      ...korisnik,
      password: newPassword,
    });
    return success;
  };

  const handleSignOut = () => {
    logout();
  };

  useEffect(() => {
    const validateAndFetchData = async () => {
      if (
        !isTokenValid() ||
        Number(getClaimsFromToken()?.id ?? 0) !== Number(id ?? 0)
      ) {
        navigate("/");
        return;
      }

      setLoading(true);
      try {
        const [
          prisustvoData,
          korisnikData,
          predispitneObavezeData,
          projekatData,
        ] = await Promise.all([
          getEvidencijaByStudentId(Number(id)),
          getKorisnikById(Number(id)),
          getAllPoeniByUserId(Number(id)),
          getStudentProjektniZadatak(Number(id)),
        ]);

        setPrisustvo(prisustvoData || []);
        setPredispitneObaveze(predispitneObavezeData);
        setKorisnik(korisnikData);
        setProjekat(projekatData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Došlo je do greške");
      } finally {
        setLoading(false);
      }
    };

    validateAndFetchData();
  }, [id, navigate]);

  const ukupnoPoena = predispitneObaveze.reduce((a, b) => a + b.broj_poena, 0);

  if (error) {
    return (
      <div className="mb-6 p-4 bg-red-600/20 border border-red-500/20 rounded-lg">
        <p className="text-red-800 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex md:items-center justify-center bg-primary-100 md:bg-primary-gradient md:p-4">
      <div className="relative w-full max-w-3xl">
        <div className="absolute inset-0 bg-primary-100 md:rounded-2xl" />
        <div className="relative p-4 md:p-8">
          <Header onSignOut={handleSignOut} />
          <h2 className="text-2xl font-bold text-center text-primary-900 mb-8">
            <span className="uppercase">Pregled aktuelne evidencije</span>
            <p className="font-normal text-xl -skew-x-3">
              {getClaimsFromToken()?.pnaziv}
            </p>
          </h2>

          {loading ? (
            <>
              <div className="flex justify-center text-center gap-8 items-center">
                <Spinner size="lg" text="Učitavanje..." />
              </div>
            </>
          ) : (
            korisnik && (
              <>
                <TabsContainer>
                  {student_profile_tabs.map((tab) => (
                    <TabButton
                      key={tab.id}
                      isActive={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      icon={tab.icon}
                      fullWidth={window.innerWidth < 640}
                    >
                      {tab.label}
                    </TabButton>
                  ))}
                </TabsContainer>
                <TabContent>
                  <TabPanel isActive={activeTab === "profile"}>
                    <ProfileSection
                      korisnik={korisnik}
                      ukupnoPoena={ukupnoPoena}
                      projekat={projekat}
                    />
                  </TabPanel>
                  <TabPanel isActive={activeTab === "password"}>
                    <div className="p-6 rounded-xl">
                      <ChangePassword
                        korisnikId={korisnik.id}
                        onPasswordChange={handlePasswordChange}
                      />
                    </div>
                  </TabPanel>

                  <TabPanel isActive={activeTab === "attendance"}>
                    <div className="p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-6 -mt-2 text-primary-950">
                        <ChecklistaIkonica className="w-5 h-5 -mt-1 inline text-primary-700" />{" "}
                        Evidencija prisustva
                      </h3>
                      <PrisustvoList prisustva={prisustvo} />
                    </div>
                  </TabPanel>

                  <TabPanel isActive={activeTab === "points"}>
                    <div className="p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-6 -mt-2 text-primary-950">
                        <BrojeviIkonica className="w-8 h-8 inline -mt-0.5 text-primary-700" />{" "}
                        Evidencija poena
                      </h3>
                      <PoeniList obaveze={predispitneObaveze} />
                    </div>
                  </TabPanel>

                  <TabPanel isActive={activeTab === "defense"}>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-6 -mt-2 text-primary-950">
                        <DatumIkonica className="w-5 h-5 -mt-1 inline text-primary-700" />{" "}
                        Termini odbrane projekta
                      </h3>
                      <p className="text-primary-900/50 pb-4 -mt-4">
                        Prikazani su aktuelni termini odbrane projekata. Kako bi
                        se pristupilo odbrani neophodno je imati aktivnu
                        prijavu.
                      </p>
                      <ListaTerminaOdbrane student={korisnik} />
                    </div>
                  </TabPanel>
                </TabContent>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
