"use client";

import { useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import { runSearch } from "../lib/api";
import { SearchResponse } from "../lib/types";

export default function HomePage() {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(payload: {
    query: string;
    opt_in_indexing: boolean;
  }) {
    try {
      setError(null);
      setData(null);

      const result = await runSearch({
        query: payload.query,
        user_id: null,
        opt_in_indexing: payload.opt_in_indexing,
      });

      setData(result);
    } catch (err) {
      console.error(err);
      setError("La recherche a échoué.");
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Assistant généalogique</h1>
        <p className="mt-2 text-gray-600">
          Recherche et qualification de documents d’archives.
        </p>
      </div>

      <SearchForm onSubmit={handleSearch} />

      {error && (
        <div className="rounded-xl border border-red-300 p-4 text-sm">
          {error}
        </div>
      )}

      <SearchResults data={data} />
    </main>
  );
}
