import os
from dotenv import load_dotenv
from openai import OpenAI
from pinecone import Pinecone

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index = pc.Index(os.getenv("PINECONE_INDEX_NAME"))


def retrieve_chunks(query):

    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=query
    )

    query_embedding = response.data[0].embedding

    result = index.query(
        vector=query_embedding,
        top_k=5,
        include_metadata=True
    )

    chunks = []

    for match in result.matches:

        chunks.append({
            "score": match.score,
            "text": match.metadata["text"]
        })

    return chunks