import Link from "next/link";

export default function DossiersPage() {
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
            <Link className="nav-item nav-item-active" href="/dossiers">
              Dossiers
            </Link>
            <Link className="nav-item" href="/historique">
              Historique
            </Link>
            <Link className="nav-item" href="/sources">
              Sources
            </Link>
            <Link className="nav-item" href="/admin">
              Admin
            </Link>
          </nav>

          <span className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
            V1
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="page-card">
          <p className="section-kicker">Dossiers</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Vos dossiers de recherche</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            Cette section accueillera les documents sauvegardés, les personnes suivies et
            les regroupements de recherches utiles.
          </p>
        </div>
      </div>
    </main>
  );
}
