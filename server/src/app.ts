import express from "express";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/apiv1", userRoutes);

app.use(errorHandler);

export default app;
