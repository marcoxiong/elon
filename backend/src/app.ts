import express from 'express';
import ENV from './configs/env';
import claimController from './controllers/claimController';
import fileUploadController from './controllers/fileUploadController';

const app = express();

app.use(express.json());
app.use('/claims', claimController);
app.use('/claims/uploads', fileUploadController);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});

export default app;
