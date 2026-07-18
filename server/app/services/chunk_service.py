import re

from app.services.doc_detector import detect_document_type


def paragraph_chunk(text):

    paragraphs = re.split(r"\n\s*\n", text)

    chunks = []

    current_chunk = ""

    for para in paragraphs:

        para = para.strip()

        if not para:
            continue

        if len(current_chunk) + len(para) < 1000:

            current_chunk += para + "\n\n"

        else:

            chunks.append(current_chunk.strip())

            current_chunk = para + "\n\n"

    if current_chunk:

        chunks.append(current_chunk.strip())

    return chunks


def bank_statement_chunk(text):

    lines = text.split("\n")

    chunks = []

    current_chunk = []

    transaction_count = 0

    date_pattern = re.compile(
        r"^\d{1,2}[/-][A-Za-z0-9]{1,3}[/-]?\d{2,4}"
    )

    for line in lines:

        line = line.strip()

        if not line:
            continue

        current_chunk.append(line)

        if date_pattern.match(line):

            transaction_count += 1

        if transaction_count >= 10:

            chunks.append({
                "chunk_id": len(chunks),
                "text": "\n".join(current_chunk)
            })

            current_chunk = []

            transaction_count = 0

    if current_chunk:

        chunks.append({
            "chunk_id": len(chunks),
            "text": "\n".join(current_chunk)
        })

    return chunks


def chunk_text(text):

    document_type = detect_document_type(text)

    if document_type == "bank_statement":
        print("Detected document type: Bank Statement")
        return bank_statement_chunk(text)
    print("detected document type: Generic Document")
    return paragraph_chunk(text)
