import { useState } from "react";

export default function Services({ services, appointments = [], addService, updateService, deleteService }) {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [confirmDeleteService, setConfirmDeleteService] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleAdd = async () => {
    if (!serviceName || !servicePrice) {
      alert("Preencha nome e preço do serviço");
      return;
    }

    await addService(serviceName, servicePrice);
    setServiceName("");
    setServicePrice("");
  };

  const openEdit = (service) => {
    setEditingService(service);
    setEditName(service.name);
    setEditPrice(String(service.price));
    setStatusMessage("");
  };

  const closeEdit = () => {
    setEditingService(null);
    setEditName("");
    setEditPrice("");
    setStatusMessage("");
  };

  const handleEditSave = async () => {
    if (!editName || !editPrice) {
      alert("Preencha nome e preço do serviço");
      return;
    }

    await updateService(editingService.id, {
      name: editName,
      price: Number(editPrice),
    });

    setStatusMessage("Serviço atualizado com sucesso.");
    setTimeout(closeEdit, 800);
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parsed = new Date(dateString);
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  };

  const isFutureAppointment = (apt) => {
    const aptDate = parseDate(apt.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return aptDate && aptDate >= today;
  };

  const futureAppointmentsForService = (serviceId) => {
    return appointments.filter(
      (apt) =>
        apt.service && String(apt.service.id) === String(serviceId) && isFutureAppointment(apt)
    );
  };

  const openDeleteConfirmation = (service) => {
    setConfirmDeleteService(service);
  };

  const handleDeleteConfirmed = async () => {
    if (!confirmDeleteService) return;

    const futureAppointments = futureAppointmentsForService(confirmDeleteService.id);
    if (futureAppointments.length > 0) {
      return;
    }

    await deleteService(confirmDeleteService.id);
    setConfirmDeleteService(null);
  };

  const deleteWarning = confirmDeleteService ? futureAppointmentsForService(confirmDeleteService.id) : [];

  return (
    <main className="flex-1 p-6 md:p-8 text-white overflow-y-auto">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Serviços</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Cadastre e controle os serviços oferecidos na sua barbearia.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-4 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Total</p>
            <p className="text-3xl font-bold mt-3">{services.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <section className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Cadastrar serviço</h2>

          <div className="grid gap-4">
            <input
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              placeholder="Ex: Corte"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />

            <input
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              type="number"
              placeholder="Preço"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
            />

            <button
              className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
              onClick={handleAdd}
            >
              Adicionar serviço
            </button>
          </div>
        </section>

        <section className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Lista de serviços</h2>
              <p className="text-gray-400">Serviços prontos para serem usados na agenda e no faturamento.</p>
            </div>
            <span className="text-sm text-gray-400">{services.length} serviços</span>
          </div>

          {services.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-700 bg-gray-950 p-8 text-center text-gray-400">
              Nenhum serviço cadastrado ainda.
            </div>
          ) : (
            <div className="grid gap-4">
              {services.map((service) => {
                const hasFuture = futureAppointmentsForService(service.id).length > 0;
                return (
                  <div key={service.id} className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-semibold text-white">{service.name}</p>
                        <p className="text-gray-400">R$ {service.price}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => openEdit(service)}
                          className="rounded-2xl border border-indigo-500 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/15"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteConfirmation(service)}
                          className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                            hasFuture
                              ? "border-gray-700 bg-gray-900 text-gray-400 cursor-not-allowed"
                              : "border-red-500 bg-red-500/10 text-red-300 hover:bg-red-500/15"
                          }`}
                          disabled={hasFuture}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                    {hasFuture && (
                      <p className="mt-3 text-sm text-yellow-300">
                        Este serviço tem agendamentos futuros e não pode ser excluído.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-xl rounded-3xl border border-gray-800 bg-gray-950 p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">Editar serviço</h3>
                <p className="text-gray-400 mt-1">Atualize nome e preço do serviço selecionado.</p>
              </div>
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-full border border-gray-700 bg-gray-900 px-3 py-2 text-gray-300 hover:border-white/20"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <input
                className="w-full rounded-3xl border border-gray-800 bg-gray-950 p-4 outline-none"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Nome do serviço"
              />
              <input
                className="w-full rounded-3xl border border-gray-800 bg-gray-950 p-4 outline-none"
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                placeholder="Preço"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-3xl border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                className="rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Salvar alterações
              </button>
            </div>
            {statusMessage && <p className="mt-4 text-sm text-emerald-300">{statusMessage}</p>}
          </div>
        </div>
      )}

      {confirmDeleteService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-lg rounded-3xl border border-gray-800 bg-gray-950 p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">Excluir serviço</h3>
              <p className="text-gray-400 mt-2">
                Tem certeza de que deseja excluir <span className="font-semibold text-white">{confirmDeleteService.name}</span>?
              </p>
            </div>

            {deleteWarning.length > 0 ? (
              <div className="rounded-3xl border border-yellow-500 bg-yellow-950 p-4 text-yellow-200">
                <p className="font-semibold">Excluir bloqueado</p>
                <p className="mt-2 text-sm">
                  Há {deleteWarning.length} agendamento(s) futuro(s) usando este serviço. Remova ou altere esses agendamentos antes de excluir.
                </p>
              </div>
            ) : (
              <div className="rounded-3xl border border-gray-800 bg-gray-900 p-4 text-sm text-gray-300">
                Este serviço será excluído permanentemente. Esta ação não pode ser desfeita.
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmDeleteService(null)}
                className="rounded-3xl border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                disabled={deleteWarning.length > 0}
                className={`rounded-3xl px-6 py-3 text-sm font-semibold transition ${
                  deleteWarning.length > 0
                    ? "border border-gray-700 bg-gray-900 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Confirmar exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
