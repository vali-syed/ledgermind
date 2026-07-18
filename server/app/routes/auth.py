from fastapi import APIRouter
from app.schemas.user import UserRegister
from app.database import users_collection

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
def register(user: UserRegister):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        print("Hello")
        return {
            "message": "User already exists"}
    else:    
        users_collection.insert_one(user.dict())
        print("Hello 2")  
        return {
            "message": "User registered successfully",
            "user": user
        }