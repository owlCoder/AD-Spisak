import React, { useState } from "react";
import { useKorisnik } from "../../../../hooks/korisnik/useKorisnikData";
import { createTabs } from "../../../../helpers/administration_tabs/administration_tabs";
import SubsectionTabButton from "../../../layout/subsection_tabs/subsection_tab_button";
import SubsectionTabContent from "../../../layout/subsection_tabs/subsection_tab_content";

const AdvancedAdministrationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { korisnik, handlePasswordChange } = useKorisnik();
  const tabs = createTabs(korisnik, handlePasswordChange);

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

export default AdvancedAdministrationSection;
