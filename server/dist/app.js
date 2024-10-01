"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const uploadRoute_1 = __importDefault(require("./routes/uploadRoute"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
///////////////////////////
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
const cors = require("cors");
app.use(body_parser_1.default.json());
app.use(cors());
/////////////////////////
// MIDDLEWARE
app.use("/uploads", express_1.default.static("uploads"));
// Routes
app.use("/", userRoutes_1.default);
app.use("/", uploadRoute_1.default);
app.use("/api", addressRoutes_1.default);
app.use("/api", productRoutes_1.default);
app.use("/api", categoryRoute_1.default);
app.use("/api", brandRoutes_1.default);
app.use("/api", orderRouter_1.default);
app.use("/api", dashboardRoutes_1.default);
app.use("/api", reviewRoutes_1.default);
//Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/api/create-checkout-session", async (req, res) => {
    const data = req.body;
    const transformedProducts = data.data.items.map((product) => {
        const quantity = product.quantity;
        const price = Number(product.discounted) > 0 ? product.discounted : product.price;
        const total = Number(price) + Number(product.selectedVariant?.price);
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.title,
                },
                unit_amount: Number(total) * 100,
            },
            quantity: Number(quantity),
        };
    });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: transformedProducts,
        mode: "payment",
        success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5173/cancel",
        metadata: {
            userId: data.data.userId,
            addressId: data.data.addressId,
            items: JSON.stringify(data.data.items.map((product) => ({
                productId: product.id,
                variantId: product.selectedVariant?.id,
                colorId: product.selectedColor?.id,
                quantity: product.quantity,
                price: Number(product.discounted) > 0
                    ? Number(product.discounted)
                    : Number(product.price),
                total: Number(product.discounted) > 0
                    ? Number(product.discounted)
                    : Number(product.price) +
                        Number(product.selectedVariant?.price) *
                            Number(product.quantity),
            }))),
        },
    });
    res.send({ id: session.id, url: session.url });
});
const endpointSecret = "whsec_..."; // Replace with your webhook secret
app.post("/webhook", body_parser_1.default.raw({ type: "application/json" }), (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    }
    catch (err) {
        response.status(400).send(`Webhook Error`);
        return;
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const paymentIntentId = session.payment_intent;
        // Handle successful payment here
        // You can save the session details to your database or perform any required action
    }
    response.json({ received: true });
});
app.get("/api/check-session", async (req, res) => {
    const sessionId = req.query.session_id;
    if (!sessionId) {
        return res.status(400).send({ error: "Session ID is required" });
    }
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.send({ session: session });
    }
    catch (error) {
        res.status(500).send({ error: error });
    }
});
// ERROR HANDLER
app.use(errorHandler_1.default);
exports.default = app;
