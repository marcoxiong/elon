import dotenv from 'dotenv';

dotenv.config();

const ENV = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || '',
  PORT: process.env.PORT || '3000',
};

export default ENV;
