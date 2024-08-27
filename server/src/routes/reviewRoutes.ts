import { Router } from "express";
import { checkProductReview } from "../controllers/reviewController";

const router = Router();

router.get("/reviews/user/:id", checkProductReview);
export default router;
