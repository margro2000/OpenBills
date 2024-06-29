from fastapi import FastAPI, File, UploadFile
from fastapi.responses import PlainTextResponse

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summarize/", response_class=PlainTextResponse)
async def create_upload_file(file: UploadFile = File(...)):
    content = await file.read()
    return content.decode("utf-8")

