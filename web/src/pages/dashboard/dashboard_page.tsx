import React, { useState, useMemo, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/header/header";
import { logout, getClaimsFromToken } from "../../helpers/jwt_helper";
import { useStudentGroupManage } from "../../hooks/student_group/useStudentGroupManage";
import { useStudentiData } from "../../hooks/studenti_data/useStudentiData";
import { useStudentiSelection } from "../../hooks/studenti_selection/useStudentiSelection";
import { Korisnik } from "../../models/korisnik/korisnik";
import { evidencijaService } from "../../services/evidencija/multiple_evidencija_service";
import { Spinner } from "../../components/layout/loading/loading";
import { TabButton } from "../../components/layout/tabs/tab_button";
import { TabsContainer } from "../../components/layout/tabs/tabs_container";
import { TabPanel } from "../../components/layout/tabs/tab_panel";
import { TabContent } from "../../components/layout/tabs/tab_content";
import { dashboard_tabs, DashboardTabType } from "../../helpers/dashboard/dashboard_tabs";
import { createLazyComponentWithPreload } from "../../helpers/lazy_component_preloader/lazy_component_preloader";
import { BackToTop } from "../../components/layout/back_to_top/back_top_arrow";

// Preloadable lazy components
const StudentiFilters = createLazyComponentWithPreload(
  () => import("../../components/layout/filters/student_filter_hook/StudentsFilters")
);
const StudentsSection = createLazyComponentWithPreload(
  () => import("../../components/dashboard/sections/students/students_section")
);
const ProjektniZadaciSection = createLazyComponentWithPreload(
  () => import("../../components/dashboard/sections/projektni_zadaci/projektni_zadaci")
);
const TerminiOdbraneSection = createLazyComponentWithPreload(
  () => import("../../components/dashboard/sections/termini_odbrane/termin_odbrane")
);
const AdvancedAdministrationSection = createLazyComponentWithPreload(
  () => import("../../components/dashboard/sections/advanced_administration/advanced_administration")
);

const StudentStatisticsPage = createLazyComponentWithPreload(() => import("../../components/dashboard/sections/statistika/statistika"))

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTabType>("students");
  const [filters, setFilters] = useState({
    selectedGroups: [] as number[],
    brojIndeksa: "",
    imePrezime: "",
    grupa: "",
  });

  const { korisnici, filteredKorisnici, setFilteredKorisnici, loading } = useStudentiData(navigate);
  const {
    openSections,
    redni_broj_casa,
    toggleSection,
    handleRedni_broj_casaChange,
    setRedni_broj_casa,
  } = useStudentGroupManage();

  const {
    selectedKorisnici,
    handleKorisnikSelect,
    handleGroupSelect,
    clearGroupSelection,
  } = useStudentiSelection();

  const groupedKorisnici = useMemo(() => {
    return filteredKorisnici.reduce<Record<string, Korisnik[]>>((acc, korisnik) => {
      const grupaKey = korisnik.grupa.toString();
      if (!acc[grupaKey]) acc[grupaKey] = [];
      acc[grupaKey].push(korisnik);
      return acc;
    }, {});
  }, [filteredKorisnici]);

  // Modified preload function
  const preloadNextTab = useCallback((currentTab: DashboardTabType) => {
    const currentIndex = dashboard_tabs.findIndex(tab => tab.id === currentTab);
    const nextTab = dashboard_tabs[(currentIndex + 1) % dashboard_tabs.length];

    switch (nextTab.id) {
      case 'projects':
        ProjektniZadaciSection.preload();
        break;
      case 'odbrane':
        TerminiOdbraneSection.preload();
        break;
      case 'admin':
        AdvancedAdministrationSection.preload();
        break;
      case 'students':
        StudentiFilters.preload();
        StudentsSection.preload();
        break;
    }
  }, []);

  const handlePrisustvo = useCallback(async (grupa: string) => {
    const groupKorisnici = groupedKorisnici[grupa];
    const success = await evidencijaService.createGroupEvidencija(
      groupKorisnici,
      selectedKorisnici,
      redni_broj_casa[grupa]
    );

    if (success) {
      clearGroupSelection(groupKorisnici);
      const initialRedni_broj_casa = korisnici.reduce((acc, korisnik) => {
        acc[korisnik.grupa] = 0;
        return acc;
      }, {} as Record<string, number>);
      setRedni_broj_casa(initialRedni_broj_casa);
    }
  }, [groupedKorisnici, selectedKorisnici, redni_broj_casa, korisnici, clearGroupSelection, setRedni_broj_casa]);

  const onGroupPickup = useCallback((grupa: number) => {
    toggleSection(grupa.toString());
  }, [toggleSection]);

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <>
   
    <div className="min-h-screen flex md:items-center justify-center bg-primary-100 md:bg-primary-gradient md:p-4">
      <div className="relative w-full md:max-w-6xl">
        <div className="absolute inset-0 bg-primary-100 md:rounded-2xl" />
        <div className="relative p-4 md:p-8">
          <Header onSignOut={logout} />
          <h2 className="text-2xl font-bold text-center text-primary-900 mb-8">
            <span className="uppercase">Aktuelna evidencija studenata</span>
            <p className="font-normal text-xl -skew-x-3">
              {getClaimsFromToken()?.pnaziv}
            </p>
          </h2>

          <TabsContainer>
            {dashboard_tabs.map((tab) => (
              <TabButton
                key={tab.id}
                isActive={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  preloadNextTab(tab.id);
                }}
                icon={tab.icon}
                fullWidth={window.innerWidth < 640}
              >
                {tab.label}
              </TabButton>
            ))}
          </TabsContainer>

          {loading ? (
            <div className="flex justify-center text-center gap-8 items-center">
              <Spinner size="lg" text="Učitavanje..." />
            </div>
          ) : (
            <>
              <TabPanel isActive={activeTab === "students"}>
                <TabContent>
                  <Suspense fallback={<Spinner size="lg" text="Učitavanje..." />}>
                    <StudentiFilters.component
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      korisnici={korisnici}
                      setFilteredKorisnici={setFilteredKorisnici}
                      onGroupPickup={onGroupPickup}
                    >
                      <StudentsSection.component
                        groupedKorisnici={groupedKorisnici}
                        openSections={openSections}
                        selectedKorisnici={selectedKorisnici}
                        redni_broj_casa={redni_broj_casa}
                        toggleSection={toggleSection}
                        handleGroupSelect={handleGroupSelect}
                        handleKorisnikSelect={handleKorisnikSelect}
                        handleRedni_broj_casaChange={handleRedni_broj_casaChange}
                        handlePrisustvo={handlePrisustvo}
                      />
                    </StudentiFilters.component>
                  </Suspense>
                </TabContent>
              </TabPanel>

              <TabPanel isActive={activeTab === "projects"}>
                <TabContent>
                  <Suspense fallback={<Spinner size="lg" text="Učitavanje..." />}>
                    <ProjektniZadaciSection.component studenti={korisnici} />
                  </Suspense>
                </TabContent>
              </TabPanel>

              <TabPanel isActive={activeTab === "odbrane"}>
                <TabContent>
                  <Suspense fallback={<Spinner size="lg" text="Učitavanje..." />}>
                    <TerminiOdbraneSection.component studenti={korisnici} />
                  </Suspense>
                </TabContent>
              </TabPanel>

              <TabPanel isActive={activeTab === "statistika"}>
                <TabContent>
                <Suspense fallback={<Spinner size="lg" text="Učitavanje..." />}>
                 <StudentStatisticsPage.component korisnici={korisnici} />
                  </Suspense>
                </TabContent>
              </TabPanel>

              <TabPanel isActive={activeTab === "admin"}>
                <TabContent>
                  <Suspense fallback={<Spinner size="lg" text="Učitavanje..." />}>
                    <AdvancedAdministrationSection.component />
                  </Suspense>
                </TabContent>
              </TabPanel>
            </>
          )}
        </div>
      </div>
    </div> 
    <BackToTop />
    </>
  );
};

export default React.memo(DashboardPage);