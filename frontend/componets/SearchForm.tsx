"use client";

import { useState } from "react";

type Props = {
  onSubmit: (payload: {
    query: string;
    opt_in_indexing: boolean;
  }) => Promise<void>;
};

export default function SearchForm({ onSubmit }: Props) {
  const [query, setQuery] = useState("");
  const [optInIndexing, setOptInIndexing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        query,
        opt_in_indexing: optInIndexing,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border p-6">
      <div>
        <label className="mb-2 block text-sm font-medium">Recherche</label>
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Jean Martin 1892 Nantes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={optInIndexing}
          onChange={(e) => setOptInIndexing(e.target.checked)}
        />
        Améliorer le moteur en enregistrant cette recherche
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl border px-4 py-2"
      >
        {loading ? "Recherche..." : "Rechercher"}
      </button>
    </form>
  );
}
