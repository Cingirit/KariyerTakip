import { useState } from "react";

import ApplicationForm from "../components/ApplicationForm";
import Modal from "../components/Modal";
import ApplicationDetails from "../components/ApplicationDetails";
import ApplicationBoard from "../components/applications/ApplicationBoard";
import ApplicationFilters from "../components/applications/ApplicationFilters";
import useApplications from "../hooks/useApplications";
import applicationStatuses from "../constants/applicationStatuses";

function Applications({ applications, setApplications }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredApplications,
    handleAddApplication,
    handleEditApplication,
    handleDeleteApplication,
    handleUpdateStatus,
  } = useApplications({ applications, setApplications });

  function handleDragStart(event, applicationId) {
    event.dataTransfer.setData("applicationId", applicationId);
  }

  return (
    <main className="p-4 md:ml-64 md:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Başvurularım</h2>

          <p className="mt-2 text-slate-500">
            İş başvurularını tek bir yerden takip et.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Yeni Başvuru
        </button>
      </header>

      {/* Yeni başvuru modalı */}
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

      {/* Başvuru detayları */}
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

      {/* Başvuru düzenleme modalı */}
      {editingApplication && (
        <Modal
          title="Başvuruyu düzenle"
          onClose={() => setEditingApplication(null)}
        >
          <ApplicationForm
            initialData={editingApplication}
            onAddApplication={handleAddApplication}
            onUpdateApplication={(updatedApplication) => {
              handleEditApplication(updatedApplication);
              setEditingApplication(null);
            }}
          />
        </Modal>
      )}

      {/* Arama ve filtreleme */}
      <ApplicationFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusColumns={applicationStatuses}
        filteredCount={filteredApplications.length}
        totalCount={applications.length}
        onClearFilters={() => {
          setSearchTerm("");
          setStatusFilter("all");
        }}
      />

      {/* Kanban panosu */}
      <ApplicationBoard
        applications={applications}
        filteredApplications={filteredApplications}
        statusColumns={applicationStatuses}
        onDragStart={handleDragStart}
        onUpdateStatus={handleUpdateStatus}
        onApplicationClick={setSelectedApplication}
        onDelete={handleDeleteApplication}
      />
    </main>
  );
}

export default Applications;
