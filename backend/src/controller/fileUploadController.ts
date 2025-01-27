import { Request, Response, Router } from 'express';
import { storeFileUpload } from '../common/middleware/storeFileUpload';

const fileUploadController = Router();

fileUploadController.post(
  '/upload',
  storeFileUpload.single('receipt'),
  async (req: Request, res: Response) => {
    // Multer attaches the file data to req.file
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, mimetype, size, path: filePath } = req.file;

    // Respond with success and file metadata
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

// export const uploadReceipt = async (req: Request, res: Response) => {
//   try {
//     // Multer attaches the file data to req.file
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const { originalname, mimetype, size, path: filePath } = req.file;

//     // Respond with success and file metadata
//     res.status(201).json({
//       message: 'File uploaded successfully',
//       file: {
//         originalname,
//         mimetype,
//         size,
//         filePath,
//       },
//     });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
