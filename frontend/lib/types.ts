export type SearchResponse = {
  ok: boolean;
  search_id: string;
  raw_query: string;
  normalized_query: string;
};

export type SearchRequest = {
  query: string;
  user_id?: string | null;
  opt_in_indexing: boolean;
};
