import { React } from "react";

export default function CustomPageTitle({ customPageTitle, setCustomPageTitle }) {
  const updatePagetitle = (field, value) => {
    const updated = { ...customPageTitle, [field]: value };
    setCustomPageTitle(updated);
    localStorage.setItem("personnel-report-page-title", JSON.stringify(updated));
  };

  const togglePageTitleVisibility = () => {
    updatePagetitle("showTitle", !customPageTitle.showTitle);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center space-x-4 cursor-pointer my-4  p-2">
        <h3 onClick={togglePageTitleVisibility} className="text-sm font-semibold text-gray-700 dark:text-white">
          Özel Üst Başlık {customPageTitle.showTitle ? "Açık" : "Kapalı"}
        </h3>
        <button onClick={togglePageTitleVisibility} className={`w-10 h-5 rounded-full cursor-pointer border flex items-center px-1 transition-colors duration-300 ${customPageTitle.showTitle ? "bg-green-500 border-green-600" : "bg-gray-300 border-gray-400"}`}>
          <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${customPageTitle.showTitle ? "translate-x-5" : "translate-x-0"}`}></div>
        </button>
      </div>
      
        <div className="my-2 p-4 bg-white  rounded-md shadow-md dark:bg-gray-800 mb-2">
          
            <div className="flex flex-col">
              <label className="text-sm font-medium block mb-1">Üst Başlık Metni</label>
              <textarea
                className="w-full ring-2 ring-gray-300 focus:outline-none  focus:ring-gray-400/75  rounded px-2 py-1 text-sm"
                rows={3}
                value={customPageTitle.text}
                onChange={(e) => updatePagetitle("text", e.target.value)}
                style={{
                  backgroundColor: customPageTitle.bgColor || "#fff",
                  color: customPageTitle.textColor || "#000",
                }}
              />
            </div>

            <div className="flex justify-around items-center gap-4 flex-wrap">
              <div>
                <label className="text-sm font-medium block mb-1">Yazı Boyutu</label>
                <input type="number" min={10} className="border rounded px-2 py-1 w-20 text-sm" value={customPageTitle.fontSize} onChange={(e) => updatePagetitle("fontSize", parseInt(e.target.value))} />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Hizalama</label>
                <select className="border rounded px-2 py-1 text-sm" value={customPageTitle.align} onChange={(e) => updatePagetitle("align", e.target.value)}>
                  <option value="left">Sola</option>
                  <option value="center">Ortala</option>
                  <option value="right">Sağa</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Yazı Rengi</label>
                <input type="color" className="w-10 h-8 p-0" value={customPageTitle.textColor || "#000000"} onChange={(e) => updatePagetitle("textColor", e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Arka Plan</label>
                <input type="color" className="w-10 h-8 p-0" value={customPageTitle.bgColor || "#ffffff"} onChange={(e) => updatePagetitle("bgColor", e.target.value)} />
              </div>
            </div>
       
        </div>
   
    </div>
  );
}
