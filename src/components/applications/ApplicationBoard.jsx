
import ApplicationColumn from "./ApplicationColumn";

function ApplicationBoard({
  applications,
  filteredApplications,
  statusColumns,
  onDragStart,
  onUpdateStatus,
  onApplicationClick,
  onDelete,
}) {
  return (
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
              (application) => application.status === column.id
            );

            return (
              <ApplicationColumn
                key={column.id}
                column={column}
                applications={columnApplications}
                statusColumns={statusColumns}
                onDragStart={onDragStart}
                onDrop={(event, columnId) => {
                  event.preventDefault();

                  const applicationId =
                    event.dataTransfer.getData("applicationId");

                  onUpdateStatus(applicationId, columnId);
                }}
                onApplicationClick={onApplicationClick}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ApplicationBoard;
