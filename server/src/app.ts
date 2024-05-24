import express from "express";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";
import passport from "passport";

// Express
const app = express();

// Cors
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
// Routes
app.use("/", userRoutes);

// ERROR HANDLER
app.use(errorHandler);

export default app;
