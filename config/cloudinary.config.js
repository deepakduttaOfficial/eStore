import envConfig from "./env.config";
import cloudinary from "cloudinary";

(function () {
  cloudinary.config({
    cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
    api_key: envConfig.CLOUDINARY_API_KEY,
    api_secret: envConfig.CLOUDINARY_API_SECTET,
  });
})();
