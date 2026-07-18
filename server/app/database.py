import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_DB_URI = os.getenv("MONGO_DB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(MONGO_DB_URI)


db = client[DATABASE_NAME]

users_collection = db["users"]