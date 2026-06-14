import { useState, useMemo, useCallback } from "react";
import { Korisnik } from "../../models/korisnik/korisnik";

export const useStudentGroupManage = () => {
  const [openSectionsState, setOpenSections] = useState<Record<string, boolean>>({});
  const [redni_broj_casa, setRedni_broj_casa] = useState<Record<string, number>>({});

  const openSections = useMemo(() => openSectionsState, [openSectionsState]);

  const initializeGroups = useCallback((korisnici: Korisnik[]) => {
    const uniqueGroups = [...new Set(korisnici.map(k => k.grupa))];
    
    const initialOpenSections = uniqueGroups.reduce((acc, grupa, index) => {
      acc[grupa] = index === 0;
      return acc;
    }, {} as Record<string, boolean>);

    const initialRedni_broj_casa = uniqueGroups.reduce((acc, grupa) => {
      acc[grupa] = 0;
      return acc;
    }, {} as Record<string, number>);

    setOpenSections(initialOpenSections);
    setRedni_broj_casa(initialRedni_broj_casa);
  }, []);

  const toggleSection = useCallback((grupa: string) => {
    setOpenSections(prev => ({ ...prev, [grupa]: !prev[grupa] }));
  }, []);

  const handleRedni_broj_casaChange = useCallback((grupa: string, value: number) => {
    setRedni_broj_casa(prev => ({ ...prev, [grupa]: value }));
  }, []);

  return {
    openSections,
    redni_broj_casa,
    initializeGroups,
    toggleSection,
    handleRedni_broj_casaChange,
    setRedni_broj_casa,
  };
};