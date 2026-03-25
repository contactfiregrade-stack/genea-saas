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
    throw new Error("Backend wake-up failed");
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

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Erreur lors de la recherche");
  }

  return res.json();
}
