from fastapi import APIRouter
from app.schemas.chat import ChatRequest
from app.services.chat_service import generate_chat_response

router = APIRouter()

@router.post("/chat")
def chat_endpoint(request: ChatRequest):
    response = generate_chat_response(request.question)
    return response
