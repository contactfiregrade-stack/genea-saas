"use client";

import { useState } from "react";

type ResultItem = {
  id?: string;
  title: string;
  score: number;
  excerpt: string;
  source: string;
  tags: string[];
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) {
      setError("Entre une recherche avant de lancer l’analyse.");
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch("https://genea-saas.onrender.com/search", {
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
        padding: "48px 20px"
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto"
        }}
      >
        <header
          style={{
            marginBottom: 32
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: 999,
              background: "#e8eefc",
              color: "#2447a5",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16
            }}
          >
            Prototype V1 connecté
          </div>

          <h1
            style={{
              fontSize: 42,
              lineHeight: 1.1,
              margin: "0 0 14px 0"
            }}
          >
            Recherche documentaire intelligente
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              maxWidth: 760,
              margin: 0,
              color: "#4b5563"
            }}
          >
            Un moteur orienté généalogie et archives pour retrouver rapidement
            les documents les plus pertinents, avec extraits et justification.
          </p>
        </header>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 20,
            padding: 20,
            boxShadow: "0 10px 30px rgba(17, 24, 39, 0.05)",
            marginBottom: 28
          }}
        >
          <label
            htmlFor="query"
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 10
            }}
          >
            Ta recherche
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
              placeholder="Exemple : Jean Martin né vers 1872 à Agen"
              style={{
                padding: "16px 18px",
                borderRadius: 14,
                border: "1px solid #d1d5db",
                fontSize: 16,
                outline: "none"
              }}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                border: "none",
                borderRadius: 14,
                padding: "16px 20px",
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
                color: "#b91c1c",
                fontSize: 14
              }}
            >
              {error}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 14
            }}
          >
            {[
              "Nom + date + lieu",
              "Résultats backend réels",
              "Extraits utiles",
              "Base prête pour premium"
            ].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 13,
                  background: "#f3f4f6",
                  color: "#374151",
                  padding: "8px 10px",
                  borderRadius: 999
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 20
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 16
            }}
          >
            {!hasSearched && (
              <div
                style={{
                  background: "#ffffff",
                  border: "1px dashed #d1d5db",
                  borderRadius: 20,
                  padding: 24,
                  color: "#6b7280"
                }}
              >
                Lance une recherche pour interroger le backend Render.
              </div>
            )}

            {hasSearched && !loading && results.length === 0 && !error && (
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 20,
                  padding: 24,
                  color: "#6b7280"
                }}
              >
                Aucun résultat retourné.
              </div>
            )}

            {results.map((result, index) => (
              <article
                key={result.id ?? `${result.title}-${index}`}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 20,
                  padding: 20,
                  boxShadow: "0 10px 30px rgba(17, 24, 39, 0.04)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "start",
                    marginBottom: 10
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: 22,
                        margin: "0 0 6px 0"
                      }}
                    >
                      {result.title}
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        color: "#6b7280",
                        fontSize: 14
                      }}
                    >
                      Source : {result.source}
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
                      fontWeight: 700
                    }}
                  >
                    {result.score}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "#374151",
                    marginBottom: 14
                  }}
                >
                  {result.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8
                  }}
                >
                  {result.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 13,
                        padding: "7px 10px",
                        borderRadius: 999,
                        background: "#f3f4f6",
                        color: "#374151"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside
            style={{
              display: "grid",
              gap: 16
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 20,
                padding: 20
              }}
            >
              <h3 style={{ marginTop: 0 }}>Statut</h3>
              <p style={{ color: "#4b5563", lineHeight: 1.6 }}>
                Le frontend Vercel appelle maintenant le backend Render.
                L’étape suivante sera de remplacer le faux moteur par une vraie
                logique de recherche documentaire.
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 20,
                padding: 20
              }}
            >
              <h3 style={{ marginTop: 0 }}>Prochaines briques</h3>
              <ul
                style={{
                  paddingLeft: 18,
                  color: "#4b5563",
                  lineHeight: 1.8,
                  marginBottom: 0
                }}
              >
                <li>autoriser CORS côté backend si besoin</li>
                <li>brancher Supabase Auth</li>
                <li>stocker recherches et documents sauvegardés</li>
                <li>remplacer les résultats simulés backend</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
