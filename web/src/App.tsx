import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login_page";
import StudentProfilePage from "./pages/student_profile/student_profile_page";
import DashboardPage from "./pages/dashboard/dashboard_page";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position={"top-right"}
        toastOptions={{
          duration: 5000,
        }}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/studenti" element={<DashboardPage />} />
        <Route path="/student/:id" element={<StudentProfilePage />} />
        <Route path="*" element={ <Navigate to={"/"} replace />} />
      </Routes>
    </>
  );
}

export default App;
