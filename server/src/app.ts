import express from "express";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";
import bodyParser from "body-parser";

// Express
const app = express();

// Cors
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/", userRoutes);

// ERROR HANDLER
app.use(errorHandler);

export default app;
