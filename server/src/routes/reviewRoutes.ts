import { Router } from "express";
import { orderReview } from "../controllers/reviewController";

const router = Router();

router.get("/reviews/user/:uid", orderReview);
export default router;
