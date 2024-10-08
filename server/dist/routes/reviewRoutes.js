"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
router.get("/reviews/user/:uid", reviewController_1.orderReview);
router.post("/reviews", reviewController_1.addReview);
router.get("/reviews/:id", reviewController_1.getReviewsByOrderID);
router.get("/reviews/product/:id", reviewController_1.getReviewByProductSlug);
exports.default = router;
