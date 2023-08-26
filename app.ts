import express, { Application, Request, Response } from "express";
import cors from "cors";
import corsOption from "./src/config/cors.config";

// Routes imported
import authRoute from "./src/routes/authRoute/auth.route";

const app: Application = express();
const version = "v1";

// default middleware
app.get("/", (req: Request, res: Response) =>
  res.status(200).json("Hello world")
);
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes executed
app.use(`/api/${version}/auth`, authRoute);

export default app;
