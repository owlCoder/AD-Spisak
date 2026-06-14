import { useEffect, useState } from "react";
import { getAllProjektniZadaci } from "../../../../api/projektni_zadaci_api";
import { Korisnik } from "../../../../models/korisnik/korisnik";
import { ProjektniZadatak } from "../../../../models/projekat/ProjektniZadatak";
import { ProjekatIkonica } from "../../../layout/icons/projekat_ikonica";
import ProjektniZadaciTable from "./podela_projekata/projektni_zadaci_table";

interface KorisnikDetailsModalProps {
  studenti: Korisnik[];
}

const ProjektniZadaciSection: React.FC<KorisnikDetailsModalProps> = ({
  studenti,
}) => {
  const [projekti, setProjekti] = useState<ProjektniZadatak[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjektniZadaci();
  }, []);

  const fetchProjektniZadaci = async () => {
    setLoading(true);
    const data = await getAllProjektniZadaci();
    setProjekti(data);
    setLoading(false);
  };

  return (
    <>
      <section className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-2 text-primary-950">
          <ProjekatIkonica className="w-5 h-5 inline text-primary-600 -mt-0.5" />{" "}
          Podela projektnih zadataka
        </h2>
        <p className="text-primary-900/50 pb-4">
          Prikazani su studenti po grupama. Prvo se prikazuju studenti koji nisu
          raspoređeni ni u jedan tim, a onda studenti raspoređeni u timove,
          sortirani po grupama i rednom broju tima.
        </p>
        {loading ? (
          <div className="text-center py-4">Učitavanje...</div>
        ) : (
          <>
            <div>
              <ProjektniZadaciTable
                korisnici={studenti}
                projekti={projekti}
                onUpdate={fetchProjektniZadaci}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProjektniZadaciSection;
