import { EvidencijaPodaciBrojIndeksa } from "../models/evidencija_broj_indeksa";

export const getAllEvidencija = async (
  token: string
): Promise<EvidencijaPodaciBrojIndeksa[]> => {
  try {
    const response = await fetch(`${process.env.API_URL}/evidencija/all`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: EvidencijaPodaciBrojIndeksa[] = await response.json();
    return data;
  } catch {
    return [];
  }
};
