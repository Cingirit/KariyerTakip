
import {
  BrowserRouter,
  NavLink,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications");
    return savedApplications ? JSON.parse(savedApplications) : [];
  });

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const navLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 font-medium ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <aside className="border-b border-slate-200 bg-white p-4 md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-b-0 md:border-r md:p-6">
          <h1 className="text-2xl font-bold text-blue-600">
            KariyerTakip
          </h1>

          <nav className="mt-4 flex gap-2 md:mt-10 md:flex-col md:space-y-2">
            <NavLink to="/" end className={navLinkClass}>
              Genel Bakış
            </NavLink>

            <NavLink to="/applications" className={navLinkClass}>
              Başvurularım
            </NavLink>
          </nav>
        </aside>

        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  applications={applications}
                  setApplications={setApplications}
                />
              }
            />

            <Route
              path="/applications"
              element={
                <Applications
                  applications={applications}
                  setApplications={setApplications}
                />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
