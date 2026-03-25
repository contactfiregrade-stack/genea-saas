"use client";

import { useState } from "react";
import Link from "next/link";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import { runSearch } from "../lib/api";
import { SearchResponse } from "../lib/types";

export default function HomePage() {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(payload: { query: string; opt_in_indexing: boolean }) {
    try {
      setError(null);
      const result = await runSearch({
        query: payload.query,
        user_id: null,
        opt_in_indexing: payload.opt_in_indexing,
      });
      setData(result);
    } catch (err) {
      console.error(err);
      setError("La recherche a échoué. Vérifie la connexion avec le backend.");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--foreground)]">
      <header className="border-b border-white/10 bg-[var(--nav-bg)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-lg font-semibold">Genea</p>
            <p className="text-xs text-slate-400">Assistant de recherche généalogique</p>
          </div>

          <nav className="hidden gap-2 md:flex">
            <Link className="nav-item nav-item-active" href="/">
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
            <Link className="nav-item" href="/admin">
              Admin
            </Link>
          </nav>

          <span className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
            V1
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="hero-block">
          <div className="max-w-3xl space-y-5">
            <div className="hero-pill">
              Analyse d’archives • Correspondances • Sources qualifiées
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Retrouver vos ancêtres, avec une recherche plus claire et plus utile.
            </h1>

            <p className="text-base leading-7 text-slate-300 sm:text-lg">
              Interrogez des sources d’archives, préparez l’identification des documents
              pertinents, et posez la base d’une analyse généalogique assistée.
            </p>
          </div>
        </section>

        <SearchForm onSubmit={handleSearch} />

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <SearchResults data={data} />
      </div>
    </main>
  );
}
