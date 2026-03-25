"use client";

import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import { runSearch, wakeBackend } from "../lib/api";
import { SearchResponse } from "../lib/types";

export default function HomePage() {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backendReady, setBackendReady] = useState(false);
  const [warmingUp, setWarmingUp] = useState(true);

  useEffect(() => {
    async function wake() {
      try {
        await wakeBackend();
        setBackendReady(true);
      } } catch (err) {
  console.error(err);
  const message =
    err instanceof Error
      ? err.message
      : "La recherche a échoué. Vérifie la connexion avec le backend.";

  setError(message);
}
      } finally {
        setWarmingUp(false);
      }
    }

    wake();
  }, []);

 import { SearchRequest, SearchResponse } from "./types";

function getBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return baseUrl;
}

export async function wakeBackend(): Promise<boolean> {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/health`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`);
  }

  return true;
}

export async function runSearch(payload: SearchRequest): Promise<SearchResponse> {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await res.text();

  let body: any = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    const detail =
      typeof body === "object" && body?.detail
        ? body.detail
        : typeof body === "string"
        ? body
        : `HTTP ${res.status}`;

    throw new Error(detail);
  }

  return body as SearchResponse;
}
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--foreground)]">
      <header className="border-b border-white/10 bg-[var(--nav-bg)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-lg font-semibold">Genea</p>
            <p className="text-xs text-slate-400">Assistant de recherche généalogique</p>
          </div>
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

        {warmingUp ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Connexion au moteur en cours…
          </div>
        ) : null}

        {backendReady ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            Moteur prêt.
          </div>
        ) : null}

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
