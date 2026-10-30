
import { useState } from "react";

function useApplications({ applications, setApplications }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Yeni başvuru ekleme
  function handleAddApplication(newApplication) {
    setApplications((currentApplications) => [
      ...currentApplications,
      newApplication,
    ]);
  }

  // Başvuru düzenleme
  function handleEditApplication(updatedApplication) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application
      )
    );
  }

  // Başvuru silme
  function handleDeleteApplication(idToDelete) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== idToDelete
      )
    );
  }

  // Başvuru durumunu değiştirme
  function handleUpdateStatus(idToUpdate, newStatus) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === idToUpdate
          ? { ...application, status: newStatus }
          : application
      )
    );
  }

  // Başvuru arama ve filtreleme
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

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredApplications,
    handleAddApplication,
    handleEditApplication,
    handleDeleteApplication,
    handleUpdateStatus,
  };
}

export default useApplications;
