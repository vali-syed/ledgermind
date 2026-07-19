import os
import uuid
from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import extract_text
from app.services.chunk_service import chunk_text
from app.services.embedding_service import generate_embeddings
from app.services.pinecone_service import store_embeddings
from app.services.retriver_service import retrieve_chunks
from app.services.chat_service import generate_chat_response

UPLOAD_FOLDER = 'app/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok = True)


router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("/upload_files" )
async def upload_file(file: UploadFile = File(...)):

    contents = await file.read()

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(contents)

    text = extract_text(file_path)
    chunks = chunk_text(text)
    embedded_chunks = generate_embeddings(chunks)
    document_id = str(uuid.uuid4())
    store_embeddings(embedded_chunks,document_id)

    return {
        "message" : "File uploaded and processed successfully",
        "filename": file.filename,
        "content_type": file.content_type,
    }

## just testing the retriver
@router.get("/test")
def test():
    response = generate_chat_response("please tell today soccer fifa world cup match detials?")
    return response["answer"]
