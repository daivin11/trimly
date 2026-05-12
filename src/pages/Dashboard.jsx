import DashboardCards from "../components/DashboardCards";
import { Link } from "react-router-dom";

export default function Dashboard({
  totalRevenue,
  appointments,
  clients,
  services,
}) {
  const hasData = appointments.length > 0 || clients.length > 0 || services.length > 0;

  return (
    <main className="flex-1 p-6 md:p-8 overflow-y-auto text-white">
      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Visão geral dos seus clientes, serviços, agendamentos e faturamento.
            </p>
          </div>

          <Link
            to="/agenda"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-black font-semibold shadow-sm transition hover:bg-gray-200"
          >
            Novo agendamento
          </Link>
        </div>

        <DashboardCards
          totalRevenue={totalRevenue}
          appointmentsCount={appointments.length}
          clientsCount={clients.length}
          servicesCount={services.length}
        />
      </div>

      <section className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Resumo rápido</h3>
            <p className="text-gray-400 mt-2 max-w-2xl">
              {hasData
                ? "Seu sistema está ativo. Use a agenda e os cadastros para continuar crescendo."
                : "Nenhum dado cadastrado ainda. Comece adicionando clientes e serviços para criar agendamentos."}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-4 text-sm text-gray-400">
            {appointments.length === 0 && <p>Agenda vazia</p>}
            {clients.length === 0 && <p>Clientes não cadastrados</p>}
            {services.length === 0 && <p>Serviços não cadastrado</p>}
            {hasData && <p>Tudo funcionando normalmente.</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
