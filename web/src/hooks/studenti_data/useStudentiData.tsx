import { useState, useEffect, useCallback } from "react";
import { getAllKorisnici } from "../../api/korisnik_api";
import { Korisnik } from "../../models/korisnik/korisnik";
import toast from "react-hot-toast";
import { isTokenValid } from "../../helpers/jwt_helper";

export const useStudentiData = (navigate: (path: string) => void) => {
  const [korisnici, setKorisnici] = useState<Korisnik[]>([]);
  const [filteredKorisnici, setFilteredKorisnici] = useState<Korisnik[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchKorisnici = useCallback(async () => {
    if (!isTokenValid()) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const korisniciData = await getAllKorisnici();
      setKorisnici(korisniciData);
      setFilteredKorisnici(korisniciData);
      return korisniciData;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Došlo je do greške");
      return [];
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchKorisnici();
  }, [fetchKorisnici]);

  return {
    korisnici,
    filteredKorisnici,
    setFilteredKorisnici,
    loading,
    fetchKorisnici,
  };
};