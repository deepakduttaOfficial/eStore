import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/CackOrder",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};

export default envConfig;
