import os
from urllib.parse import quote_plus

import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "https://genea-saas.vercel.app",
    "https://genea-saas-g91r9pqpx-ycap1136-7485s-projects.vercel.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERPAPI_KEY = os.getenv("SERPAPI_KEY", "")

class SearchRequest(BaseModel):
    query: str


@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/health")
def health():
    return {"status": "ok", "serpapi_configured": bool(SERPAPI_KEY)}


def build_genealogy_query(user_query: str) -> str:
    user_query = user_query.strip()
    return (
        f'{user_query} '
        f'(site:archivesdepartementales.fr OR site:francearchives.gouv.fr OR site:gallica.bnf.fr) '
        f'(registre OR matricule OR état civil OR genealogie OR archives)'
    )


def map_result(item: dict, index: int) -> dict:
    title = item.get("title", "Résultat sans titre")
    link = item.get("link", "")
    snippet = item.get("snippet", "Aucun extrait disponible.")
    source = item.get("source") or item.get("displayed_link") or "Source web"

    return {
        "id": str(index),
        "title": title,
        "source": source,
        "url": link,
        "excerpt": snippet,
        "score": max(50, 100 - index * 7),
        "document_type": "Résultat web",
        "date": "",
        "location": ""
    }


@app.post("/search")
def search(req: SearchRequest):
    query = req.query.strip()

    if not query:
        return {"results": []}

    if not SERPAPI_KEY:
        return {
            "results": [
                {
                    "id": "1",
                    "title": "Clé SerpAPI manquante",
                    "source": "Configuration backend",
                    "url": "",
                    "excerpt": "Ajoute la variable d'environnement SERPAPI_KEY dans Render pour activer la recherche web réelle.",
                    "score": 0,
                    "document_type": "Configuration",
                    "date": "",
                    "location": ""
                }
            ]
        }

    google_query = build_genealogy_query(query)

    params = {
        "engine": "google",
        "q": google_query,
        "api_key": SERPAPI_KEY,
        "hl": "fr",
        "gl": "fr",
        "num": 10,
    }

    response = requests.get(
        "https://serpapi.com/search.json",
        params=params,
        timeout=25,
    )
    response.raise_for_status()
    data = response.json()

    organic_results = data.get("organic_results", [])

    results = []
    for i, item in enumerate(organic_results[:8], start=1):
        results.append(map_result(item, i))

    return {"results": results}
