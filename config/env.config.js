import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  DB_URL,
  JWT_SECRET_AUTH,
  JWT_EXPIRY,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_EMAIL,
  EMAIL_VERIFY_TOKEN_SECRET_KEY,
  DOMAIN_URL,
} = process.env;

const envConfig = {
  PORT: PORT || 8000,
  DB_URL: DB_URL || "mongodb://127.0.0.1:27017/CackOrder",
  JWT_SECRET_AUTH,
  JWT_EXPIRY,
  // Mail creadential
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_EMAIL,
  EMAIL_VERIFY_TOKEN_SECRET_KEY,
  DOMAIN_URL,
};

export default envConfig;
