import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth_api";
import { getAllPredmeti } from "../../api/predmeti_api";
import { PrijavaIkonica } from "../../components/layout/icons/prijava_ikonica";
import { getClaimsFromToken, isTokenValid } from "../../helpers/jwt_helper";
import { Predmet } from "../../models/predmet/predmet";
import { Spinner } from "../../components/layout/loading/loading";
import VideoBackground from "../../components/layout/background_video/background_video";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [prijavaUToku, setPrijavaUToku] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [predmeti, setPredmeti] = useState<Predmet[]>([]);
  const [selectedPredmetId, setSelectedPredmetId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchPredmeti = async () => {
      const data = await getAllPredmeti();
      setPredmeti(data);
      if (data.length > 0) {
        setSelectedPredmetId(data[0].id);
      }
    };

    fetchPredmeti();
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrijavaUToku(true);
    setError(null);

    const token = await login(email, password, selectedPredmetId ?? 1);

    if (token) {
      localStorage.setItem("token", token);
      const claims = getClaimsFromToken();
      if (claims) {
        if (claims.uloga === "STUDENT") {
          navigate(`/student/${claims.id}`);
        } else {
          navigate(`/studenti`);
        }
      }
    } else {
      setError("Podaci za prijavu nisu validni");
    }

    setPrijavaUToku(false);
  };

  useEffect(() => {
    if (isTokenValid()) {
      const claims = getClaimsFromToken();
      if (claims) {
        if (claims.uloga === "STUDENT") {
          navigate(`/student/${claims.id}`);
        } else {
          navigate("/studenti");
        }
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-slate-800">
      <VideoBackground src="/edu_720p.mp4" />
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-primary-100 backdrop-blur-lg rounded-2xl shadow-lg" />
        <div className="relative p-8">
          <div className="flex justify-center space-x-6 mb-6">
            <img
              src="/uns.png"
              alt="UNS Logo"
              className="h-20 w-auto opacity-80"
            />
            <img
              src="/ftn.png"
              alt="FTN Logo"
              className="h-20 w-auto opacity-80"
            />
          </div>

          <h2 className="text-2xl font-semibold text-center text-primary-950 mt-3 mb-6">
            Prijava korisnika
            <span className="block text-lg font-normal text-center text-primary-800/70 -skew-x-3">
              {import.meta.env.VITE_NAZIV_VERZIJA}
            </span>
          </h2>

         <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/40 rounded-lg">
  <p className="text-amber-950 text-sm text-center leading-relaxed">
   AD Spisak i povezani servisi će prestati sa radom <strong>30.10.2026.</strong>
    <br/>Nakon tog datuma sistem će biti dostupan isključivo u <strong>read-only</strong> režimu.
    Dalji razvoj i evidencija prisustva nastavljaju se kroz novu platformu{" "}
    <a
      href="https://evidentiraj.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold hover:text-amber-700"
    >
      Evidentiraj
    </a>
  </p>
</div>
          {error && (
            <div className="mb-6 p-4 bg-rose-600/15 border border-red-500/20 rounded-lg">
              <p className="text-red-800/70 text-center">{error}</p>
            </div>
          )}
          {loading ? (
            <>
              <div className="flex justify-center text-center gap-8 items-center">
                <Spinner size="lg" text="Učitavanje..." />
              </div>
            </>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="group">
                <select
                  id="predmet"
                  name="predmet"
                  value={selectedPredmetId ?? ""}
                  onChange={(e) => setSelectedPredmetId(Number(e.target.value))}
                  required
                  className="w-full p-4 bg-primary-200/30 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
                >
                  <option value="" disabled>
                    Izaberite predmet
                  </option>
                  {predmeti.map((predmet) => (
                    <option key={predmet.id} value={predmet.id}>
                      {predmet.naziv}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email adresa"
                  className="w-full p-4 bg-primary-200/30 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
                />
              </div>
              <div className="group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Lozinka"
                  className="w-full p-4 bg-primary-200/30 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white transition duration-300 text-lg
                ${
                  loading
                    ? "bg-primary-700/85 cursor-not-allowed"
                    : "base-button active:bg-primary-600/80"
                }
                focus:outline-hidden focus:ring-1 focus:ring-primary-400 backdrop-blur-xs`}
              >
                <PrijavaIkonica />
                {prijavaUToku ? (
                  <span className="inline-block animate-pulse font-md">
                    Prijavljivanje...
                  </span>
                ) : (
                  "Prijava u aplikaciju"
                )}
              </button>
            </form>
          )}
          <div className="mt-6 text-center text-primary-700/85 text-sm">
            <p className="pt-2 font-normal -skew-x-6">
              U slučaju da je lozinka istekla
              <span>
                {" "}
                ili je zaboravljena pošaljite
                <span> email</span> svom predmetnom asistentu radi resetovanja
                lozinke
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
