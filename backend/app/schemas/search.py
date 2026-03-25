from pydantic import BaseModel
from typing import Optional

class SearchRequest(BaseModel):
    query: str
    user_id: Optional[str] = None
    opt_in_indexing: bool = False
