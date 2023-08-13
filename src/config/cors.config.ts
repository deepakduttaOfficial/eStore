import * as cors from "cors";
import envConfig from "./env.config";

const corsOption: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  methods: ["GET", "PUT", "OPTIONS", "POST", "DELETE", "PATCH"],
  origin: envConfig.DOMAIN,
  preflightContinue: false,
};

export default corsOption;
