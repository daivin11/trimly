export default function DashboardCards({
  totalRevenue,
  appointmentsCount,
  clientsCount,
  servicesCount,
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-400">💰 Faturamento</p>
        <h3 className="text-3xl font-bold mt-3">
          R$ {totalRevenue}
        </h3>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-400">📅 Agendamentos</p>
        <h3 className="text-3xl font-bold mt-3">
          {appointmentsCount}
        </h3>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-400">👤 Clientes</p>
        <h3 className="text-3xl font-bold mt-3">
          {clientsCount}
        </h3>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-400">✂️ Serviços</p>
        <h3 className="text-3xl font-bold mt-3">
          {servicesCount}
        </h3>
      </div>

    </section>
  );
}