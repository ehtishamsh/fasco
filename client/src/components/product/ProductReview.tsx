import { Progress } from "../ui/progress";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Reviews as ReviewType } from "@/lib/redux/types";

function ProductReview() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({
    excellent: 0,
    good: 0,
    average: 0,
    belowAverage: 0,
    poor: 0,
  });

  const { title: slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(
          "http://localhost:4000/api/reviews/product/" + slug,
          {
            method: "GET",
          }
        );
        const res = await req.json();
        setReviews(res.reviews);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      let sum = 0;
      const distribution = {
        excellent: 0,
        good: 0,
        average: 0,
        belowAverage: 0,
        poor: 0,
      };

      reviews.forEach((r) => {
        sum += r.rating;
        if (r.rating === 5) {
          distribution.excellent += 1;
        } else if (r.rating === 4) {
          distribution.good += 1;
        } else if (r.rating === 3) {
          distribution.average += 1;
        } else if (r.rating === 2) {
          distribution.belowAverage += 1;
        } else if (r.rating === 1) {
          distribution.poor += 1;
        }
      });

      setAverageRating(sum / reviews.length);
      const totalReviews = reviews.length || 1; // Prevents division by zero

      setRatingDistribution({
        excellent: (distribution.excellent / totalReviews) * 100,
        good: (distribution.good / totalReviews) * 100,
        average: (distribution.average / totalReviews) * 100,
        belowAverage: (distribution.belowAverage / totalReviews) * 100,
        poor: (distribution.poor / totalReviews) * 100,
      });
    }
  }, [reviews]);
  console.log(ratingDistribution);

  return (
    <div className="max-w-6xl mx-auto px-8  max-sm:px-4 bg-background py-10 ">
      <h1 className="text-2xl font-semibold mb-8">Reviews</h1>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-20 w-full">
        <div className="col-span-1 w-full rounded-lg p-5 bg-gray-100 flex justify-center flex-col max-md:flex-row max-sm:flex-col items-center gap-4">
          <div className="flex justify-center flex-col">
            <h1 className="text-7xl font-semibold text-center max-md:text-6xl max-sm:text-5xl">
              {averageRating}
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Based on {reviews.length} reviews
            </p>
          </div>
          <div className="flex gap-1 justify-center items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`cursor-pointer w-8 h-8 ${
                  i <= averageRating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927a.75.75 0 011.902 0l1.03 3.17a.75.75 0 00.708.515h3.346c.658 0 .936.84.404 1.196l-2.707 1.83a.75.75 0 00-.272.832l1.03 3.17c.21.646-.54 1.185-1.104.832l-2.707-1.83a.75.75 0 00-.884 0l-2.707 1.83c-.564.353-1.314-.186-1.104-.832l1.03-3.17a.75.75 0 00-.272-.832L3.51 7.808c-.532-.356-.254-1.196.404-1.196h3.346a.75.75 0 00.708-.515l1.03-3.17z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="col-span-2 max-md:col-span-1 flex justify-between">
          <div className="flex flex-col justify-between h-full min-w-[150px] max-sm:w-fit">
            <h2 className="font-semibold max-sm:text-sm">Excellent</h2>
            <h2 className="font-semibold max-sm:text-sm">Good</h2>
            <h2 className="font-semibold max-sm:text-sm">Average</h2>
            <h2 className="font-semibold max-sm:text-sm">Below Average</h2>
            <h2 className="font-semibold max-sm:text-sm">Poor</h2>
          </div>
          <div className="flex flex-col justify-between h-full w-full">
            <p className="mt-2">
              <Progress
                value={ratingDistribution.excellent}
                className="w-full"
              />
            </p>
            <p className="mt-2">
              <Progress value={ratingDistribution.good} className="w-full" />
            </p>
            <p className="mt-2">
              <Progress value={ratingDistribution.average} className="w-full" />
            </p>
            <p className="mt-2">
              <Progress
                value={ratingDistribution.belowAverage}
                className="w-full"
              />
            </p>
            <p className="mt-2">
              <Progress value={ratingDistribution.poor} className="w-full" />
            </p>
          </div>
        </div>
      </div>

      {reviews.length > 0 ? (
        <Reviews reviewsData={reviews} />
      ) : (
        <h1 className="text-center text-gray-500 text-xl mt-12 font-semibold ">
          No reviews yet
        </h1>
      )}
    </div>
  );
}

export default ProductReview;
