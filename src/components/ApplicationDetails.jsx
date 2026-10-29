import Modal from "./Modal";

function ApplicationDetails({ application, onClose, onEdit }) {
  return (
    <Modal title="Başvuru Detayları" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">Şirket</p>
          <p className="font-semibold">{application.company}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Pozisyon</p>
          <p className="font-semibold">{application.position}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Başvuru Tarihi</p>
          <p>{application.applicationDate || "Belirtilmedi"}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Durum</p>
          <p>{application.status}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">İlan Bağlantısı</p>
          {application.jobUrl ? (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-blue-600 hover:underline"
            >
              {application.jobUrl}
            </a>
          ) : (
            <p>Bağlantı eklenmemiş</p>
          )}
        </div>

        <div>
          <p className="text-sm text-slate-500">Notlar</p>
          <p className="whitespace-pre-wrap">
            {application.notes || "Not eklenmemiş"}
          </p>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Düzenle
        </button>
      </div>
    </Modal>
  );
}

export default ApplicationDetails;
