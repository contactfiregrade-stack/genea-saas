from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class SearchRequest(BaseModel):
    query: str

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/search")
def search(req: SearchRequest):
    return {
        "results": [
            {
                "id": "1",
                "title": "Résultat backend réel",
                "score": 95,
                "excerpt": f"Résultat pour : {req.query}",
                "source": "Backend FastAPI",
                "tags": ["api active"]
            }
        ]
    }
