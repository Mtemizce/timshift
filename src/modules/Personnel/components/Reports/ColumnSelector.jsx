// ✅ Tam revize edilmiş ColumnSelector.jsx - renk, yön ve önizleme destekli
import { Sun, Moon } from "lucide-react";

export default function ColumnSelector({ selectedColumns, setSelectedColumns, columnLabels, headerOptions, setHeaderOptions }) {
  const toggleColumn = (key) => {
    const updated = selectedColumns.includes(key) ? selectedColumns.filter((k) => k !== key) : [...selectedColumns, key];
    setSelectedColumns(updated);
    localStorage.setItem("personnel-report-columns", JSON.stringify(updated));
  };

  const updateHeader = (field, value) => {
    const updated = { ...headerOptions, [field]: value };
    setHeaderOptions(updated);
    localStorage.setItem("personnel-report-header", JSON.stringify(updated));
  };

  const toggleHeaderVisibility = () => {
    updateHeader("showHeader", !headerOptions.showHeader);
  };
  const toggleLogoVisibility = () => {
    updateHeader("showLogo", !headerOptions.showLogo);
  };
  return (
    <div className="w-full md:w-1/2 my-2">
      <div className="p-4 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">Sütun Seçimi</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(columnLabels).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={selectedColumns.includes(key)} onChange={() => toggleColumn(key)} className="accent-blue-600" />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="my-2 p-4 bg-white rounded-md shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">Özel Üst Başlık Kullan</label>
          <button onClick={toggleHeaderVisibility} className={`w-10 h-5 rounded-full cursor-pointer border flex items-center px-1 transition-colors duration-300 ${headerOptions.showHeader ? "bg-green-500 border-green-600" : "bg-gray-300 border-gray-400"}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${headerOptions.showHeader ? "translate-x-5" : "translate-x-0"}`}></div>
          </button>
        </div>

        {headerOptions.showHeader && (
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium block mb-1">Üst Başlık</label>
              <textarea
                className="w-full border rounded px-2 py-1 text-sm"
                rows={3}
                value={headerOptions.text}
                onChange={(e) => updateHeader("text", e.target.value)}
                style={{
                  backgroundColor: headerOptions.bgColor || "#fff",
                  color: headerOptions.textColor || "#000",
                }}
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <label className="text-sm font-medium block mb-1">Yazı Boyutu</label>
                <input type="number" min={10} className="border rounded px-2 py-1 w-20 text-sm" value={headerOptions.fontSize} onChange={(e) => updateHeader("fontSize", parseInt(e.target.value))} />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Hizalama</label>
                <select className="border rounded px-2 py-1 text-sm" value={headerOptions.align} onChange={(e) => updateHeader("align", e.target.value)}>
                  <option value="left">Sola</option>
                  <option value="center">Ortala</option>
                  <option value="right">Sağa</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Yazı Rengi</label>
                <input type="color" className="w-10 h-8 p-0" value={headerOptions.textColor || "#000000"} onChange={(e) => updateHeader("textColor", e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Arka Plan</label>
                <input type="color" className="w-10 h-8 p-0" value={headerOptions.bgColor || "#ffffff"} onChange={(e) => updateHeader("bgColor", e.target.value)} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SAYFA AYARLARI */}
        <h3>Sayfa Yapı Ayarları</h3>
      <div className="flex justify-center items-center gap-2 bg-white dark:bg-gray-600 rounded shadow-md p-4 my-2">
        <div>
          <label className="text-sm font-medium block mb-1">Çıktı Yönü</label>
          <select className="border rounded px-2 py-1 text-sm" value={headerOptions.orientation || "portrait"} onChange={(e) => updateHeader("orientation", e.target.value)}>
            <option value="portrait">Dikey</option>
            <option value="landscape">Yatay</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Logo</label>
          <button onClick={toggleLogoVisibility} className={`w-10 h-5 rounded-full cursor-pointer border flex items-center px-1 transition-colors duration-300 ${headerOptions.showLogo ? "bg-green-500 border-green-600" : "bg-gray-300 border-gray-400"}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${headerOptions.showLogo ? "translate-x-5" : "translate-x-0"}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
}
