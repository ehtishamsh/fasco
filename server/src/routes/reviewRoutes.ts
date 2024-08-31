import { Router } from "express";
import {
  addReview,
  getReviewsByOrderID,
  orderReview,
} from "../controllers/reviewController";

const router = Router();

router.get("/reviews/user/:uid", orderReview);
router.post("/reviews", addReview);
router.get("/reviews/:id", getReviewsByOrderID);
export default router;
