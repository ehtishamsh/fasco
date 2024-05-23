import express from "express";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";

// Express
const app = express();

// Cors
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes
app.use("/apiv1", userRoutes);

// ERROR HANDLER
app.use(errorHandler);

export default app;
