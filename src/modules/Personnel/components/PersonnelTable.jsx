// src/modules/Personnel/components/PersonnelTable.jsx

import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../../lib/fetchWithAuth";
import Swal from "sweetalert2";
import LeaveModal from "../modals/LeaveModal";
import PersonnelTableHeader from "./PersonnelTable/PersonnelTableHeader";
import PersonnelTableBody from "./PersonnelTable/PersonnelTableBody";
import PersonnelTablePagination from "./PersonnelTable/PersonnelTablePagination";
import { beApiUrl } from './../../../lib/config.js'

export default function PersonnelTable() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ name: "", tc_no: "", role: "" });
  const [dropdownId, setDropdownId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [exportMode, setExportMode] = useState("filtered");

  const perPage = 10;
  const buttonRefs = useRef({});
  const navigate = useNavigate();

  const fetchPersonnel = useCallback(async () => {
    const res = await fetchWithAuth(`${beApiUrl}/personnel`);
    const list = await res.json();
    const active = list.filter((p) => p.is_quitting === 0);
    setData(active);
    filterData(active, filters);
  }, [filters]);

  useEffect(() => {
    fetchPersonnel();
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown-toggle") && !e.target.closest(".dropdown-menu")) {
        setDropdownId(null);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, [fetchPersonnel]);

  const toggleDropdown = (id) => {
    if (dropdownId === id) return setDropdownId(null);
    const button = buttonRefs.current[id];
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.right - 160 + window.scrollX,
      });
    }
    setDropdownId(id);
  };

  const handleEdit = (id) => {
    setDropdownId(null);
    navigate(`/personnel/${id}/edit`);
  };

  const handleQuit = async (id) => {
    const { value: quit_date } = await Swal.fire({
      title: "Çıkış Tarihi Seçin",
      input: "date",
      inputValue: new Date().toISOString().split("T")[0],
      showCancelButton: true,
      confirmButtonText: "Çıkışı Onayla",
      cancelButtonText: "İptal",
      inputValidator: (value) => (!value ? "Tarih seçilmelidir" : undefined),
    });
    if (!quit_date) return;
    const res = await fetchWithAuth(`${beApiUrl}/personnel/${id}/quit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ end_date: quit_date }),
    });
    if (!res.ok) {
      const err = await res.json();
      return Swal.fire("Hata", err.error || "Çıkış işlemi başarısız", "error");
    }
    Swal.fire("Başarılı", "Personel işten çıkarıldı", "success");
    fetchPersonnel();
  };

  const openLeaveModal = (personnel) => {
    setSelectedPersonnel(personnel);
    setLeaveModalOpen(true);
    setDropdownId(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const next = { ...filters, [name]: value.toLowerCase() };
    setFilters(next);
    setCurrentPage(1);
    filterData(data, next);
  };

  const filterData = (list, criteria) => {
    const result = list.filter(
      (p) =>
        p.name.toLowerCase().includes(criteria.name) &&
        p.tc_no.toLowerCase().includes(criteria.tc_no) &&
        (!criteria.role || p.role === criteria.role)
    );
    setFiltered(result);
  };

  const pageCount = Math.ceil(filtered.length / perPage);
  const paginatedData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <section id="personnel-section" className="bg-white dark:bg-gray-900 p-4 rounded-lg">
      

      <div className="my-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <input name="name" placeholder="Ad Soyad ile ara" onChange={handleFilterChange} className="input w-full md:w-1/3" />
        <input name="tc_no" placeholder="TC Kimlik ile ara" onChange={handleFilterChange} className="input w-full md:w-1/3" />
        <select name="role" onChange={handleFilterChange} className="input w-full md:w-1/3">
          <option value="">Tüm Görevler</option>
          {["Araç Arkası", "Şoför", "Mıntıka", "WC Tuvaletler"].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <PersonnelTableHeader
        exportMode={exportMode}
        setExportMode={setExportMode}
        filtered={filtered}
        data={data}
      />
      <PersonnelTableBody
        paginatedData={paginatedData}
        dropdownId={dropdownId}
        dropdownPos={dropdownPos}
        toggleDropdown={toggleDropdown}
        handleEdit={handleEdit}
        handleQuit={handleQuit}
        openLeaveModal={openLeaveModal}
        buttonRefs={buttonRefs}
        filtered={filtered}
      />

      <PersonnelTablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        totalCount={filtered.length}
      />

      {leaveModalOpen && selectedPersonnel && (
        <LeaveModal
          isOpen={leaveModalOpen}
          onClose={() => setLeaveModalOpen(false)}
          personnel={selectedPersonnel}
          onSuccess={fetchPersonnel}
        />
      )}
    </section>
  );
}
