import { Request, Response } from "express";
import { findUserByID } from "../services/User";
import { getOrderByUserID } from "../services/Order";
import { findProductBySlug } from "../services/Product";
import { getReviewsByUserID } from "../services/Review";

export async function orderReview(req: Request, res: Response) {
  const { uid } = req.params;

  try {
    const checkUser = await findUserByID(uid);
    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const orders = await getOrderByUserID(uid);
    if (!orders) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
    const getReviews = await getReviewsByUserID(uid);

    if (!getReviews) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
    const checkIfComplete = orders.filter(
      (order) => order.orderStatus === "COMPLETED"
    );
    if (checkIfComplete.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No orders or reviews found for this user",
      });
    }
    const checkIfReviewed = checkIfComplete.map((order) => {
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

    if (checkIfReviewed.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No orders or reviews found for this user",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Reviews fetched successfully",
      orders: checkIfReviewed,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
}

// export async function (req: Request, res: Response) {
//   const { id } = req.params;
// }
