function ApplicationForm({
  onAddApplication,
  initialData = null,
  onUpdateApplication,
}) {
  return (
    <form
      className="mt-6 grid grid-cols-2 gap-5"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const application = {
          id: initialData ? initialData.id : crypto.randomUUID(),
          company: formData.get("company").trim(),
          position: formData.get("position").trim(),
          applicationDate: formData.get("applicationDate"),
          status: formData.get("status"),
          jobUrl: formData.get("jobUrl").trim(),
          notes: formData.get("notes").trim(),
        };

        if (!application.company || !application.position) {
          return;
        }

        if (initialData) {
          onUpdateApplication(application);
        } else {
          onAddApplication(application);
        }

        event.currentTarget.reset();
      }}
    >
      <div>
        <label className="mb-2 block text-sm font-medium">Şirket Adı</label>

        <input
          name="company"
          defaultValue={initialData?.company ?? ""}
          type="text"
          required
          placeholder="Örn. ABC Teknoloji"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Pozisyon</label>

        <input
          name="position"
          defaultValue={initialData?.position ?? ""}
          type="text"
          required
          placeholder="Örn. Junior Software Developer"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Başvuru Tarihi</label>

        <input
          name="applicationDate"
          type="date"
          required
          defaultValue={
            initialData?.applicationDate ??
            new Date().getFullYear() +
              "-" +
              String(new Date().getMonth() + 1).padStart(2, "0") +
              "-" +
              String(new Date().getDate()).padStart(2, "0")
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Başvuru Durumu</label>

        <select
          name="status"
          defaultValue={initialData?.status ?? "applied"}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="applied">Başvuruldu</option>
          <option value="reviewing">İnceleniyor</option>
          <option value="interview">Mülakat</option>
          <option value="offer">Teklif</option>
          <option value="rejected">Reddedildi</option>
        </select>
      </div>

      <div className="col-span-2">
        <label className="mb-2 block text-sm font-medium">
          İlan Bağlantısı (İsteğe Bağlı)
        </label>

        <input
          name="jobUrl"
          defaultValue={initialData?.jobUrl ?? ""}
          type="url"
          placeholder="https://..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="col-span-2">
        <label className="mb-2 block text-sm font-medium">
          Notlar (İsteğe Bağlı)
        </label>

        <textarea
          name="notes"
          defaultValue={initialData?.notes ?? ""}
          rows={3}
          placeholder="Başvuruyla ilgili notlarını buraya yaz..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="col-span-2 justify-self-end rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        {initialData ? "Değişiklikleri Kaydet" : "Başvuruyu Kaydet"}
      </button>
    </form>
  );
}

export default ApplicationForm;
