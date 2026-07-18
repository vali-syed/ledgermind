import os
from dotenv import load_dotenv
from pinecone import Pinecone

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")

pc = Pinecone(api_key=PINECONE_API_KEY)

index = pc.Index(PINECONE_INDEX_NAME)


def store_embeddings(embedded_chunks, document_id):
    vectors = []

    for chunk in embedded_chunks:
        vectors.append({
            "id": document_id + "_" + str(chunk["chunk_id"]),
            "values": chunk["embedding"],
            "metadata": {
                "text": chunk["text"]
            }
        })

    index.upsert(vectors=vectors)