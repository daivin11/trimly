import { useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const normalizeSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/(^-|-$)/g, "");

export default function ProfileSettings() {
  const { user, profile, updateProfile, isSlugAvailable } = useAuth();
  const [barbershopName, setBarbershopName] = useState(profile?.barbershopName || "");
  const [slug, setSlug] = useState(profile?.slug || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [slugError, setSlugError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [slugChecking, setSlugChecking] = useState(false);
  const [saving, setSaving] = useState(false);

  const normalizedSlug = useMemo(() => normalizeSlug(slug || ""), [slug]);
  const previewUrl = normalizedSlug ? `${window.location.origin}/${normalizedSlug}` : "";

  const handleSlugBlur = async () => {
    if (!normalizedSlug) {
      setSlug("");
      setSlugError("O slug nao pode ficar vazio.");
      return;
    }

    setSlug(normalizedSlug);
    setSlugChecking(true);
    setSaveError("");

    try {
      const available = await isSlugAvailable(normalizedSlug, user?.uid);
      setSlugError(available ? "" : "Este slug ja esta em uso.");
    } catch (error) {
      console.error(error);
      setSlugError("Nao foi possivel verificar o slug.");
    } finally {
      setSlugChecking(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = barbershopName.trim();
    const trimmedPhone = phone.trim();
    const trimmedBio = bio.trim();

    if (!trimmedName || !normalizedSlug || !trimmedPhone) {
      setSaveError("Preencha nome da barbearia, slug e telefone.");
      setSaveSuccess("");
      return;
    }

    if (slugError) {
      setSaveError("Corrija o slug antes de salvar.");
      setSaveSuccess("");
      return;
    }

    setSaving(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const available = await isSlugAvailable(normalizedSlug, user?.uid);
      if (!available) {
      setSlugError("Este slug ja esta em uso.");
        setSaveError("Escolha outro slug publico.");
        return;
      }

      await updateProfile({
        barbershopName: trimmedName,
        slug: normalizedSlug,
        phone: trimmedPhone,
        bio: trimmedBio,
        profileComplete: true,
        updatedAt: new Date(),
      });

      setSlug(normalizedSlug);
      setSaveSuccess("Perfil da barbearia salvo com sucesso.");
    } catch (error) {
      console.error(error);
      setSaveError("Erro ao salvar o perfil. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 text-white md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Perfil publico</p>
            <h2 className="mt-3 text-3xl font-bold">Configuracoes da barbearia</h2>
            <p className="mt-2 max-w-2xl text-gray-400">
              Edite os dados exibidos no link publico e no painel da sua equipe.
            </p>
          </div>
          {previewUrl && (
            <a
              href={`/${normalizedSlug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Abrir pagina publica
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm md:p-8">
            <div className="grid gap-5">
              <label className="block">
                <span className="text-sm text-gray-300">Nome da barbearia</span>
                <input
                  value={barbershopName}
                  onChange={(event) => setBarbershopName(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-gray-800 bg-gray-950 p-4 text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Ex: Barbearia Central"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Slug publico</span>
                <div className="mt-2 flex flex-col gap-2 rounded-3xl border border-gray-800 bg-gray-950 p-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 sm:flex-row sm:items-center">
                  <span className="shrink-0 text-gray-500">{window.location.origin}/</span>
                  <input
                    value={slug}
                    onBlur={handleSlugBlur}
                    onChange={(event) => setSlug(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-gray-500"
                    placeholder="nome-da-barbearia"
                  />
                </div>
                <div className="mt-2 min-h-5 text-sm">
                  {slugChecking && <p className="text-indigo-300">Verificando disponibilidade...</p>}
                  {slugError && <p className="text-red-400">{slugError}</p>}
                  {!slugChecking && !slugError && normalizedSlug && (
                    <p className="text-green-300">Slug disponivel: {previewUrl}</p>
                  )}
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Telefone</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-gray-800 bg-gray-950 p-4 text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="(11) 98765-4321"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Bio</span>
                <textarea
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  className="mt-2 min-h-[160px] w-full rounded-3xl border border-gray-800 bg-gray-950 p-4 text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Conte em poucas linhas o estilo, especialidades e experiencia da sua barbearia."
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-h-5 text-sm">
                {saveError && <p className="text-red-400">{saveError}</p>}
                {saveSuccess && <p className="text-green-400">{saveSuccess}</p>}
              </div>
              <button
                type="submit"
                disabled={saving || slugChecking}
                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar configuracoes"}
              </button>
            </div>
          </section>

          <aside className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm md:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Previa</p>
            <div className="mt-5 rounded-3xl border border-gray-800 bg-gray-950 p-5">
              <p className="text-xl font-bold text-white">{barbershopName.trim() || "Sua barbearia"}</p>
              <p className="mt-2 break-all text-sm text-indigo-300">
                {normalizedSlug ? `/${normalizedSlug}` : "/seu-slug"}
              </p>
              <p className="mt-4 text-sm text-gray-400">{phone.trim() || "Telefone ainda nao informado"}</p>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {bio.trim() || "Adicione uma bio curta para aparecer na pagina publica."}
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
