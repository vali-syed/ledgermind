from fastapi import FastAPI
from app import database
from app.routes.auth import router as auth_router

app = FastAPI()

app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "LedgerMind API is running 🚀"}

