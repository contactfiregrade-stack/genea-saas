import { SearchResponse } from "@/lib/types";

type Props = {
  data: SearchResponse | null;
};

export default function SearchResults({ data }: Props) {
  if (!data) return null;

  return (
    <div className="rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">Résultat</h2>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="font-medium">Search ID :</span> {data.search_id}
        </p>
        <p>
          <span className="font-medium">Requête brute :</span> {data.raw_query}
        </p>
        <p>
          <span className="font-medium">Requête normalisée :</span>{" "}
          {data.normalized_query}
        </p>
      </div>
    </div>
  );
}
