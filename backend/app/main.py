from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "https://genea-saas.vercel.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
                "tags": ["api active", "connexion front-back ok"]
            }
        ]
    }
