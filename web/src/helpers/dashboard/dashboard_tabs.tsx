import AdminIkonica from "../../components/layout/icons/admin_ikonica";
import { DatumIkonica } from "../../components/layout/icons/date_ikonica";
import { ProjekatIkonica } from "../../components/layout/icons/projekat_ikonica";
import { StatistikaIkonica } from "../../components/layout/icons/statistika_ikonica";
import UsersIkonica from "../../components/layout/icons/users_ikonica";

export type DashboardTabType =
  | "students"
  | "projects"
  | "odbrane"
  | "statistika"
  | "admin";

export const dashboard_tabs: Array<{
  id: DashboardTabType;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    id: "students",
    label: "Studenti",
    icon: <UsersIkonica className="w-6 h-6 -mt-0.5 font-bold" />,
  },
  {
    id: "projects",
    label: "Projektni Zadaci",
    icon: <ProjekatIkonica className="w-6 h-6 -mt-0.5 font-bold" />,
  },
  {
    id: "odbrane",
    label: "Odbrane Projekata",
    icon: <DatumIkonica className="w-6 h-6 -mt-0.5 font-bold" />,
  },
  {
    id: "statistika",
    label: "Pregled Poena",
    icon: <StatistikaIkonica className="w-6 h-6 -mt-0.5 font-bold" />,
  },
  {
    id: "admin",
    label: "Napredno & Administracija",
    icon: <AdminIkonica className="w-6 h-6 -mt-0.5 font-bold" />,
  },
];
