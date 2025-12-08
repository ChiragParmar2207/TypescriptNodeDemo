import dotenv from 'dotenv';
dotenv.config();

export default {
  // Server configuration
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DEVELOPER_NAME: process.env.DEVELOPER_NAME,

  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,

  // CLUSTER CREDENTIALS
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME,

  // Swagger configuration
  SWAGGER_USERNAME: process.env.SWAGGER_USERNAME,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,

  // PASSWORD AND TOKEN
  PASSWORD_ENCRYPT_LEVEL: process.env.PASSWORD_ENCRYPT_LEVEL,
  CREATEHASH_KEY: process.env.CREATEHASH_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  // EMAIL CREDENTIALS
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,

  // AWS S3
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_REGION: process.env.AWS_REGION,

  // Cloudinary
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_NAME: process.env.CLOUDINARY_API_NAME,
};
