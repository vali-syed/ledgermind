from fastapi import FastAPI
from app import database
from app.routes.auth import router as auth_router
from app.routes.upload import router as upload_router
from app.routes.chat import router as chat_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "LedgerMind API is running "}

