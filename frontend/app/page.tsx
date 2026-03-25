"use client";

import { useState } from "react";

type ResultItem = {
  id?: string;
  title: string;
  source: string;
  url?: string;
  excerpt: string;
  score: number;
  document_type?: string;
  date?: string;
  location?: string;
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) {
      setError("Entre une recherche.");
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: query.trim() })
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      console.error(err);
      setError("Le moteur de recherche est indisponible pour le moment.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        padding: "48px 20px"
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto"
        }}
      >
        <header style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 42,
              lineHeight: 1.1,
              margin: "0 0 12px 0",
              color: "#111827"
            }}
          >
            Recherche documentaire
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.6,
              color: "#4b5563",
              maxWidth: 760
            }}
          >
            Recherche de documents publics utiles dans les archives et sources généalogiques.
          </p>
        </header>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 18,
            padding: 18,
            boxShadow: "0 8px 24px rgba(17, 24, 39, 0.05)",
            marginBottom: 24
          }}
        >
          <label
            htmlFor="query"
            style={{
              display: "block",
              marginBottom: 10,
              fontSize: 14,
              fontWeight: 600,
              color: "#111827"
            }}
          >
            Recherche
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 12
            }}
          >
            <input
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Exemple : Yves Jean Adolphe Capitaine 1920 Vannes"
              style={{
                padding: "16px 18px",
                fontSize: 16,
                borderRadius: 14,
                border: "1px solid #d1d5db",
                outline: "none"
              }}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                border: "none",
                borderRadius: 14,
                padding: "16px 22px",
                fontSize: 16,
                fontWeight: 600,
                background: loading ? "#6b7280" : "#111827",
                color: "#ffffff",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Recherche..." : "Rechercher"}
            </button>
          </div>

          {error && (
            <p
              style={{
                marginTop: 12,
                marginBottom: 0,
                color: "#b91c1c",
                fontSize: 14
              }}
            >
              {error}
            </p>
          )}
        </section>

        {!hasSearched && (
          <section
            style={{
              background: "#ffffff",
              border: "1px dashed #d1d5db",
              borderRadius: 18,
              padding: 24,
              color: "#6b7280"
            }}
          >
            Lance une recherche pour afficher les résultats trouvés.
          </section>
        )}

        {hasSearched && !loading && results.length === 0 && !error && (
          <section
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 18,
              padding: 24,
              color: "#6b7280"
            }}
          >
            Aucun résultat trouvé.
          </section>
        )}

        <section
          style={{
            display: "grid",
            gap: 16
          }}
        >
          {results.map((result, index) => (
            <article
              key={result.id ?? `${result.title}-${index}`}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                padding: 20,
                boxShadow: "0 8px 24px rgba(17, 24, 39, 0.04)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                  marginBottom: 10
                }}
              >
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: 24,
                      lineHeight: 1.25,
                      margin: "0 0 8px 0",
                      color: "#111827"
                    }}
                  >
                    {result.title}
                  </h2>

                  <p
                    style={{
                      margin: "0 0 4px 0",
                      color: "#374151",
                      fontSize: 14
                    }}
                  >
                    <strong>Source :</strong> {result.source}
                  </p>
                </div>

                <div
                  style={{
                    minWidth: 72,
                    textAlign: "center",
                    background: "#eefbf3",
                    color: "#166534",
                    borderRadius: 14,
                    padding: "10px 12px",
                    fontWeight: 700,
                    fontSize: 18
                  }}
                >
                  {result.score}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 14
                }}
              >
                {result.document_type && (
                  <span
                    style={{
                      fontSize: 13,
                      padding: "7px 10px",
                      borderRadius: 999,
                      background: "#f3f4f6",
                      color: "#374151"
                    }}
                  >
                    {result.document_type}
                  </span>
                )}

                {result.date && (
                  <span
                    style={{
                      fontSize: 13,
                      padding: "7px 10px",
                      borderRadius: 999,
                      background: "#f3f4f6",
                      color: "#374151"
                    }}
                  >
                    {result.date}
                  </span>
                )}

                {result.location && (
                  <span
                    style={{
                      fontSize: 13,
                      padding: "7px 10px",
                      borderRadius: 999,
                      background: "#f3f4f6",
                      color: "#374151"
                    }}
                  >
                    {result.location}
                  </span>
                )}
              </div>

              <p
                style={{
                  margin: "0 0 16px 0",
                  color: "#374151",
                  fontSize: 16,
                  lineHeight: 1.65
                }}
              >
                {result.excerpt}
              </p>

              {result.url && (
                <a
                  href={result.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    background: "#111827",
                    color: "#ffffff",
                    padding: "12px 16px",
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  Consulter la source
                </a>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
