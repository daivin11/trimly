import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItem = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-2xl px-4 py-3 transition-all duration-200 ${
          isActive
            ? "bg-gray-800 text-white shadow-sm"
            : "text-gray-300 hover:text-white hover:bg-gray-800"
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <aside className="w-full md:w-72 bg-gray-900 p-6 border-b border-gray-800 md:border-b-0 md:border-r">
      <h1 className="text-3xl font-bold">💈 Trimly</h1>
      <p className="text-gray-400 mt-2">Gestão para barbearias</p>

      <nav className="mt-10 flex flex-col gap-3 text-gray-300">
        {navItem("/", "📊 Dashboard")}
        {navItem("/agenda", "📅 Agenda")}
        {navItem("/clientes", "👤 Clientes")}
        {navItem("/servicos", "✂️ Serviços")}
        {navItem("/financeiro", "💰 Financeiro")}
        {navItem("/whatsapp", "💬 WhatsApp")}
      </nav>
    </aside>
  );
}