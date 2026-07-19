import os 
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY)

SYSTEM_PROMPT = """
You are LedgerMind, an AI CFO for small businesses.

Analyze the uploaded financial document and return ONLY valid JSON.

Return this structure:

{
  "financial_health_score": 0,
  "revenue": 0,
  "expenses": 0,
  "opening_balance": 0,
  "closing_balance": 0,
  "cash_flow": "",
  "summary": "",
  "insights": [],
  "recommendations": []
}

Rules:
- Financial health score must be between 0 and 100.
 revenue must be a number only.
- expenses must be a number only.
- opening_balance must be a number only.
- closing_balance must be a number only.
- Do not include ₹ symbols.
- Do not include commas or markdown.
- Do not include explanatory text inside numeric fields.
- Give exactly 3 insights.
- Give exactly 3 recommendations.
- Do not return explanations.
- Return JSON only.
"""

def generate_business_summary(text : str):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        response_format={"type":"json_object"},
        messages=[
            {
                "role":"system",
                "content":SYSTEM_PROMPT
            },
            {
                "role":"user",
                "content": text

            }
        ],
        temperature=0.2
    )

    answer = response.choices[0].message.content
    return json.loads(answer)