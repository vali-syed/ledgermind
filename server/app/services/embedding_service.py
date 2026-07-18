import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)


def generate_embeddings(chunks):
    """
    Takes chunk objects and adds embeddings.
    """

    normalized_chunks = [
        chunk if isinstance(chunk, dict) else {
            "chunk_id": index,
            "text": chunk
        }
        for index, chunk in enumerate(chunks)
    ]

    texts = [chunk["text"] for chunk in normalized_chunks]

    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )

    embedded_chunks = []

    for chunk, embedding in zip(normalized_chunks, response.data):
        embedded_chunks.append({
            "chunk_id": chunk["chunk_id"],
            "text": chunk["text"],
            "embedding": embedding.embedding
        })

    return embedded_chunks
