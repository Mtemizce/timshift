import { React } from "react";

export default function PageConfig({ pageOptions, setPageOptions }) {
  const updateOptions = (field, value) => {
    const updated = { ...pageOptions, [field]: value };
    setPageOptions(updated);
    localStorage.setItem("personnel-page-option", JSON.stringify(updated));
  };
  const toggleLogoVisibility = () => {
    updateOptions("showLogo", !pageOptions.showLogo);
  };
  return (
    <div className="w-full ">
     

      <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
        <div>
          <label className="text-sm font-medium block mb-1">Çıktı Yönü</label>
          <select className="border rounded px-2 py-1 text-sm" value={pageOptions.orientation || "portrait"} onChange={(e) => updateOptions("orientation", e.target.value)}>
            <option value="portrait">Dikey</option>
            <option value="landscape">Yatay</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Logo</label>
          <button onClick={toggleLogoVisibility} className={`w-10 h-5 rounded-full cursor-pointer border flex items-center px-1 transition-colors duration-300 ${pageOptions.showLogo ? "bg-green-500 border-green-600" : "bg-gray-300 border-gray-400"}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${pageOptions.showLogo ? "translate-x-5" : "translate-x-0"}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
}
