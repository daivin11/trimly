export default function Services({
  services,
  serviceName,
  setServiceName,
  servicePrice,
  setServicePrice,
  addService,
}) {
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
              onClick={addService}
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
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-950 border border-gray-800 rounded-2xl p-4"
                >
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-gray-400">R$ {service.price}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
