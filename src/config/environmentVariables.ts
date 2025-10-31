import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default {
  PORT: process.env.PORT || 5050,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEVELOPER_NAME: process.env.DEVELOPER_NAME || 'Chirag Parmar',

  SERVER_URL: process.env.SERVER_URL || 'http://localhost:5050',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',

  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://chigsparmar07:Chigs6779@chigscluster.0fbezwy.mongodb.net/',
  MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'demo_project',
};
