from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.search import router as search_router

app = FastAPI(title="Genealogy AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router)

@app.get("/health")
def health():
    return {"ok": True}
