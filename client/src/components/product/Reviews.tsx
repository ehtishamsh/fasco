import { Reviews as ReviewType } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
function Reviews({ reviewsData }: { reviewsData: ReviewType[] }) {
  const [reviews, setReviews] = useState<ReviewType[]>(reviewsData);
  useEffect(() => {
    setReviews(reviewsData);
  }, [reviewsData]);

  return (
    <div className="mt-8 grid grid-cols-1 gap-5">
      {reviews.map((review) => (
        <div className="flex p-4 gap-6 max-sm:gap-3 bg-gray-100 rounded-xl">
          <div className="w-full flex flex-col gap-3 max-sm:gap-2">
            <div>
              <div className="flex justify-between items-center">
                <h1 className="font-semibold font-sm">
                  {review.user.firstname} {review.user.lastname}
                </h1>
                <span className="text-gray-500/45 font-semibold text-xs">
                  {new Date(review.createdAt).toDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-4 h-4 max-sm:w-3 max-sm:h-3 ${
                    i < review.rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500  max-sm:line-clamp-4">
              {review.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
