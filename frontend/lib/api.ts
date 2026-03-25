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
