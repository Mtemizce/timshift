export default function PersonnelForm({ form, onChange, onSubmit, onCancel }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border p-4 rounded shadow space-y-4 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Ad Soyad</label>
          <input
            name="name"
            value={form.name || ''}
            onChange={onChange}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">TC Kimlik No</label>
          <input
            name="tc_no"
            value={form.tc_no || ''}
            onChange={onChange}
            className="w-full border p-2"
            maxLength={11}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Telefon</label>
          <input
            name="phone"
            value={form.phone || ''}
            onChange={onChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Medeni Hâl</label>
          <select
            name="marital_status"
            value={form.marital_status || ''}
            onChange={onChange}
            className="w-full border p-2"
          >
            <option value="">Seçiniz</option>
            <option value="Bekar">Bekar</option>
            <option value="Evli">Evli</option>
            <option value="Boşanmış">Boşanmış</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Çocuk Sayısı</label>
          <input
            type="number"
            name="children_count"
            value={form.children_count || 0}
            onChange={onChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Ehliyet</label>
          <input
            name="driving_license"
            value={form.driving_license || ''}
            onChange={onChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Öğrenim Durumu</label>
          <input
            name="education_level"
            value={form.education_level || ''}
            onChange={onChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">IBAN</label>
          <input
            name="iban"
            value={form.iban || ''}
            onChange={onChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Birim</label>
          <input
            name="department"
            value={form.department || ''}
            onChange={onChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Sertifikalar</label>
          <input
            name="certificates"
            value={form.certificates || ''}
            onChange={onChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">İşe Giriş Tarihi</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date || ''}
            onChange={onChange}
            className="w-full border p-2"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kaydet
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
