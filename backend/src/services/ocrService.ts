import Tesseract from 'tesseract.js';

const extract = async (imagePath: string): Promise<string> => {
  const result = await Tesseract.recognize(imagePath, 'eng', {
    logger: (info) => console.log(info), // Logs progress during OCR
  });
  return result.data.text;
};

const ocrService = { extract };

export default ocrService;
