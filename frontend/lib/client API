import { SearchResponse } from "@/lib/types";

export async function runSearch(payload: {
  query: string;
  user_id?: string | null;
  opt_in_indexing: boolean;
}): Promise<SearchResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Erreur lors de la recherche");
  }

  return res.json();
}
