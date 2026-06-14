import { Workbook } from "exceljs";
import { ExportToExcelProjekat } from "../models/export_to_excel_projekat";

export const exportProjekatToExcel = async (
  data: ExportToExcelProjekat[]
): Promise<Buffer> => {
  // Sort data by grupa and tim
  const sortedData = [...data].sort((a, b) => {
    if (a.grupa !== b.grupa) return a.grupa - b.grupa;
    if (a.tim === null || b.tim === null) return 0;
    return a.tim - b.tim;
  });

  // Create workbook
  const workbook = new Workbook();

  // Group data by project groups
  const groupedData = new Map<number, ExportToExcelProjekat[]>();
  sortedData.forEach((item) => {
    if (!groupedData.has(item.grupa)) {
      groupedData.set(item.grupa, []);
    }
    groupedData.get(item.grupa)!.push(item);
  });

  // Create a sheet for each group
  groupedData.forEach((groupData, grupa) => {
    const worksheet = workbook.addWorksheet(`Grupa ${grupa}`);

    // Define columns
    const columns = [
      { header: "Broj Indeksa", key: "brojIndeksa", width: 15 },
      { header: "Ime i Prezime", key: "imeIPrezime", width: 25 },
      { header: "Tim", key: "tim", width: 20 },
      { header: "Projekat", key: "projekat", width: 40 },
    ];

    worksheet.columns = columns;

    // Style header row
    const headerStyle = {
      font: { bold: true, color: { argb: "000000" } },
      fill: {
        type: "pattern" as const,
        pattern: "solid" as const,
        fgColor: { argb: "a2ccee" },
      },
      alignment: { horizontal: "center" as const, vertical: "middle" as const },
      border: {
        top: { style: "thin" as const },
        left: { style: "thin" as const },
        bottom: { style: "thin" as const },
        right: { style: "thin" as const },
      },
    };

    worksheet.getRow(1).eachCell((cell) => {
      Object.assign(cell, headerStyle);
    });

    let currentRow = 2;

    // Process group data
    groupData.forEach((item, index) => {
      // Format tim value for display
      const displayTim = item.tim !== null ? `Tim ${item.tim}` : "";

      // Add data row
      const row = worksheet.addRow({
        brojIndeksa: item.brojIndeksa,
        imeIPrezime: item.imeIPrezime,
        grupa: item.grupa,
        tim: displayTim,
        projekat: item.projekat,
      });

      // Apply row styling
      const rowStyle = {
        fill: {
          type: "pattern" as const,
          pattern: "solid" as const,
          fgColor: {
            argb: currentRow % 2 === 0 ? "f1f7fd" : "c8dff5",
          },
        },
        border: {
          top: { style: "thin" as const },
          left: { style: "thin" as const },
          bottom: { style: "thin" as const },
          right: { style: "thin" as const },
        },
      };

      row.eachCell((cell, colNumber) => {
        // Bold font for Tim and Projekat
        if (colNumber === 3 || colNumber === 4) {
          cell.font = { bold: true };
        }

        Object.assign(cell, rowStyle);
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });

      currentRow++;
    });

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      if (column && typeof column.eachCell === "function") {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const length = cell.value ? cell.value.toString().length : 0;
          maxLength = Math.max(maxLength, length);
        });
        column.width = Math.min(Math.max(maxLength + 2, 12), 40);
      }
    });
  });

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
};
