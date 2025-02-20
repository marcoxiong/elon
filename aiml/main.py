from fastapi import FastAPI, File, UploadFile
import pytesseract
from PIL import Image
import io
import os
import uvicorn

app = FastAPI()
port = int(os.environ.get("PORT", 8080))

@app.post("/ocr")
async def extract_text(file: UploadFile = File(...)):
    try:
        image = Image.open(io.BytesIO(await file.read()))
        text = pytesseract.image_to_string(image)
        return {"extracted_text": text}
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    print(f"🚀 Starting FastAPI on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)