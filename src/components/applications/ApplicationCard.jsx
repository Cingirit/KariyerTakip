
function ApplicationCard({
  application,
  statusColumns,
  onDragStart,
  onClick,
  onUpdateStatus,
  onDelete,
}) {
  return (
    <div
      draggable={true}
      onDragStart={(event) => onDragStart(event, application.id)}
      onClick={() => onClick(application)}
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
          onUpdateStatus(application.id, event.target.value)
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
          onDelete(application.id);
        }}
        className="mt-3 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        Sil
      </button>
    </div>
  );
}

export default ApplicationCard;
