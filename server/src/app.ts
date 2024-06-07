import express from "express";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import categoryRoute from "./routes/categoryRoute";
import bodyParser from "body-parser";

// Express
const app = express();

// Cors
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/", userRoutes);
app.use("/", categoryRoute);
// ERROR HANDLER
app.use(errorHandler);

export default app;
