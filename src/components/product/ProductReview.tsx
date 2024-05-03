import { FaStar } from "react-icons/fa6";

import React from "react";
import { Progress } from "../ui/progress";

function ProductReview() {
  return (
    <div className="max-w-6xl mx-auto px-8 bg-background py-10 ">
      <h1 className="text-2xl font-semibold mb-8">Reviews</h1>
      <div className="grid grid-cols-3 gap-20 w-full">
        <div className="col-span-1 rounded-lg p-5 bg-gray-100 flex justify-center flex-col items-center gap-4">
          <h1 className="text-7xl font-semibold">4.8</h1>
          <p className="text-sm text-gray-500">Based on 1000+ reviews</p>
          <div className="flex gap-2 justify-center items-center">
            <FaStar className="w-6 h-6 text-yellow-400/80" />
            <FaStar className="w-6 h-6 text-yellow-400/80" />
            <FaStar className="w-6 h-6 text-yellow-400/80" />
            <FaStar className="w-6 h-6 text-yellow-400/80" />
            <FaStar className="w-6 h-6 text-yellow-400/80" />
          </div>
        </div>
        <div className="col-span-2 flex justify-between">
          <div className="flex flex-col justify-between h-full min-w-[150px]">
            <h2 className="font-semibold">Excellent</h2>
            <h2 className="font-semibold">Good</h2>
            <h2 className="font-semibold">Average</h2>
            <h2 className="font-semibold">Below Average</h2>
            <h2 className="font-semibold">Poor</h2>
          </div>
          <div className="flex flex-col justify-between h-full w-full">
            <p className="mt-2">
              <Progress value={80} className="w-full" />
            </p>
            <p className="mt-2">
              <Progress value={80} className="w-full" />
            </p>
            <p className="mt-2">
              <Progress value={80} className="w-full" />
            </p>
            <p className="mt-2">
              <Progress value={80} className="w-full" />
            </p>
            <p className="mt-2">
              <Progress value={80} className="w-full" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductReview;
