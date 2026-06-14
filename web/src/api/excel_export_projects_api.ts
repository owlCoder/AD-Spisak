import { Korisnik } from "../models/korisnik/korisnik";
import { ExportToExcelProjekat } from "../models/projekat/ExportToExcelProjekat";

interface ZadatakInput {
  tim: string | null;
  zadatak: string;
}

const API_URL_EXCEL_API = import.meta.env.VITE_API_URL_EXCEL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper function to safely convert string to number
const parseTimToNumber = (tim: string | null): number | null => {
  if (tim === null) return null;
  const parsed = parseInt(tim, 10);
  return isNaN(parsed) ? null : parsed;
};

export const exportProjectsDataToExcel = async (
  korisnici: Korisnik[],
  zadaci: Record<number, ZadatakInput>
): Promise<Blob | null> => {
  try {
    const combinedData: ExportToExcelProjekat[] = korisnici
      .map((korisnik) => ({
        brojIndeksa: korisnik.broj_indeksa,
        imeIPrezime: korisnik.ime_prezime,
        grupa: korisnik.grupa,
        tim: parseTimToNumber(zadaci[korisnik.id]?.tim),
        projekat: zadaci[korisnik.id]?.zadatak || "",
      }))
      .sort((a, b) => {
        // First sort by grupa
        if (a.grupa !== b.grupa) {
          return a.grupa - b.grupa;
        }
        // Then sort by tim
        const timA = a.tim !== null ? a.tim : 0;
        const timB = b.tim !== null ? b.tim : 0;
        return timA - timB;
      });

    const response = await fetch(`${API_URL_EXCEL_API}/xlsx/projects/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(combinedData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Excel data.");
    }

    const blob = await response.blob();
    return blob;
  } catch {
    return null;
  }
};
