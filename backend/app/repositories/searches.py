from app.db.supabase import supabase

def create_search(user_id: str | None, query: str, opt_in_indexing: bool):
    payload = {
        "user_id": user_id,
        "raw_query": query,
        "normalized_query": query.lower().strip(),
        "opt_in_indexing": opt_in_indexing,
    }

    response = supabase.table("searches").insert(payload).execute()
    return response.data[0]
