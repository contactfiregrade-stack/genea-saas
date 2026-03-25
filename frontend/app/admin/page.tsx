import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--foreground)]">
      <header className="border-b border-white/10 bg-[var(--nav-bg)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-lg font-semibold">Genea</p>
            <p className="text-xs text-slate-400">Assistant de recherche généalogique</p>
          </div>

          <nav className="hidden gap-2 md:flex">
            <Link className="nav-item" href="/">
              Recherche
            </Link>
            <Link className="nav-item" href="/dossiers">
              Dossiers
            </Link>
            <Link className="nav-item" href="/historique">
              Historique
            </Link>
            <Link className="nav-item" href="/sources">
              Sources
            </Link>
            <Link className="nav-item nav-item-active" href="/admin">
              Admin
            </Link>
          </nav>

          <span className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
            V1
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="page-card">
          <p className="section-kicker">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Tableau de bord</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            Cette zone servira à suivre l’activité de la plateforme, la qualité des sources,
            et l’évolution du moteur de recherche.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="page-card">
            <p className="field-label">Recherches</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">—</p>
            <p className="mt-2 text-sm text-slate-500">Volume quotidien à venir</p>
          </div>

          <div className="page-card">
            <p className="field-label">Utilisateurs</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">—</p>
            <p className="mt-2 text-sm text-slate-500">Suivi des profils à venir</p>
          </div>

          <div className="page-card">
            <p className="field-label">Sources</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">—</p>
            <p className="mt-2 text-sm text-slate-500">Qualité et couverture à venir</p>
          </div>
        </div>
      </div>
    </main>
  );
}
