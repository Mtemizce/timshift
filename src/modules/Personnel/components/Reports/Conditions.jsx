import { React } from "react";
import { PlusCircle, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function Conditions({ conditions, setConditions }) {
 

  const columnOptions = [
    { key: "name", label: "Ad Soyad", type: "text" },
    { key: "tc_no", label: "TC Kimlik No", type: "text" },
    { key: "phone", label: "Telefon", type: "text" },
    { key: "email", label: "E-Posta", type: "text" },
    { key: "birth_date", label: "Doğum Tarihi", type: "text" },
    { key: "children_count", label: "Çocuk Sayısı", type: "text" },
    {
      key: "marital_status",
      label: "Medeni Durum",
      type: "select",
      options: ["Evli", "Bekar", "Boşanmış"],
    },
    { key: "start_date", label: "İşe Giriş Tarihi", type: "text" },
    { key: "address", label: "Adres", type: "text" },
    {
      key: "criminal_record",
      label: "Sicil Kaydı",
      type: "select",
      options: ["Var", "Yok"],
    },
    { key: "department", label: "Departman", type: "text" },
    { key: "role", label: "Görev", type: "text" },
  ];
 

  const handleAdd = () => {
    setConditions([...conditions, { field: "", value: "" }]);
  };

  const handleRemove = (index) => {
    const updated = [...conditions];
    updated.splice(index, 1);
    setConditions(updated);
  };

  const handleChange = (index, key, value) => {
    const updated = [...conditions];
    updated[index][key] = value;
    setConditions(updated);
  };

  return (
    <div className="w-full ">
    
      {open && (
        <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
          {conditions.map((cond, index) => {
            const selectedCol = columnOptions.find((c) => c.label === cond.field);
            return (
              <div key={index} className="flex gap-2 items-center justify-around">
                <select
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={cond.field}
                  onChange={(e) => handleChange(index, "field", e.target.value)}
                >
                  <option value="">Alan Seç</option>
                  {columnOptions.map((col) => (
                    <option key={col.key} value={col.label}>
                      {col.label}
                    </option>
                  ))}
                </select>

                {selectedCol?.type === "select" ? (
                  <select
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={cond.value}
                    onChange={(e) => handleChange(index, "value", e.target.value)}
                  >
                    <option value="">Değer Seç</option>
                    {selectedCol.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={cond.value}
                    onChange={(e) => handleChange(index, "value", e.target.value)}
                    placeholder="Değer girin"
                  />
                )}

                <button onClick={() => handleRemove(index)}>
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}

          <button
            onClick={handleAdd}
            className="flex font-bold text-sm items-center gap-1 text-blue-600 mt-1 cursor-pointer group transition-colors duration-300 "
          >
            <PlusCircle size={16} className="group-hover:text-red-500" />
            Koşul Ekle
          </button>
        </div>
      )}
    </div>
  );
}
