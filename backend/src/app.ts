import express from 'express';
import { ENV } from './config/env';
import claimRouter from './router/claimRouter';

const app = express();

app.use(express.json());
app.use('/claims', claimRouter);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});

export default app;
