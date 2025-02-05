import fs from 'fs';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const FILE_ALLOW_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This is a standard way to get the current module's URL in ES modules.
// It returns a file:// URL, which is why we need to convert it to a file path.
// fileURLToPath:

// Converts the file:// URL from import.meta.url to an absolute file path.
// path.dirname:

// Extracts the directory name from the file path, replicating the behavior of __dirname.

const getStorageDest = (): string => {
  const rootDir = path.resolve(__dirname, '../../..'); // Project root
  switch (process.env.NODE_ENV) {
    case 'production':
      throw new Error('Production storage not implemented yet');
    case 'staging':
      throw new Error('Staging storage not implemented yet');
    default:
      return path.join(rootDir, 'uploads'); // Local storage for dev
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

const storeFileUpload = multer({
  storage: createStorageEngine(),
  fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT },
});

export default storeFileUpload;
