import { Workbook } from "exceljs";
import { ExportDataExcel } from "../models/export_data";
import { getAllDataForExport } from "./data_export_service";
import { getAllEvidencija } from "./evidencija_all_service";
import { EvidencijaPodaciBrojIndeksa } from "../models/evidencija_broj_indeksa";

export const exportToExcel = async (
  token: string,
  fond_casova: number,
  predispitne_obaveze: string
): Promise<Buffer> => {
  const PREDISPITNE_NAZIVI = predispitne_obaveze.split(",");
  const BROJ_CASOVA = fond_casova;
  type RowData = Record<string, string | number | null>;

  const compareIndex = (a: string, b: string): number => {
    const [prefixA, yearA] = a.split("/");
    const [prefixB, yearB] = b.split("/");

    if (yearA !== yearB) {
      return parseInt(yearB) - parseInt(yearA);
    }

    const numA = parseInt(prefixA.replace(/\D/g, ""));
    const numB = parseInt(prefixB.replace(/\D/g, ""));

    return numA - numB;
  };

  const pointsData: ExportDataExcel[] = await getAllDataForExport(token);
  const attendanceData: EvidencijaPodaciBrojIndeksa[] = await getAllEvidencija(
    token
  );

  const columnOrder = [
    "Broj Indeksa",
    "Ime i Prezime",
    ...PREDISPITNE_NAZIVI,
    "Predispitne  ",
    "Ispitni Rok  ",
    "Ukupno  ",
    "Ocena",
    "     Komentar    ",
  ];

  const pointsMap = new Map<string, RowData>();

  pointsData.forEach((current) => {
    if (!current.broj_indeksa || !current.ime_prezime) return;

    const row = pointsMap.get(current.broj_indeksa) || {
      "Broj Indeksa": current.broj_indeksa,
      "Ime i Prezime": current.ime_prezime,
      ...PREDISPITNE_NAZIVI.reduce(
        (acc, naziv) => ({ ...acc, [naziv]: null }),
        {}
      ),
      "Predispitne  ": null,
      "Ispitni Rok  ": "",
      "Ukupno  ": "",
      Ocena: "",
      Komentar: "",
    };

    if (
      current.naziv_poena &&
      PREDISPITNE_NAZIVI.includes(current.naziv_poena)
    ) {
      const currentPoints = row[current.naziv_poena] as number;
      row[current.naziv_poena] =
        (currentPoints || 0) + (current.broj_poena || 0);
    }

    pointsMap.set(current.broj_indeksa, row);
  });

  pointsMap.forEach((row) => {
    row["Predispitne  "] = PREDISPITNE_NAZIVI.reduce(
      (sum: number, naziv: string) => {
        const value = row[naziv];
        return sum + (typeof value === "number" ? value : 0);
      },
      0
    );
  });

  const sortedPointsData = Array.from(pointsMap.values());
  sortedPointsData.sort((a, b) =>
    compareIndex(a["Broj Indeksa"] as string, b["Broj Indeksa"] as string)
  );

  const orderedPointsData = sortedPointsData.map((row) =>
    columnOrder.reduce((orderedRow, key) => {
      orderedRow[key] =
        row[key] !== undefined && row[key] !== 0 ? row[key] : "";
      return orderedRow;
    }, {} as RowData)
  );

  const attendanceRows: RowData[] = [];
  const studentIds = new Set([
    ...pointsData.map((data) => data.broj_indeksa),
    ...attendanceData.map((data) => data.korisnik_fk.toString()),
  ]);

  studentIds.forEach((studentId) => {
    const attendanceRow: RowData = {
      "Broj Indeksa": studentId,
      ...Array.from({ length: BROJ_CASOVA }, (_, i) => [
        (i + 1).toString(),
        "",
      ]).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      Prisustvovano: 0,
      Odsustvovano: 0,
    };

    attendanceData
      .filter((entry) => entry.broj_indeksa === studentId)
      .forEach((entry) => {
        const columnIndex = entry.redni_broj_casa.toString();
        if (entry.prisutan) {
          attendanceRow[columnIndex] = "+";
          attendanceRow["Prisustvovano"] =
            (attendanceRow["Prisustvovano"] as number) + 1;
        } else {
          attendanceRow[columnIndex] = "-";
          attendanceRow["Odsustvovano"] =
            (attendanceRow["Odsustvovano"] as number) + 1;
        }
      });

    attendanceRows.push(attendanceRow);
  });

  const filteredAttendanceRows = attendanceRows.filter((row) => {
    const brojIndeksa = row["Broj Indeksa"];
    const isValidIndex = !(
      typeof brojIndeksa === "string" && /^\d+\/\d+$/.test(brojIndeksa)
    );
    const isNonSenseData = !(
      typeof brojIndeksa === "string" &&
      /^\d+$/.test(brojIndeksa) &&
      row["Prisustvovano"] === 0 &&
      row["Odsustvovano"] === 0
    );

    return isValidIndex && isNonSenseData;
  });

  attendanceRows.sort((a, b) =>
    compareIndex(a["Broj Indeksa"] as string, b["Broj Indeksa"] as string)
  );

  // Create workbook and worksheets
  const workbook = new Workbook();
  const worksheetPoints = workbook.addWorksheet("Studenti");
  const worksheetAttendance = workbook.addWorksheet("Prisustva");

  // Add headers and style them
  const headerStyle = {
    font: { bold: true, color: { argb: "000000" } },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "a2ccee" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    border: {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    },
  };

  // Points worksheet
  worksheetPoints.columns = columnOrder.map((header) => ({
    header,
    key: header,
    width: Math.max(header.length + 2, 12),
  }));
  worksheetPoints.getRow(1).eachCell((cell) => {
    Object.assign(cell, headerStyle);
  });

  // Attendance worksheet
  const attendanceHeaders = [
    "Broj Indeksa",
    ...Array.from({ length: BROJ_CASOVA }, (_, i) => (i + 1).toString()),
    "Prisustvovano",
    "Odsustvovano",
  ];
  worksheetAttendance.columns = attendanceHeaders.map((header) => ({
    header,
    key: header,
    width: Math.max(header.length + 2, 12),
  }));
  worksheetAttendance.getRow(1).eachCell((cell) => {
    Object.assign(cell, headerStyle);
  });

  // Add data and apply styles
  worksheetPoints.addRows(orderedPointsData);
  worksheetAttendance.addRows(filteredAttendanceRows);

  // Apply alternating row colors and borders
  [worksheetPoints, worksheetAttendance].forEach((worksheet) => {
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        // Skip header row
        const fillColor = rowNumber % 2 === 0 ? "f1f7fd" : "c8dff5";
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: fillColor },
          };
          // Add borders to each cell
          cell.border = {
            top: { style: "dotted" },
            left: { style: "dotted" },
            bottom: { style: "dotted" },
            right: { style: "dotted" },
          };
        });
      }
    });

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      if (column && typeof column.eachCell === "function") {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const length = cell.value ? cell.value.toString().length : 0;
          maxLength = Math.max(maxLength, length);
        });
        column.width = Math.min(Math.max(maxLength + 2, 12), 30);
      }
    });
  });

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  
  return Buffer.from(buffer);
};
