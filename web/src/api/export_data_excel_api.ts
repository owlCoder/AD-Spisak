const API_URL_EXCEL_API = import.meta.env.VITE_API_URL_EXCEL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

export const exportDataToExcel = async (
  fond_casova: number,
  predispitne_obaveze: string
): Promise<Blob | null> => {
  try {
    const response = await fetch(`${API_URL_EXCEL_API}/xlsx/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ fond_casova, predispitne: predispitne_obaveze }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Excel data.');
    }

    const blob = await response.blob();
    return blob;
  } catch {
    return null;
  }
};
