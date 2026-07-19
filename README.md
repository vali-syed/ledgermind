# LedgerMind

LedgerMind is an AI-powered CFO assistant for micro, small, and medium-sized businesses (MSMEs). It analyzes uploaded bank statements, generates financial insights, and answers business finance questions using Retrieval-Augmented Generation (RAG).

LedgerMind is a hackathon MVP focused on turning financial documents into practical, understandable business guidance.

## Features

- User registration and login
- PDF bank statement upload
- Automatic financial dashboard generation
- Financial health score
- Revenue, expenses, and cash flow summary
- AI CFO chat for document-based financial questions
- RAG-based document retrieval with Pinecone
- Source citations for AI-generated answers
- Responsive interface for desktop and mobile
- Persisted dashboard data using Zustand and local storage

## Tech Stack

### Frontend

- React
- React Router
- Zustand with persistence middleware
- Tailwind CSS
- Vite

### Backend

- FastAPI
- MongoDB Atlas
- Pinecone
- OpenAI API
- PyMuPDF
- Python dotenv

## Architecture Overview

LedgerMind uses a React frontend and FastAPI backend organized into separate applications.

1. A user creates an account or logs in through the authentication pages.
2. The user uploads a PDF bank statement from the frontend.
3. FastAPI extracts text from the PDF with PyMuPDF.
4. OpenAI generates a financial dashboard summary from the extracted text.
5. The extracted text is split into chunks, embedded with OpenAI, and stored in Pinecone.
6. The dashboard response is saved in the persisted Zustand store for use by the Dashboard page.
7. For chat questions, relevant chunks are retrieved from Pinecone and sent to OpenAI with the question.
8. The chat response includes the AI answer and the retrieved source chunks used to support it.

## Folder Structure

```text
/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── app/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── database.py
│   │   └── main.py
│   └── requirements.txt
├── .env
└── README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd ledgermind
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

From the repository root:

```bash
python -m venv .venv
```

Activate the virtual environment.

On Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

On macOS or Linux:

```bash
source .venv/bin/activate
```

Install the backend requirements:

```bash
pip install -r server/requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the repository root:

```env
MONGO_DB_URI=your_mongodb_atlas_connection_string
DATABASE_NAME=your_database_name
jwtSecret=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index_name
```

Do not commit `.env` or expose any API keys publicly.

### 5. Run the frontend

From `client/`:

```bash
npm run dev
```

The Vite development server normally runs at `http://localhost:5173`.

### 6. Run the backend

From the repository root, with the virtual environment activated:

```bash
uvicorn app.main:app --reload --app-dir server
```

The FastAPI development server normally runs at `http://localhost:8000`.

## API Overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/register` | Create a user account with `name`, `email`, and `password`. |
| `POST` | `/auth/login` | Authenticate a user and return an access token. |
| `POST` | `/upload/upload_files` | Upload and process a PDF bank statement. |
| `POST` | `/chat` | Ask a question and receive an answer with retrieved sources. |
| `GET` | `/` | Check that the API is running. |

The upload endpoint accepts a multipart form field named `file`. The chat endpoint accepts a JSON body with a `question` field.

## Future Improvements

- Add stronger backend authorization and token validation for protected API endpoints.
- Support additional financial document formats such as CSV and Excel.
- Add more detailed cash flow and expense visualizations.
- Improve document management for multiple uploaded statements.
- Add background processing for large documents.
- Add automated tests for frontend flows and backend services.
- Add production-ready configuration for frontend and backend API URLs.

## Contributors

LedgerMind Hackathon Team

## License

This project is licensed under the MIT License.
