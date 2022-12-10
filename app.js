import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

// Routes imported
import authRoute from "./routes/auth.route.js";

const app = express();

const version = "v1";

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());

// Routes excicuted
app.use(`/api/${version}`, authRoute);

export default app;
