import { PrismaClient } from '@prisma/client';
import ENV from '../configs/env';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: ENV.DATABASE_URL,
    },
  },
});

export default prisma;
