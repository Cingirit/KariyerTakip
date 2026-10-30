
import ApplicationCard from "./ApplicationCard";

function ApplicationColumn({
  column,
  applications,
  statusColumns,
  onDragStart,
  onDrop,
  onApplicationClick,
  onUpdateStatus,
  onDelete,
}) {
  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => onDrop(event, column.id)}
      className="min-h-64 rounded-xl bg-slate-100 p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <h4 className="font-semibold">{column.title}</h4>

        <span className="rounded-full bg-white px-2 py-1 text-sm text-slate-600">
          {applications.length}
        </span>
      </div>

      <div className="space-y-3">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            statusColumns={statusColumns}
            onDragStart={onDragStart}
            onClick={onApplicationClick}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}

        {applications.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-400">
            Henüz başvuru yok
          </p>
        )}
      </div>
    </div>
  );
}

export default ApplicationColumn;
