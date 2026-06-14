import { utils, read } from "xlsx";
import Korisnik from "../models/korisnik";

export const ssluzba_excel_u_korisnike = async (
  fileBuffer: Buffer // Accepting a Buffer instead of a File
): Promise<Korisnik[]> => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = read(fileBuffer, { type: "buffer" }); // Use 'buffer' type

      const allKorisnici: Korisnik[] = [];

      workbook.SheetNames.forEach((sheetName: string) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet);

        const processedKorisnici = processKorisnici(jsonData, sheetName);
        allKorisnici.push(...processedKorisnici);
      });

      resolve(allKorisnici);
    } catch (error) {
      reject(error);
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processKorisnici = (data: any[], sheetName: string): Korisnik[] => {
  const korisniciArray: Korisnik[] = [];
  const grupa = extractGroupFromSheetName(sheetName);

  data.forEach((item) => {
    const brojIndeksa = item["__EMPTY"] || "";

    if (brojIndeksa === "Broj indeksa") return;

    if (item["__EMPTY_1"] && item["__EMPTY_2"]) {
      const prezime = item["__EMPTY_1"];
      const ime = item["__EMPTY_2"];

      const korisnik: Korisnik = {
        id: 0, // This will be assigned by the backend
        email: generateEmail(prezime, brojIndeksa),
        password: "StudentFTN@123",
        ime_prezime: `${ime} ${prezime}`,
        uloga: "STUDENT",
        broj_indeksa: brojIndeksa,
        grupa: grupa,
        ocena: 5,
      };

      korisniciArray.push(korisnik);
    }
  });

  return korisniciArray;
};

const extractGroupFromSheetName = (sheetName: string): number => {
  const match = sheetName.match(/Grupa\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const generateEmail = (prezime: string, brojIndeksa: string): string => {
  const cleanedPrezime = prezime
    .replace(/ć/gi, "c")
    .replace(/č/gi, "c")
    .replace(/š/gi, "s")
    .replace(/đ/gi, "dj")
    .replace(/ž/gi, "z");

  const [program, index] = brojIndeksa.split(" ");
  const cleanedIndex = index ? index.replace("/", ".") : "";

  return `${cleanedPrezime}.${program}${cleanedIndex}@uns.ac.rs`.toLowerCase();
};
