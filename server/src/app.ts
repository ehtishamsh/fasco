import express from "express";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import brandRoutes from "./routes/brandRoutes";
import categoryRoute from "./routes/categoryRoute";
import uploadRoute from "./routes/uploadRoute";
import addressRoute from "./routes/addressRoutes";
import productRoutes from "./routes/productRoutes";
import bodyParser from "body-parser";

///////////////////////////

const app = express();
app.use(express.static("public"));
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

/////////////////////////

// MIDDLEWARE

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/", userRoutes);
app.use("/", uploadRoute);
app.use("/api", addressRoute);
app.use("/api", productRoutes);
app.use("/api", categoryRoute);
app.use("/api", brandRoutes);

//Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/api/create-checkout-session", async (req, res) => {
  const products = req.body;

  const transformedProducts = products.products.map((product: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
        },
        unit_amount: Number(product.price) * 100,
      },
      quantity: Number(product.quantity),
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedProducts,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.send({ id: session.id, url: session.url });
});

// ERROR HANDLER
app.use(errorHandler);

export default app;
