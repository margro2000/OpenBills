from fastapi import FastAPI, File, UploadFile
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel
import ai
from fastapi.middleware.cors import CORSMiddleware


import json 
TEST = 1
app = FastAPI()
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
    outliers_prompt = f"""
    The following is a bill from Congress. Please identify any sections (there may be none) that are addressing 
    topics that are not directly related to the main purpose of the bill. In particular look for section indicative
    of pork-barrel spending, unrelated amendments, or other topics that are not directly related to the main purpose
    of the bill.

    {bill_txt}
    """
    if TEST == 1:
        response = BillSummaryResponse(
            abstract=bill_txt[:500],
            summary=bill_txt[:2000],
            outliers="No outliers",
        )
        return response
    response = BillSummaryResponse(
        abstract=ai.cached_request(ai.get_summary_prompt(bill_txt, summary_description="100 word")),
        summary=ai.cached_request(ai.get_summary_prompt(bill_txt, summary_description="bullet pointed (1 for each section of the bill), 500 word")),
        outliers=ai.cached_request(outliers_prompt),
    )
    return response
