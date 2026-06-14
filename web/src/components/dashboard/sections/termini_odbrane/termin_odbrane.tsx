import { useEffect, useState } from "react";
import { DatumIkonica } from "../../../layout/icons/date_ikonica";
import { getAllTerminiOdbrane } from "../../../../api/termini_odbrane_api";
import { TerminOdbraneProjekta } from "../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import NoviTerminOdbraneForm from "./dodavanje_termina/dodavanje_termina_odbrane";
import ListaTerminaIzmena from "./prikaz_i_izmena_termina/termini_i_izmena";
import SubsectionTabButton from "../../../layout/subsection_tabs/subsection_tab_button";
import SubsectionTabContent from "../../../layout/subsection_tabs/subsection_tab_content";
import { ListaIkonica } from "../../../layout/icons/lista_ikonica";
import { Korisnik } from "../../../../models/korisnik/korisnik";
import { SpisakPrijavljenih } from "./spisak_prijavljenih/spisak_prijavljenih";
import { Spinner } from "../../../layout/loading/loading";



const TerminiOdbraneSection: React.FC<{ studenti: Korisnik[] }> = ({ studenti }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [termini, setTermini] = useState<TerminOdbraneProjekta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTermini();
  }, []);

  const fetchTermini = async () => {
    setLoading(true);
    const fetchedTermini = await getAllTerminiOdbrane();
    setTermini(fetchedTermini);
    setLoading(false);
  };

  const onTerminAdded = async () => {
    await fetchTermini();
  };

  const tabs = [
    {
      label: "Pregled i izmena termina",
      icon: <ListaIkonica className="w-5 h-5" />,
      content: (
        <section className="px-6 py-4">
          {loading ? (
            <Spinner className="text-center py-4" />
          ) : (
            <>
              <ListaTerminaIzmena termini={termini} onEdit={fetchTermini} />
              <div className="py-1"></div>
              <NoviTerminOdbraneForm onTerminAdded={onTerminAdded} />
            </>
          )}
        </section>
      ),
    },
    {
      label: "Spisak prijavljenih studenata",
      icon: <DatumIkonica className="w-5 h-5" />,
      content: (
        <div className="px-6 py-4">
          <SpisakPrijavljenih studenti={studenti} termini={termini} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile Tabs */}
      <div className="md:hidden space-y-2">
        {tabs.map((tab, index) => (
          <SubsectionTabButton
            key={index}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
            icon={tab.icon}
            fullWidth
          >
            {tab.label}
          </SubsectionTabButton>
        ))}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex space-x-2">
        {tabs.map((tab, index) => (
          <SubsectionTabButton
            key={index}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
            icon={tab.icon}
          >
            {tab.label}
          </SubsectionTabButton>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-xs border border-primary-100 overflow-hidden relative">
        {tabs.map((tab, index) => (
          <SubsectionTabContent key={index} isActive={activeTab === index}>
            {tab.content}
          </SubsectionTabContent>
        ))}
      </div>
    </div>
  );
};

export default TerminiOdbraneSection;
