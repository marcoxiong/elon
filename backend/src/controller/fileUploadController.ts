import { Request, Response, Router } from 'express';
import { storeFileUpload } from '../common/middleware/storeFileUpload';

const fileUploadController = Router();

fileUploadController.post(
  '/',
  storeFileUpload.single('file'),
  async (req: Request, res: Response) => {
    // Multer attaches the file data to req.file
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const { originalname, mimetype, size, path: filePath } = req.file;
    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        originalname,
        mimetype,
        size,
        filePath,
      },
    });
  }
);

export default fileUploadController;
