export default function AppointmentCard({
  appointment,
  sendWhatsApp,
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
      
      <div>
        <strong>{appointment.client.name}</strong>

        <p className="text-gray-400 mt-1">
          {appointment.service.name} • R$ {appointment.service.price}
        </p>

        <p className="text-gray-500">
          {appointment.date} às {appointment.time}
        </p>
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition"
        onClick={() => sendWhatsApp(appointment)}
      >
        WhatsApp
      </button>

    </div>
  );
}