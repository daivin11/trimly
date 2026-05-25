export default function DashboardCards({
  totalRevenue,
  appointmentsCount,
  clientsCount,
  servicesCount,
}) {
  return (
    <section
      className="grid gap-4 mt-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
    >

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 min-h-[88px] flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <p className="text-gray-400">💰 Faturamento</p>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">R$ {totalRevenue}</h3>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 min-h-[88px] flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <p className="text-gray-400">📅 Agendamentos</p>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">{appointmentsCount}</h3>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 min-h-[88px] flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <p className="text-gray-400">👤 Clientes</p>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">{clientsCount}</h3>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 min-h-[88px] flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <p className="text-gray-400">✂️ Serviços</p>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">{servicesCount}</h3>
      </div>

    </section>
  );
}