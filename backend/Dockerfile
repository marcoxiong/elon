FROM node:22-slim
WORKDIR /app
# Install Tesseract for OCR (xAI-style ML preprocessing)
RUN apt-get update && apt-get install -y tesseract-ocr libtesseract-dev && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm install
COPY prisma/ ./prisma/
COPY src/ ./src/
RUN npx prisma generate
EXPOSE 3000
CMD ["npx", "tsx", "src/app.ts"]