import { useState, useCallback } from 'react';
import { Korisnik } from "../../models/korisnik/korisnik";

export const useStudentiSelection = () => {
  const [selectedKorisnici, setSelectedKorisnici] = useState<Record<number, boolean>>({});

  const handleKorisnikSelect = useCallback((id: number) => {
    setSelectedKorisnici(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleGroupSelect = useCallback((groupKorisnici: Korisnik[]) => {
    setSelectedKorisnici(prev => {
      const allSelected = groupKorisnici.every((k) => prev[k.id]);
      const updatedSelection = { ...prev };
      groupKorisnici.forEach((k) => {
        updatedSelection[k.id] = !allSelected;
      });
      return updatedSelection;
    });
  }, []);

  const clearGroupSelection = useCallback((groupKorisnici: Korisnik[]) => {
    setSelectedKorisnici(prev => {
      const updatedSelection = { ...prev };
      groupKorisnici.forEach((k) => {
        updatedSelection[k.id] = false;
      });
      return updatedSelection;
    });
  }, []);

  return {
    selectedKorisnici,
    handleKorisnikSelect,
    handleGroupSelect,
    clearGroupSelection
  };
};