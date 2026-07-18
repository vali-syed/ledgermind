import os
import jwt
from dotenv import load_dotenv
import bcrypt
from fastapi import APIRouter
from app.schemas.user import UserRegister , UserLogin
from app.database import users_collection

router = APIRouter(prefix="/auth", tags=["Authentication"])

load_dotenv()

JWT_SECRET = os.getenv("jwtSecret")

@router.post("/register")
def register(user: UserRegister):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        print("testing1")
        return {
            "message": "User already exists"
        }

    pass_bytes = user.password.encode('utf-8')

    hashed_password = bcrypt.hashpw(pass_bytes, bcrypt.gensalt())

    user_data = user.dict()

    user_data["password"] = hashed_password.decode('utf-8')

    users_collection.insert_one(user_data)

    print("testing 2")  
    return {
        "message": "User registered successfully",
        "user": {"name":user.name, "email":user.email}
        }

@router.post("/login")
def login(user: UserLogin):
    existing_user = users_collection.find_one({"email": user.email})
    if not existing_user:
        return {"message": "Invalid email or password"}

    user_input_password = user.password.encode('utf-8')

    actual_password = existing_user["password"].encode('utf-8')

    if not bcrypt.checkpw(user_input_password, actual_password):
        return {"message": "Invalid email or password"}
    token = jwt.encode({"email": existing_user["email"]}, JWT_SECRET, algorithm="HS256")

    return {
        "message": "Login successful",
        "access_token": token
    }
    