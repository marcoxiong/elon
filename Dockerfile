# 1️⃣ Use a lightweight Python image
FROM python:3.9-slim

# 2️⃣ Set working directory inside the container
WORKDIR /app

# 3️⃣ Install system dependencies (Tesseract OCR)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*

# 4️⃣ Copy only necessary AI/ML files into the container
COPY aiml/requirements.txt .
COPY aiml/main.py .

# 5️⃣ Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 6️⃣ Expose FastAPI's default port
EXPOSE 8000

# 7️⃣ Run FastAPI server with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
