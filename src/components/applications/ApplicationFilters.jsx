
function ApplicationFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  statusColumns,
  filteredCount,
  totalCount,
  onClearFilters,
}) {
  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="application-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Başvuru ara
          </label>

          <input
            id="application-search"
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Şirket veya pozisyon ara..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="status-filter"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Başvuru durumu
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">Tüm durumlar</option>

            {statusColumns.map((status) => (
              <option key={status.id} value={status.id}>
                {status.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Gösterilen başvuru: {filteredCount} / {totalCount}
        </p>

        {(searchTerm || statusFilter !== "all") && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Filtreleri temizle
          </button>
        )}
      </div>
    </section>
  );
}

export default ApplicationFilters;
