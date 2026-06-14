import { useState, useEffect } from "react";
import { getKorisnikById, updateKorisnik } from "../../api/korisnik_api";
import { getClaimsFromToken } from "../../helpers/jwt_helper";
import { Korisnik } from "../../models/korisnik/korisnik";

// Hook to manage korisnik data
export const useKorisnik = () => {
  const [korisnik, setKorisnik] = useState<Korisnik | null>(null);

  useEffect(() => {
    const fetchKorisnik = async () => {
      const claims = getClaimsFromToken();
      if (claims && claims.id) {
        try {
          const fetchedKorisnik = await getKorisnikById(parseInt(claims.id));
          setKorisnik(fetchedKorisnik);
        } catch (error) {
          console.error("Error fetching korisnik:", error);
        }
      }
    };

    fetchKorisnik();
  }, []);

  const handlePasswordChange = async (id: number, newPassword: string) => {
    if (!korisnik) return false;

    try {
      const success = await updateKorisnik(id, {
        ...korisnik,
        password: newPassword,
      });
      return success;
    } catch {
      return false;
    }
  };

  return { korisnik, handlePasswordChange };
};
