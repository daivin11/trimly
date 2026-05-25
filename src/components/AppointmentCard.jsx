export default function AppointmentCard({
  appointment,
  sendWhatsApp,
  onStatusChange,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/40 text-yellow-300 border border-yellow-700";
      case "confirmed":
        return "bg-blue-900/40 text-blue-300 border border-blue-700";
      case "completed":
        return "bg-emerald-900/40 text-emerald-300 border border-emerald-700";
      case "cancelled":
        return "bg-red-900/40 text-red-300 border border-red-700";
      default:
        return "bg-gray-800 text-gray-300";
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Pendente",
      confirmed: "Confirmado",
      completed: "Concluído",
      cancelled: "Cancelado",
    };
    return labels[status] || status;
  };

  const currentStatus = appointment.status || "pending";

  return (
    <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <strong>{appointment.client?.name || appointment.clientName || "Cliente"}</strong>

          <p className="text-gray-400 mt-1">
            {appointment.service?.name || "Serviço"} •{" "}
            {appointment.service?.price || appointment.service ? `R$ ${appointment.service.price}` : ""}
          </p>

          <p className="text-gray-500 text-sm">
            {appointment.date} às {appointment.time}
          </p>
        </div>

        <span className={`rounded-2xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap ${getStatusColor(currentStatus)}`}>
          {getStatusLabel(currentStatus)}
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {onStatusChange && (
            <select
              value={currentStatus}
              onChange={(e) => onStatusChange(appointment.id, e.target.value)}
              className="text-xs bg-gray-950 border border-gray-800 rounded-2xl px-3 py-2 outline-none"
            >
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>
          )}
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition text-sm"
          onClick={() => sendWhatsApp(appointment)}
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
}