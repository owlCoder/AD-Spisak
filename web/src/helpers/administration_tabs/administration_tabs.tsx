import AddAssistantForm from "../../components/dashboard/sections/advanced_administration/add_assistant/add_assistant_form";
import AddPredmetForm from "../../components/dashboard/sections/advanced_administration/add_predmet/add_predmet_form";
import AddStudentForm from "../../components/dashboard/sections/advanced_administration/add_student/add_student_form";
import DataMigrationSection from "../../components/dashboard/sections/data_migration/data_migration_section";
import { ChecklistaIkonica } from "../../components/layout/icons/checklist_ikonica";
import { ImportIkonica } from "../../components/layout/icons/import_ikonica";
import ResetIkonica from "../../components/layout/icons/reset_ikonica";
import { UserAddIkonica } from "../../components/layout/icons/user_add_ikonica";
import UsersIkonica from "../../components/layout/icons/users_ikonica";
import ChangePassword from "../../components/student_profile/change_password/change_password";
import { Korisnik } from "../../models/korisnik/korisnik";

export const createTabs = (
  korisnik: Korisnik | null,
  handlePasswordChange: (id: number, newPassword: string) => Promise<boolean>
) => [
  {
    label: "Promena lozinke",
    icon: <ResetIkonica className="w-5 h-5" />,
    content: (
      <div className="px-6 pt-2 pb-5">
        <ChangePassword
          korisnikId={korisnik?.id ?? 0}
          onPasswordChange={handlePasswordChange}
          isAdminSection={true}
        />
      </div>
    ),
  },
  {
    label: "Novi asistent",
    icon: <UserAddIkonica className="w-5 h-4 mt-0.5" />,
    content: (
      <div className="px-6 pt-2 pb-5">
        <AddAssistantForm onAssistantAdded={() => {}} />
      </div>
    ),
  },
  {
    label: "Novi student",
    icon: <UsersIkonica className="w-5 h-5" />,
    content: (
      <div className="px-6 pt-2 pb-5">
        <AddStudentForm onStudentAdded={() => {}} />
      </div>
    ),
  },
  {
    label: "Novi predmet",
    icon: <ChecklistaIkonica className="w-5 h-5" />,
    content: (
      <div className="px-6 pt-2 pb-5">
        <AddPredmetForm onPredmetCreated={() => {}} />
      </div>
    ),
  },
  {
    label: "Uvoz & Izvoz Podataka",
    icon: <ImportIkonica className="w-5 h-5" />,
    content: (
      <div className="px-6 pt-2 pb-5">
        <DataMigrationSection />
      </div>
    ),
  },
];
