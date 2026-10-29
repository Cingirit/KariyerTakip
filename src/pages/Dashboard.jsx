import StatCard from "../components/StatCard";
import { useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import Modal from "../components/Modal";

function Dashboard({ applications, setApplications }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      {isFormOpen && (
        <Modal title="Yeni başvuru ekle" onClose={() => setIsFormOpen(false)}>
          <ApplicationForm
            onAddApplication={(newApplication) => {
              setApplications((currentApplications) => [
                ...currentApplications,
                newApplication,
              ]);

              setIsFormOpen(false);
            }}
          />
        </Modal>
      )}
     <main className="p-4 md:ml-64 md:p-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Genel Bakış</h2>

            <p className="mt-2 text-slate-500">
              Kariyer yolculuğunu buradan takip et.
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

        <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Toplam Başvuru" value={applications.length} />

          <StatCard
            title="Görüşmeler"
            value={
              applications.filter(
                (application) => application.status === "interview",
              ).length
            }
          />

          <StatCard
            title="Teklifler"
            value={
              applications.filter(
                (application) => application.status === "offer",
              ).length
            }
          />
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Son Başvurular</h3>

          {applications.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-medium text-slate-700">
                Henüz başvurun bulunmuyor.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                İlk başvurunu ekleyerek başlayabilirsin.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {[...applications]
                .reverse()
                .slice(0, 5)
                .map((application) => (
                  <div
                    key={application.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition duration-200 hover:border-blue-200 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-900">
                          {application.company}
                        </h4>

                        <p className="mt-1 text-sm text-slate-600">
                          {application.position}
                        </p>

                        {application.jobUrl && (
                          <a
                            href={application.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            İlan bağlantısını aç ↗
                          </a>
                        )}
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                        <span className="text-xs text-slate-500">
                          {application.applicationDate}
                        </span>

                        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {application.status === "applied"
                            ? "Başvuruldu"
                            : application.status === "reviewing"
                              ? "İnceleniyor"
                              : application.status === "interview"
                                ? "Mülakat"
                                : application.status === "offer"
                                  ? "Teklif"
                                  : application.status === "rejected"
                                    ? "Reddedildi"
                                    : application.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Dashboard;
