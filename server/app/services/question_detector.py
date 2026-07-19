import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT =  """
You are a classifier.
Determine whether the user's question is asking for financial analysis based on uploaded business financial documents.
Examples: Can I hire another employee? -> YES,What are my expenses? -> YES,How is my cash flow? -> YES,
Give me a financial summary. -> YES.
Who is Virat Kohli? -> NO,Tell me a joke. -> NO,Write Python code. -> NO,What is the capital of India? - NO

Strictly Respond with ONLY one word: YES or NO
"""

def is_financial_question(question: str):
     response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": question
            }
        ],
        temperature=0.2
    )
     return response.choices[0].message.content.strip() == "YES"