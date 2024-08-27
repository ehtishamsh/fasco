import { Request, Response } from "express";
import { findUserByID } from "../services/User";
import { getOrderByUserID } from "../services/Order";
import { findProductBySlug } from "../services/Product";
import { getReviewsByUserID } from "../services/Review";

export async function orderReview(req: Request, res: Response) {
  const { userid } = req.params;

  try {
    const checkUser = await findUserByID(userid);
    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const orders = await getOrderByUserID(userid);
    if (!orders) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    const getReviews = await getReviewsByUserID(userid);

    if (!getReviews) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
    const checkIfReviewed = orders.map((order) => {
      // Map through each item in the order
      const updatedItems = order.items?.map((item) => {
        // Check if there is a review for this product
        const isReviewed = getReviews.some(
          (review) => review.productId === item.product.id
        );

        // Return the item with the 'reviewed' property set accordingly
        return {
          ...item,
          reviewed: isReviewed, // true if reviewed, false if not
        };
      });

      // Return the updated order with the modified items
      return {
        ...order,
        items: updatedItems,
      };
    });

    if (checkIfReviewed) {
      return res.status(400).json({
        status: 400,
        message: "You have already reviewed this product",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
}
