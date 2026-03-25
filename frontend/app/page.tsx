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
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl space-y-10">
        
        {/* HERO */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Retrouver vos ancêtres, intelligemment
          </h1>
          <p className="text-gray-600 text-lg">
            Analyse automatique des archives et identification des bonnes correspondances.
          </p>
        </div>

        {/* SEARCH */}
        <SearchForm onSubmit={handleSearch} />

        {/* EXAMPLES */}
        <div className="text-sm text-gray-500 space-y-1">
          <p className="font-medium">Exemples :</p>
          <p>• Jean Martin, né en 1892 à Nantes</p>
          <p>• Marie Dupont mariage 1875 Lyon</p>
          <p>• Pierre Durand recensement 1911 Bordeaux</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm">
            {error}
          </div>
        )}

        <SearchResults data={data} />
      </div>
    </main>
  );
}
