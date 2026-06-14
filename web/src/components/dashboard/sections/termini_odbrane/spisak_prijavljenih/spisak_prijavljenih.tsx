import { useGroupedStudents } from "../../../../../hooks/spisak_prijavljenih/grupisanje_studenata/useGrupisanjeStudenata";
import { useOdabirTerminaData } from "../../../../../hooks/spisak_prijavljenih/odabir_termina/useOdabirTermina";
import { usePointsManagement } from "../../../../../hooks/spisak_prijavljenih/poeni/usePoeniManagment";
import { Korisnik } from "../../../../../models/korisnik/korisnik";
import { TerminOdbraneProjekta } from "../../../../../models/termini_odbrane_projekta/termin_odbrane_projekta";
import { ChecklistaIkonica } from "../../../../layout/icons/checklist_ikonica";
import { TerminSelector } from "../odabir_termina_odbrane/odabir_termina";
import { TabelaPrijavljenihStudenataZaOdbranu } from "../tabela_prijavljenih_studenata/tabela_prijavljenih";

interface ISpisakPrijavljenihProps {
  studenti: Korisnik[];
  termini: TerminOdbraneProjekta[];
}

export const SpisakPrijavljenih: React.FC<ISpisakPrijavljenihProps> = ({
  studenti,
  termini,
}) => {
  const {
    selectedTermin,
    setSelectedTermin,
    poeni,
    projektniZadaci,
    editablePoeni,
    setEditablePoeni,
    editablePolozeno,
    setEditablePolozeno,
  } = useOdabirTerminaData();

  const groupedStudents = useGroupedStudents(studenti, projektniZadaci);
  const { handleSave } = usePointsManagement(poeni, projektniZadaci);

  return (
    <section className="mt-4 group relative overflow-hidden bg-primary-100/70 rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChecklistaIkonica className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold text-primary-900">
            Spiskovi prijava studenata po terminima
          </h2>
        </div>
        <p className="text-primary-900/50 pb-4">
          Prikazani su termini odbrane projekata, hronološki po unosu u sistem.
          Odabirom pojedinačnog termina prikazuje se spisak prijavljenih
          studenata, kao i njihov broj poena i da li su položili projekat.
        </p>
        <TerminSelector
          termini={termini}
          selectedTermin={selectedTermin}
          onTerminSelect={setSelectedTermin}
        />

        {!selectedTermin && (
          <p className="text-primary-700 text-center">
            Molimo izaberite termin odbrane za prikaz prijavljenih studenata.
          </p>
        )}

        {selectedTermin && groupedStudents.length === 0 && (
          <p className="text-primary-700 text-center">
            Nema prijavljenih studenata za izabrani termin.
          </p>
        )}

        {selectedTermin && groupedStudents.length > 0 && (
          <TabelaPrijavljenihStudenataZaOdbranu
            ukupnoStudenata={studenti.length || 0}
            projektniZadaci={projektniZadaci}
            odabraniTermin={selectedTermin}
            groupedStudents={groupedStudents}
            editablePoeni={editablePoeni}
            editablePolozeno={editablePolozeno}
            setEditablePoeni={setEditablePoeni}
            setEditablePolozeno={setEditablePolozeno}
            onSave={(student) =>
              handleSave(student, editablePoeni, editablePolozeno)
            }
          />
        )}
      </div>
    </section>
  );
};
