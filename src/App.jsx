import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Finance from "./pages/Finance";
import Schedule from "./pages/Schedule";
import WhatsApp from "./pages/WhatsApp";

export default function App() {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  function addClient() {
    if (!clientName || !clientPhone) {
      alert("Preencha nome e telefone do cliente");
      return;
    }

    const newClient = {
      id: Date.now(),
      name: clientName,
      phone: clientPhone,
    };

    setClients([...clients, newClient]);
    setClientName("");
    setClientPhone("");
  }

  function addService() {
    if (!serviceName || !servicePrice) {
      alert("Preencha nome e preço do serviço");
      return;
    }

    const newService = {
      id: Date.now(),
      name: serviceName,
      price: Number(servicePrice),
    };

    setServices([...services, newService]);
    setServiceName("");
    setServicePrice("");
  }

  function addAppointment() {
    if (!selectedClient || !selectedService || !appointmentDate || !appointmentTime) {
      alert("Preencha todos os dados do agendamento");
      return;
    }

    const client = clients.find((client) => client.id === Number(selectedClient));
    const service = services.find((service) => service.id === Number(selectedService));

    const newAppointment = {
      id: Date.now(),
      client,
      service,
      date: appointmentDate,
      time: appointmentTime,
      status: "agendado",
    };

    setAppointments([...appointments, newAppointment]);
    setSelectedClient("");
    setSelectedService("");
    setAppointmentDate("");
    setAppointmentTime("");
  }

  function sendWhatsApp(appointment) {
    const phone = appointment.client.phone;
    const message = `Fala, ${appointment.client.name}! 💈 Passando pra lembrar do seu horário dia ${appointment.date} às ${appointment.time}. Confirma pra mim?`;

    const url = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  const totalRevenue = appointments.reduce((total, appointment) => {
    return total + appointment.service.price;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      <Sidebar />

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              totalRevenue={totalRevenue}
              appointments={appointments}
              clients={clients}
              services={services}
            />
          }
        />

        <Route
          path="/clientes"
          element={
            <Clients
              clients={clients}
              clientName={clientName}
              setClientName={setClientName}
              clientPhone={clientPhone}
              setClientPhone={setClientPhone}
              addClient={addClient}
            />
          }
        />
        <Route
          path="/servicos"
          element={
            <Services
              services={services}
              serviceName={serviceName}
              setServiceName={setServiceName}
              servicePrice={servicePrice}
              setServicePrice={setServicePrice}
              addService={addService}
            />
          }
        />
        <Route
          path="/financeiro"
          element={
            <Finance
              totalRevenue={totalRevenue}
              appointments={appointments}
            />
          }
        />
        <Route
          path="/agenda"
          element={
            <Schedule
              appointments={appointments}
              clients={clients}
              services={services}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              appointmentDate={appointmentDate}
              setAppointmentDate={setAppointmentDate}
              appointmentTime={appointmentTime}
              setAppointmentTime={setAppointmentTime}
              addAppointment={addAppointment}
              sendWhatsApp={sendWhatsApp}
            />
          }
        />
        <Route path="/whatsapp" element={<WhatsApp />} />
      </Routes>
    </div>
  );
}