from fastapi import FastAPI, File, UploadFile
import pytesseract
from PIL import Image
import io

app = FastAPI()

@app.post("/ocr")
async def extract_text(file: UploadFile = File(...)):
    try:
        image = Image.open(io.BytesIO(await file.read()))
        text = pytesseract.image_to_string(image)
        return {"extracted_text": text}
    except Exception as e:
        return {"error": str(e)}
