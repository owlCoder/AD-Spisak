import { ExportDataExcel } from "../models/export_data";

export const getAllDataForExport = async (
  token: string
): Promise<ExportDataExcel[]> => {
  try {
    const response = await fetch(`${process.env.API_URL}/export`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ExportDataExcel[] = await response.json();
    return data;
  } catch {
    return [];
  }
};
