import fs from 'fs';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const FILE_ALLOW_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const getStorageDest = (): string => {
  const rootDir = path.resolve(__dirname, '../../..'); // Project root
  switch (process.env.NODE_ENV) {
    case 'production':
      throw new Error('Production storage not implemented yet');
    case 'staging':
      throw new Error('Staging storage not implemented yet');
    default:
      return path.join(rootDir, 'backend', 'uploads'); // Local storage for dev
  }
};

const ensureStorageDest = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const createStorageEngine = (): StorageEngine => {
  const dest = getStorageDest();
  ensureStorageDest(dest);

  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, dest);
    },
    filename: (_req, file, cb) => {
      const timestamp = Date.now();
      const extension = path.extname(file.originalname);
      cb(null, `${timestamp}-${file.originalname}-${extension}`);
    },
  });
};

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (FILE_ALLOW_TYPES.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error(`Only ${FILE_ALLOW_TYPES.join(', ')} are allowed.`)); // Reject the file
  }
};

const save = multer({
  storage: createStorageEngine(),
  fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT },
});

export const storageService = { save };
