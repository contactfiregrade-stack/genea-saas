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

class SearchRequest(BaseModel):
    query: str

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/search")
def search(req: SearchRequest):
    q = req.query.strip()

    return {
        "results": [
            {
                "id": "1",
                "title": f"Registre matricule correspondant à « {q} »",
                "source": "Archives départementales du Morbihan",
                "url": "https://genea-saas.onrender.com/",
                "excerpt": f"Résultat simulé pour la recherche « {q} ». Ici s’afficheront ensuite les vrais extraits documentaires trouvés sur les sources publiques.",
                "score": 95,
                "document_type": "Fiche matricule",
                "date": "1920",
                "location": "Vannes"
            },
            {
                "id": "2",
                "title": f"Table décennale liée à « {q} »",
                "source": "Archives départementales",
                "url": "https://genea-saas.onrender.com/docs",
                "excerpt": "Entrée potentiellement pertinente dans une table décennale ou un index d’archives. Cette carte sera remplacée par un vrai document trouvé en ligne.",
                "score": 81,
                "document_type": "Table décennale",
                "date": "1913-1922",
                "location": "Vannes"
            }
        ]
    }
