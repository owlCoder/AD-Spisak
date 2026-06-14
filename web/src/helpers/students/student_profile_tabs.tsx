import { BrojeviIkonica } from "../../components/layout/icons/brojevi_ikonica";
import { ChecklistaIkonica } from "../../components/layout/icons/checklist_ikonica";
import { DatumIkonica } from "../../components/layout/icons/date_ikonica";
import MoreDetailsIkonica from "../../components/layout/icons/more_details_ikonica";
import ResetIkonica from "../../components/layout/icons/reset_ikonica";

export type StudentTabType =
  | "profile"
  | "password"
  | "attendance"
  | "points"
  | "defense";

export const student_profile_tabs: Array<{
  id: StudentTabType;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    id: "profile",
    label: "Profil",
    icon: <MoreDetailsIkonica className="w-5 h-5 -mt-0.5 font-bold" />,
  },
  {
    id: "password",
    label: "Lozinka",
    icon: <ResetIkonica className="w-5 h-5 font-bold" />,
  },
  {
    id: "attendance",
    label: "Prisustvo",
    icon: <ChecklistaIkonica className="w-5 h-5 font-bold" />,
  },
  {
    id: "points",
    label: "Poeni",
    icon: <BrojeviIkonica className="w-7 h-7 -mt-0.5  font-bold" />,
  },
  {
    id: "defense",
    label: "Termini Odbrane",
    icon: <DatumIkonica className="w-5 h-5 font-bold" />,
  },
];
