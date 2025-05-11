import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Moon, Sun, LogOut } from "lucide-react";

export default function AdminLayout({ onLogout }) {

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    onLogout(); // ✅ App.jsx içindeki setAdmin(null)
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-0`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 text-xl font-bold">timShiftApp</div>

        <nav className="p-4 space-y-2">
          <NavLink to="/dashboard" className={({ isActive }) => navClass(isActive)}>
            🏠 Dashboard
          </NavLink>
          <NavLink to="/personnel" className={({ isActive }) => navClass(isActive)}>
            👷 Personel Yönetimi
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-600 dark:text-gray-200">
            ☰
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Admin Paneli</h1>
          <div className="flex items-center gap-4 ml-auto">
            {/* Dark mode button */}
            <button onClick={() => setDarkMode(!darkMode)} key={darkMode ? "dark" : "light"} className="p-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400 animate-sun-flip" /> : <Moon className="w-5 h-5 text-blue-400 animate-moon-rock" />}
            </button>

            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                {admin?.name || "Kullanıcı"}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-50">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-red-600">
                    <LogOut className="w-4 h-4" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function navClass(isActive) {
  return `block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""}`;
}
