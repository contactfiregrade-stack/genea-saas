from fastapi import APIRouter, HTTPException
from app.schemas.search import SearchRequest
from app.repositories.searches import create_search

router = APIRouter(prefix="/search", tags=["search"])

@router.post("")
def run_search(payload: SearchRequest):
    try:
        search = create_search(
            user_id=payload.user_id,
            query=payload.query,
            opt_in_indexing=payload.opt_in_indexing,
        )

        return {
            "ok": True,
            "search_id": search["id"],
            "raw_query": search["raw_query"],
            "normalized_query": search["normalized_query"],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
