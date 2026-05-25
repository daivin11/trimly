import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, query, where, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Barbers() {
  const { user } = useAuth();
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editingBarber, setEditingBarber] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    loadBarbers();
  }, [user]);

  const loadBarbers = async () => {
    setLoading(true);
    try {
      const barbersQuery = query(collection(db, "barbers"), where("ownerId", "==", user.uid));
      const barbersSnapshot = await getDocs(barbersQuery);
      const barbersList = barbersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBarbers(barbersList);
    } catch (error) {
      console.error("Error loading barbers:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setSpecialty("");
    setAvatar("");
    setEditingBarber(null);
    setStatusMessage("");
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Preencha o nome do barbeiro.");
      return;
    }

    const barberData = {
      name: name.trim(),
      specialty: specialty.trim(),
      avatar: avatar.trim(),
      ownerId: user.uid,
      updatedAt: new Date(),
    };

    try {
      if (editingBarber) {
        const barberRef = doc(db, "barbers", editingBarber.id);
        await updateDoc(barberRef, barberData);
        setBarbers((prev) => prev.map((barber) => (barber.id === editingBarber.id ? { ...barber, ...barberData } : barber)));
        setStatusMessage("Barbeiro atualizado com sucesso.");
      } else {
        const docRef = await addDoc(collection(db, "barbers"), {
          ...barberData,
          createdAt: new Date(),
        });
        setBarbers((prev) => [{ id: docRef.id, ...barberData }, ...prev]);
        setStatusMessage("Barbeiro cadastrado com sucesso.");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving barber:", error);
      alert("Erro ao salvar barbeiro. Tente novamente.");
    }
  };

  const handleEdit = (barber) => {
    setEditingBarber(barber);
    setName(barber.name || "");
    setSpecialty(barber.specialty || "");
    setAvatar(barber.avatar || "");
    setStatusMessage("");
  };

  const handleDelete = async (barberId) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este barbeiro?");
    if (!confirmed) return;

    try {
      const barberRef = doc(db, "barbers", barberId);
      await deleteDoc(barberRef);
      setBarbers((prev) => prev.filter((barber) => barber.id !== barberId));
      if (editingBarber?.id === barberId) {
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting barber:", error);
      alert("Erro ao excluir barbeiro. Tente novamente.");
    }
  };

  return (
    <main className="flex-1 p-6 md:p-8 text-white overflow-y-auto">
      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Equipe de barbeiros</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Cadastre, edite e gerencie os barbeiros que atendem na sua barbearia.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-4 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Equipe</p>
            <p className="text-3xl font-bold mt-3">{loading ? "..." : barbers.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <section className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Cadastrar barbeiro</h2>
              <p className="text-gray-400 mt-2">Adicione um novo barbeiro à sua equipe.</p>
            </div>
            {editingBarber && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl border border-gray-700 bg-gray-950 px-4 py-2 text-sm text-gray-300 hover:border-white"
              >
                Cancelar edição
              </button>
            )}
          </div>

          <div className="grid gap-4">
            <input
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              placeholder="Nome do barbeiro"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              placeholder="Especialidade"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
            <input
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 outline-none"
              placeholder="URL do avatar (opcional)"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSave}
              className="w-full rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              {editingBarber ? "Salvar alterações" : "Adicionar barbeiro"}
            </button>
            {statusMessage && <p className="text-sm text-emerald-300">{statusMessage}</p>}
          </div>
        </section>

        <section className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Barbeiros cadastrados</h2>
              <p className="text-gray-400 mt-2">Sua equipe e fila de atendimento.</p>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-gray-400">
              {loading ? "Carregando..." : `${barbers.length} cadastrados`}
            </span>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-dashed border-gray-700 bg-gray-950 p-8 text-center text-gray-400">
              Carregando barbeiros...
            </div>
          ) : barbers.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-700 bg-gray-950 p-8 text-center text-gray-400">
              Nenhum barbeiro cadastrado ainda.
            </div>
          ) : (
            <div className="grid gap-4">
              {barbers.map((barber) => (
                <div key={barber.id} className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center text-2xl text-indigo-300">
                      {barber.avatar ? (
                        <img src={barber.avatar} alt={barber.name} className="h-16 w-16 rounded-3xl object-cover" />
                      ) : (
                        barber.name?.split(" ").map((word) => word[0]).join("")
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{barber.name}</p>
                      <p className="text-sm text-gray-400">{barber.specialty || "Especialista"}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(barber)}
                      className="rounded-2xl border border-indigo-500 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 hover:bg-indigo-500/15"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(barber.id)}
                      className="rounded-2xl border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/15"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
