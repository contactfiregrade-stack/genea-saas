import os

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
    masked = ""
    if SERPAPI_KEY:
        masked = f"{SERPAPI_KEY[:4]}...{SERPAPI_KEY[-4:]}"
    return {
        "status": "ok",
        "serpapi_configured": bool(SERPAPI_KEY),
        "serpapi_key_length": len(SERPAPI_KEY),
        "serpapi_key_masked": masked,
        "serpapi_key_has_spaces": SERPAPI_KEY != SERPAPI_KEY.strip(),
    }


def build_genealogy_query(user_query: str) -> str:
    user_query = user_query.strip()
    return (
        f'{user_query} '
        f'(site:archivesdepartementales.fr OR site:francearchives.gouv.fr OR site:gallica.bnf.fr) '
        f'(registre OR matricule OR "état civil" OR genealogie OR archives)'
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
            "results": [],
            "error": "missing_serpapi_key",
            "message": "SERPAPI_KEY est absente de la configuration Render."
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

    try:
        response = requests.get(
            "https://serpapi.com/search.json",
            params=params,
            timeout=25,
        )

        # On essaie de parser la réponse JSON, même si le statut HTTP est mauvais
        try:
            data = response.json()
        except Exception:
            return {
                "results": [],
                "error": "invalid_serpapi_response",
                "message": f"Réponse non JSON de SerpAPI. HTTP {response.status_code}.",
                "raw_text": response.text[:500]
            }

        if response.status_code != 200:
            return {
                "results": [],
                "error": "serpapi_http_error",
                "message": f"SerpAPI a répondu avec HTTP {response.status_code}.",
                "details": data
            }

        if "error" in data:
            return {
                "results": [],
                "error": "serpapi_error",
                "message": str(data.get("error")),
                "details": data
            }

        organic_results = data.get("organic_results", [])
        results = [map_result(item, i) for i, item in enumerate(organic_results[:8], start=1)]

        return {
            "results": results,
            "debug": {
                "query": query,
                "google_query": google_query,
                "count": len(results)
            }
        }

    except requests.Timeout:
        return {
            "results": [],
            "error": "timeout",
            "message": "Le moteur externe a mis trop de temps à répondre."
        }
    except requests.RequestException as e:
        return {
            "results": [],
            "error": "request_exception",
            "message": str(e)
        }
    except Exception as e:
        return {
            "results": [],
            "error": "unexpected_backend_error",
            "message": str(e)
        }
