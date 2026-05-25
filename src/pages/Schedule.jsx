import AppointmentCard from "../components/AppointmentCard";

export default function Schedule({
  appointments,
  clients,
  services,
  selectedClient,
  setSelectedClient,
  selectedService,
  setSelectedService,
  appointmentDate,
  setAppointmentDate,
  appointmentTime,
  setAppointmentTime,
  addAppointment,
  sendWhatsApp,
  updateAppointmentStatus,
}) {
  const needsData = clients.length === 0 || services.length === 0;

  return (
    <main className="flex-1 p-6 md:p-8 text-white overflow-y-auto">
      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Agenda</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Crie novos horários, acompanhe os próximos agendamentos e confirme com clientes pelo WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-gray-800 bg-gray-900 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Agendamentos</p>
              <p className="text-3xl font-bold mt-3">{appointments.length}</p>
            </div>
            <div className="rounded-3xl border border-gray-800 bg-gray-900 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Clientes</p>
              <p className="text-3xl font-bold mt-3">{clients.length}</p>
            </div>
          </div>
        </div>

        {needsData && (
          <div className="rounded-3xl border border-dashed border-gray-700 bg-gray-950 p-6 text-gray-400">
            <p className="font-semibold text-white">Para criar agendamentos, primeiro cadastre clientes e serviços.</p>
            <p className="mt-2 text-sm">
              Vá para Clientes e Serviços no menu para adicionar os dados necessários.
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <section className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Criar novo agendamento</h2>

          <div className="grid gap-4">
            <select
              className="bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">Selecione o cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>

            <select
              className="bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Selecione o serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - R$ {service.price}
                </option>
              ))}
            </select>

            <input
              className="bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />

            <input
              className="bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />

            <button
              className="mt-2 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
              onClick={addAppointment}
            >
              Criar agendamento
            </button>
          </div>
        </section>

        <section className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Próximos agendamentos</h2>
              <p className="text-gray-400">Veja todos os horários agendados e confirme com clientes.</p>
            </div>
            <span className="text-sm text-gray-400">{appointments.length} registros</span>
          </div>

          {appointments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-700 bg-gray-950 p-8 text-center text-gray-400">
              Nenhum agendamento criado ainda.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  sendWhatsApp={sendWhatsApp}
                  onStatusChange={updateAppointmentStatus}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
