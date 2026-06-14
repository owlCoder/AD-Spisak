import { useState } from "react";
import toast from "react-hot-toast";
import ResetIkonica from "../../layout/icons/reset_ikonica";

interface ChangePasswordProps {
  korisnikId: number;
  onPasswordChange: (id: number, newPassword: string) => Promise<boolean>;
  isAdminSection?: boolean;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  korisnikId,
  onPasswordChange,
  isAdminSection,
}) => {
  const [novaLozinka, setNovaLozinka] = useState<string | null>(null);

  const handleResetPassword = async () => {
    if (!novaLozinka) return;

    const success = await onPasswordChange(korisnikId, novaLozinka);
    if (success) {
      toast.success(`Lozinka je uspešno promenjena`);
    } else {
      toast.error("Neuspešna promena lozinke");
    }
    setNovaLozinka(null);
  };

  return (
    <section
      className={`${
        isAdminSection
          ? "mt-4 group relative overflow-hidden bg-primary-100/40 backdrop-blur-xs rounded-xl border border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
          : ""
      }`}
    >
      <div
        className={`${
          isAdminSection
            ? "absolute inset-0 bg-linear-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            : ""
        }`}
      />
      <div className={`relative ${isAdminSection ? "p-6" : ""}`}>
        <div className="flex items-center gap-2 mb-4">
          <ResetIkonica className="w-5 h-5 mt-1 text-primary-700" />
          <h2 className="text-xl font-semibold text-primary-900">
            Promena lozinke
          </h2>
        </div>
        <p className="text-primary-900/50 pb-4">
          Kada Vam je nalog tek kreiran dobijate inicijalnu lozinku.
          Preporučljivo je da inicijalnu lozinku ažurirate sa Vašom novom.
        </p>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={novaLozinka || ""}
          onChange={(e) => setNovaLozinka(e.target.value)}
          required
          placeholder="Nova lozinka"
          className="w-full p-2 mb-4 bg-primary-200/20 border border-primary-300 rounded-lg text-primary-900 placeholder-primary-800/50 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-300"
        />
        <button
          onClick={handleResetPassword}
          className="base-button rounded-lg shadow-lg hover:shadow-xl 
               hover:translate-y-0.5 hover:bg-primary-800/90 
               active:translate-y-0 active:shadow-none 
               transition-all duration-300 focus:outline-hidden focus:ring-2 
               focus:ring-primary-400 focus:border-transparent text-white px-4 py-2"
        >
          <ResetIkonica className="h-6 w-6 mr-1 -mt-1 inline-block text-white" />{" "}
          Promena lozinke
        </button>
      </div>
    </section>
  );
};

export default ChangePassword;