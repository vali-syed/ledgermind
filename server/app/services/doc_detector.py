def detect_document_type(text: str):

    text = text.lower()

    if (
        "state bank of india" in text #iam using state bank of india as an example for bank statement detection so i mentioned it here wantedly.
        or (
            "account statement" in text
            and "balance" in text
        )
    ):
        return "bank_statement"

    if (
        "profit and loss" in text
        or "income statement" in text
    ):
        return "profit_loss"

    if (
        "balance sheet" in text
        or (
            "assets" in text
            and "liabilities" in text
        )
    ):
        return "balance_sheet"

    if (
        "invoice" in text
        or "tax invoice" in text
    ):
        return "invoice"

    if (
        "gst" in text
        or "cgst" in text
        or "sgst" in text
        or "igst" in text
    ):
        return "gst"

    return "generic"
