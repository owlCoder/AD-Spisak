import { getClaimsFromToken } from "../../helpers/jwt_helper";
import { Predmet } from "../../models/predmet/predmet";
import { getPredmetById } from "../../api/predmeti_api";
import { exportDataToExcel } from "../../api/export_data_excel_api";

export const exportToExcel = async () => {
  const claims = getClaimsFromToken();
  const predmetId = claims?.pid;

  let predmet: Predmet | null = null;

  if (predmetId) {
    predmet = await getPredmetById(predmetId);
  }

  const PREDISPITNE_NAZIVI = predmet
    ? predmet.predispitne_obaveze
    : "K1,K2,Popravni";
  const BROJ_CASOVA = predmet ? predmet.fond_casova : 12;
  const pnaziv = claims?.pnaziv;
  const FILE_NAME = pnaziv ? pnaziv + ".xlsx" : "spisak.xlsx";
  const blob = await exportDataToExcel(BROJ_CASOVA, PREDISPITNE_NAZIVI);

  if (!blob) return;

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = FILE_NAME;
  anchor.click();
  window.URL.revokeObjectURL(url);
};
