import { useEffect, useMemo, useRef, useState } from "react";
import Chart, { ChartType } from "chart.js/auto";
import toast from "react-hot-toast";
import { Korisnik } from "../../../../models/korisnik/korisnik";
import {
  createPoeni,
  getAllPoeniByStudentsFKs,
  updatePoeni,
} from "../../../../api/poeni_api";
import { StatistikaIkonica } from "../../../layout/icons/statistika_ikonica";
import { Poeni } from "../../../../models/poeni/poeni";
import { IzmeniIkonica } from "../../../layout/icons/izmeni_ikonica";
import { CheckMarkIkonica } from "../../../layout/icons/checkmark_ikonica";

interface Props {
  korisnici: Korisnik[];
}

interface StudentWithPoeni {
  id: number;
  ime: string;
  prezime: string;
  poeni: number;
  ocena: number;
  polozio: boolean;
}

export default function StudentStatisticsPage({ korisnici }: Props) {
  const [studenti, setStudenti] = useState<StudentWithPoeni[]>([]);
  const [statistikaPoeni, setStatistikaPoeni] = useState<Poeni[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState<{ [id: number]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [id: number]: number }>({});

  const oceneRef = useRef<HTMLCanvasElement>(null);
  const poeniRef = useRef<HTMLCanvasElement>(null);
  const oceneChartRef = useRef<Chart | null>(null);
  const poeniChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchPoeni = async () => {
      const ids = korisnici.map((k) => k.id);
      const poeniData = await getAllPoeniByStudentsFKs(ids);
      if (!poeniData.length) {
        toast.error("Nema podataka o poenima");
        return;
      }

      setStatistikaPoeni(poeniData);

      const spojeno: StudentWithPoeni[] = korisnici.map((korisnik) => {
        const poeniZaKorisnika = poeniData.filter(
          (p) => p.korisnik_fk === korisnik.id
        );
        const total = poeniZaKorisnika.reduce(
          (sum, p) => sum + p.broj_poena,
          0
        );
        const ocena =
          total >= 91
            ? 10
            : total >= 81
            ? 9
            : total >= 71
            ? 8
            : total >= 61
            ? 7
            : total >= 51
            ? 6
            : 5;
        return {
          id: korisnik.id,
          ime: korisnik.ime_prezime,
          prezime: korisnik.ime_prezime,
          poeni: total,
          ocena,
          polozio: ocena > 5,
        };
      });

      setStudenti(spojeno);
    };

    if (korisnici.length > 0) {
      fetchPoeni();
    }
  }, [korisnici]);

  const statistika = useMemo(() => {
    if (!studenti.length) {
      return {
        ukupno: 0,
        polozili: 0,
        prosekOcena: 0,
        raspodelaOcena: { 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
        raspodelaPoena: new Array(11).fill(0),
      };
    }

    const ukupno = studenti.length;
    const polozili = studenti.filter((s) => s.polozio).length;
    const oceneZaProsek = studenti.filter((s) => s.ocena > 5);
    const prosekOcena =
      oceneZaProsek.length > 0
        ? +(
            oceneZaProsek.reduce((sum, s) => sum + s.ocena, 0) /
            oceneZaProsek.length
          ).toFixed(2)
        : 0;

    const raspodelaOcena: Record<number, number> = {
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    };
    studenti.forEach((s) => {
      raspodelaOcena[s.ocena]++;
    });

    const raspodelaPoena = new Array(11).fill(0);
    studenti.forEach((s) => {
      const index = Math.min(Math.floor(s.poeni / 10), 10);
      raspodelaPoena[index]++;
    });

    return {
      ukupno,
      polozili,
      prosekOcena,
      raspodelaOcena,
      raspodelaPoena,
    };
  }, [studenti]);

  useEffect(() => {
    if (!oceneRef.current || !poeniRef.current) return;

    oceneChartRef.current?.destroy();
    poeniChartRef.current?.destroy();

    oceneChartRef.current = new Chart(oceneRef.current, {
      type: "bar" as ChartType,
      data: {
        labels: ["5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            label: "Broj studenata",
            data: [5, 6, 7, 8, 9, 10].map((o) => statistika.raspodelaOcena[o]),
            backgroundColor: "#4A9782",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
      },
    });

    poeniChartRef.current = new Chart(poeniRef.current, {
      type: "bar" as ChartType,
      data: {
        labels: [
          "0–9",
          "10–19",
          "20–29",
          "30–39",
          "40–49",
          "50–59",
          "60–69",
          "70–79",
          "80–89",
          "90–99",
          "100+",
        ],
        datasets: [
          {
            label: "Broj studenata",
            data: statistika.raspodelaPoena,
            backgroundColor: "#748DAE",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
      },
    });
  }, [statistika]);

  const studentiFiltrirani = studenti.filter((s) => {
    const korisnik = korisnici.find((k) => k.id === s.id);
    const fullName = s.ime.toLowerCase();
    const indeks = korisnik?.broj_indeksa?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || indeks.includes(search);
  });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-2 text-primary-950">
        <StatistikaIkonica className="w-5 h-5 inline text-primary-600 -mt-0.5" />{" "}
        Pregled poena studenata
      </h2>
      <span className="text-primary-900/50 pb-4">
        Prikazani su statistički podaci o osvojenim poenima tokom nastave i
        ispita.
      </span>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white justify-items-center items-center border border-primary-300 rounded-xl shadow-sm p-4 text-center">
          <div className="p-2 bg-blue-50 rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>{" "}
            <span className="text-blue-700 px-1 uppercase font-medium">
              Studenata
            </span>
          </div>
          <div className="text-xl font-semibold text-blue-700">
            {statistika.ukupno}
          </div>
        </div>
        <div className="bg-white justify-items-center items-center border border-primary-300 rounded-xl shadow-sm p-4 text-center">
          <div className="p-2 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-6 h-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-emerald-700 px-1 uppercase font-medium">
              Položili
            </span>
          </div>{" "}
          <div className="text-xl font-semibold text-emerald-800">
            {statistika.polozili}
          </div>
        </div>
        <div className="bg-white justify-items-center items-center border border-primary-300 rounded-xl shadow-sm p-4 text-center">
          <div className="p-2 bg-red-50 rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>{" "}
            <span className="text-red-700 px-1 uppercase font-medium">
              Nisu položili
            </span>
          </div>

          <div className="text-xl font-semibold text-red-700">
            {statistika.ukupno - statistika.polozili}
          </div>
        </div>

        <div className="bg-white justify-items-center items-center border border-primary-300 rounded-xl shadow-sm p-4 text-center">
          <div className="p-2 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>{" "}
            <span className="text-indigo-700 px-1 uppercase font-medium">
              Prosek
            </span>
          </div>

          <div className="text-xl font-semibold text-indigo-700">
            {statistika.prosekOcena}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Ocene</h2>
          <canvas ref={oceneRef} height={300} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Poeni</h2>
          <canvas ref={poeniRef} height={300} />
        </div>
      </div>

      <div className="mt-12 overflow-x-auto">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Ime, prezime ili broj indeksa za pretragu studenata"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 p-2 bg-primary-200/15 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
          />
        </div>

        <table className="min-w-full divide-y divide-gray-300 bg-primary-100/30 shadow-md rounded-lg">
          <thead className="bg-primary-100">
            <tr>
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Indeks
              </th>
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Ime i Prezime
              </th>
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Predispitne
              </th>
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Ispit
              </th>
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Ukupno
              </th>
              <th className="p-3 text-primary-600 font-medium tracking-wide uppercase">
                Ocena
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {studentiFiltrirani.map((s) => {
              const korisnik = korisnici.find((k) => k.id === s.id);
              const sviPoeni = statistikaPoeni.filter(
                (p) => p.korisnik_fk === s.id
              );
              const ispit = sviPoeni.find((p) => p.naziv === "Ispitni Rok");
              const osnovniPoeni = sviPoeni
                .filter((p) => p.naziv !== "Ispitni Rok")
                .reduce((sum, p) => sum + p.broj_poena, 0);
              const ukupnoPoena = osnovniPoeni + (ispit?.broj_poena ?? 0);
              const ocena =
                ukupnoPoena >= 91
                  ? 10
                  : ukupnoPoena >= 81
                  ? 9
                  : ukupnoPoena >= 71
                  ? 8
                  : ukupnoPoena >= 61
                  ? 7
                  : ukupnoPoena >= 51
                  ? 6
                  : "-";

              return (
                <tr key={s.id} className="hover:bg-white/50">
                  <td className="px-4 py-2 text-base font-medium text-primary-900 text-center">
                    {korisnik?.broj_indeksa ?? "?"}
                  </td>
                  <td className="px-4 py-2 text-base font-medium text-primary-900 text-center">{s.ime}</td>
                  <td className="px-4 py-2 text-base font-medium text-primary-900 text-center">
                    {osnovniPoeni}
                  </td>
                  <td className="px-4 py-2 text-base font-medium text-primary-900 text-center">
                    {editing[s.id] ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          value={inputValues[s.id] ?? ispit?.broj_poena ?? ""}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              [s.id]: parseInt(e.target.value),
                            })
                          }
                          className="border rounded-sm px-2 py-1 w-11 text-center "
                        />
                        <button
                          onClick={async () => {
                            const value = inputValues[s.id];
                            if (isNaN(value)) return;

                            if (ispit) {
                              await updatePoeni(ispit.id, {
                                broj_poena: value,
                              });
                              toast.success("Ispit ažuriran");
                            } else {
                              await createPoeni({
                                korisnik_fk: s.id,
                                broj_poena: value,
                                naziv: "Ispitni Rok",
                              });
                              toast.success("Ispit dodat");
                            }

                            setStatistikaPoeni((prev) => {
                              const withoutOld = prev.filter(
                                (p) =>
                                  p.korisnik_fk !== s.id ||
                                  p.naziv !== "Ispitni Rok"
                              );
                              const newEntry: Poeni = {
                                id: ispit?.id ?? Date.now(),
                                korisnik_fk: s.id,
                                broj_poena: value,
                                naziv: "Ispitni Rok",
                              };
                              return [...withoutOld, newEntry];
                            });

                            setEditing({ ...editing, [s.id]: false });
                          }}
                          className=" flex hover:translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-0 py-1.5"
                        >
                          <CheckMarkIkonica className="h-5 w-5 text-emerald-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <span>{ispit?.broj_poena ?? "-"}</span>
                        <button
                          className=" flex hover:translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-0 py-1.5 -ml-4"
                          onClick={() =>
                            setEditing({ ...editing, [s.id]: true })
                          }
                        >
                          <IzmeniIkonica className="h-5 w-5 text-primary-600" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-base font-medium text-primary-900 text-center">
                    {ukupnoPoena}
                  </td>
                  <td className="px-4 py-2 text-base font-medium text-primary-900 text-center">{ocena}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
