from fastapi import FastAPI, File, UploadFile
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel
import ai

import json 

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


class BillSummaryResponse(BaseModel):
    abstract: str
    summary: str
    outliers: str


@app.post("/summarize_bill/")
async def create_upload_file(file: UploadFile = File(...)):
    content = await file.read()
    bill_txt = content.decode("utf-8")
    response = BillSummaryResponse(
        abstract=ai.deyappify(bill_txt),
        summary=bill_txt[:100] + "...",
        outliers="These are the outliers in the bill"
    )
    return response