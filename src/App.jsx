import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import PersonnelDashboard from "./modules/Personnel/pages/Dashboard";
import AddPersonnel from "./modules/Personnel/pages/AddPersonnel";
import EditPersonnel from "./modules/Personnel/pages/EditPersonnel";
import Reports from "./modules/Personnel/pages/Reports";





function App() {
  // Admin state artık React state içinde tutuluyor
  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem("admin")));

  // localStorage değiştiğinde admin güncellenir
  useEffect(() => {
    const syncAdmin = () => {
      const updatedAdmin = JSON.parse(localStorage.getItem("admin"));
      setAdmin(updatedAdmin);
    };
    window.addEventListener("storage", syncAdmin);
    return () => window.removeEventListener("storage", syncAdmin);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Oturum açıkken /login'e erişilmesin */}
        <Route
          path="/login"
          element={
            admin ? <Navigate to="/dashboard" replace /> : <Login onLogin={setAdmin} />
          }
        />

        {/* Eğer admin varsa uygulama layout'u çalışır */}
        {admin ? (
          <Route path="/" element={<AdminLayout onLogout={() => setAdmin(null)} />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="personnel" element={<PersonnelDashboard />} />
            <Route path="/personnel/add" element={<AddPersonnel />} />
            <Route path="/personnel/:id/edit" element={<EditPersonnel />} />
            <Route path="/personnel/reports" element={<Reports />} />

          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
