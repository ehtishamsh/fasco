import express from "express";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import brandRoutes from "./routes/brandRoutes";
import categoryRoute from "./routes/categoryRoute";
import uploadRoute from "./routes/uploadRoute";
import addressRoute from "./routes/addressRoutes";
import productRoutes from "./routes/productRoutes";
import bodyParser from "body-parser";

const app = express();

// Cors
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
// Routes
app.use("/", userRoutes);
app.use("/", uploadRoute);
app.use("/api", addressRoute);
app.use("/api", productRoutes);
app.use("/api", categoryRoute);
app.use("/api", brandRoutes);
// ERROR HANDLER
app.use(errorHandler);

export default app;
