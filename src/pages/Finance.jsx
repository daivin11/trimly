export default function Finance({ totalRevenue, appointments }) {
  return (
    <main className="flex-1 p-6 md:p-8 text-white overflow-y-auto">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Financeiro</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Acompanhe faturamento, receitas e o impacto dos agendamentos.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-4 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Agendamentos</p>
            <p className="text-3xl font-bold mt-3">{appointments.length}</p>
          </div>
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Faturamento total</h2>
          <p className="text-5xl font-bold">R$ {totalRevenue}</p>
          <p className="text-gray-400 mt-2">Receita acumulada de todos os agendamentos.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Visão geral</h2>
          <p className="text-gray-400">O financeiro traz os resultados mais recentes do seu negócio.</p>
          <p className="text-3xl font-semibold mt-6">{appointments.length} agendamentos</p>
        </div>
      </section>

      <section className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-2xl font-bold">Relatório de receitas</h2>
          <span className="text-sm text-gray-400">Total de {appointments.length} agendamentos</span>
        </div>

        {appointments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-700 bg-gray-950 p-8 text-center text-gray-400">
            Nenhum agendamento para gerar relatório.
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-gray-950 border border-gray-800 rounded-2xl p-4"
              >
                <p className="font-semibold">{appointment.client.name}</p>
                <p className="text-gray-400">
                  {appointment.service.name} • R$ {appointment.service.price}
                </p>
                <p className="text-gray-500">
                  {appointment.date} às {appointment.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
