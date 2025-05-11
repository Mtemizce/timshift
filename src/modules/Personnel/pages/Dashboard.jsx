// src/modules/Personnel/pages/Dashboard.jsx

import { useNavigate } from "react-router-dom";
import { PlusCircle, Briefcase, Users, CalendarDays, BarChart2 } from "lucide-react";
import PersonnelTable from "../components/PersonnelTable";

export default function PersonnelDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Topbar */}
      <div className="flex flex-wrap gap-2 justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">👷 Personel Yönetimi</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => navigate("/personnel/add")} className="bg-blue-600 text-white  hover:bg-blue-700 dashboardBtn">
            <PlusCircle className="w-5 h-5" /> İşe Giriş
          </button>
          <button className="bg-amber-600 text-white  hover:bg-amber-700 dashboardBtn">
            <Briefcase className="w-5 h-5" /> Zimmet
          </button>
          <button className="bg-red-600 text-white  hover:bg-red-700 dashboardBtn">
            <Users className="w-5 h-5" /> Çıkış İşlemi
          </button>
          <button className="bg-green-600 text-white  hover:bg-green-700 dashboardBtn">
            <CalendarDays className="w-5 h-5" /> İzin Ver
          </button>
          <button
            onClick={() => navigate("/personnel/reports")}
            className="bg-gray-600 text-white hover:bg-gray-700 dashboardBtn"
          >
            <BarChart2 className="w-5 h-5" /> Rapor Oluştur
          </button>

        </div>
      </div>

      {/* Widget alanı */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Widget title="Toplam Personel" value="123" />
        <Widget title="Aktif Personel" value="97" />
        <Widget title="İzindeki Personel" value="5" />
        <Widget title="Göreve Yeni Başlayan" value="4" />
      </div>

      {/* Liste Alanı */}
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Personel Listesi</h2>
        <div className="text-sm text-gray-500 overflow-visible">
          <PersonnelTable />
        </div>
      </div>
    </div>
  );
}

function Widget({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <div className="text-gray-600 dark:text-gray-300 text-sm">{title}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}
