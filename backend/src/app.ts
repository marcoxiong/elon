import express from 'express';
import { ENV } from './config/env';
import claimController from './controller/claimController';
import fileUploadController from './controller/fileUploadController';

const app = express();

app.use(express.json());
app.use('/claims', claimController);
app.use('/uploads', fileUploadController);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});

export default app;
