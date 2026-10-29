import { useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import Modal from "../components/Modal";
import ApplicationDetails from "../components/ApplicationDetails";

const statusColumns = [
  { id: "applied", title: "Başvuruldu" },
  { id: "reviewing", title: "İnceleniyor" },
  { id: "interview", title: "Mülakat" },
  { id: "offer", title: "Teklif" },
  { id: "rejected", title: "Reddedildi" },
];

function Applications({ applications, setApplications }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);

  // Yeni: Arama ve filtreleme durumları
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  function handleAddApplication(newApplication) {
    setApplications((currentApplications) => [
      ...currentApplications,
      newApplication,
    ]);
  }

  function handleEditApplication(updatedApplication) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application,
      ),
    );

    setEditingApplication(null);
  }

  function handleDragStart(event, applicationId) {
    event.dataTransfer.setData("applicationId", applicationId);
  }

  function handleDeleteApplication(idToDelete) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== idToDelete,
      ),
    );
  }

  function handleUpdateStatus(idToUpdate, newStatus) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === idToUpdate
          ? { ...application, status: newStatus }
          : application,
      ),
    );
  }

  // Yeni: Arama ve durum filtresini birlikte uygula
  const filteredApplications = applications.filter((application) => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("tr-TR");

    const matchesSearch =
      application.company
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedSearch) ||
      application.position
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="p-4 md:ml-64 md:p-8">
      <header>
        <h2 className="text-3xl font-bold">Başvurularım</h2>
        <p className="mt-2 text-slate-500">
          İş başvurularını tek bir yerden takip et.
        </p>
      </header>

      <div className="mt-8">
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Yeni başvuru
        </button>
      </div>

      {isFormOpen && (
        <Modal title="Yeni başvuru ekle" onClose={() => setIsFormOpen(false)}>
          <ApplicationForm
            onAddApplication={(newApplication) => {
              handleAddApplication(newApplication);
              setIsFormOpen(false);
            }}
          />
        </Modal>
      )}

      {selectedApplication && (
        <ApplicationDetails
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onEdit={() => {
            setEditingApplication(selectedApplication);
            setSelectedApplication(null);
          }}
        />
      )}

      {editingApplication && (
        <Modal
          title="Başvuruyu düzenle"
          onClose={() => setEditingApplication(null)}
        >
          <ApplicationForm
            initialData={editingApplication}
            onAddApplication={handleAddApplication}
            onUpdateApplication={handleEditApplication}
          />
        </Modal>
      )}

      {/* Yeni: Arama ve filtreleme alanı */}
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
              onChange={(event) => setSearchTerm(event.target.value)}
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
              onChange={(event) => setStatusFilter(event.target.value)}
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
            Gösterilen başvuru: {filteredApplications.length} /{" "}
            {applications.length}
          </p>

          {(searchTerm || statusFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Kanban Panosu</h3>

          <span className="text-sm text-slate-500">
            Toplam {applications.length} başvuru
          </span>
        </div>

        {filteredApplications.length === 0 && applications.length > 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-medium text-slate-700">
              Eşleşen başvuru bulunamadı.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Arama kelimeni veya seçtiğin durumu değiştirebilirsin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {statusColumns.map((column) => {
              const columnApplications = filteredApplications.filter(
                (application) => application.status === column.id,
              );

              return (
                <div
                  key={column.id}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();

                    const applicationId =
                      event.dataTransfer.getData("applicationId");

                    handleUpdateStatus(applicationId, column.id);
                  }}
                  className="min-h-64 rounded-xl bg-slate-100 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h4 className="font-semibold">{column.title}</h4>

                    <span className="rounded-full bg-white px-2 py-1 text-sm text-slate-600">
                      {columnApplications.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {columnApplications.map((application) => (
                      <div
                        key={application.id}
                        draggable={true}
                        onDragStart={(event) =>
                          handleDragStart(event, application.id)
                        }
                        onClick={() => setSelectedApplication(application)}
                        className="cursor-grab rounded-lg border border-slate-200 bg-white p-4 shadow-sm active:cursor-grabbing"
                      >
                        <h5 className="font-semibold">{application.company}</h5>

                        <p className="mt-1 text-sm text-slate-600">
                          {application.position}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          {application.applicationDate}
                        </p>

                        <select
                          value={application.status}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            handleUpdateStatus(
                              application.id,
                              event.target.value,
                            )
                          }
                          className="mt-3 w-full rounded-lg border border-slate-300 px-2 py-2 text-sm"
                        >
                          {statusColumns.map((status) => (
                            <option key={status.id} value={status.id}>
                              {status.title}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteApplication(application.id);
                          }}
                          className="mt-3 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Sil
                        </button>
                      </div>
                    ))}

                    {columnApplications.length === 0 && (
                      <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-400">
                        Henüz başvuru yok
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Applications;
