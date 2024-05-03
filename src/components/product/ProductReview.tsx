import { FaStar } from "react-icons/fa6";

import React from "react";
import { Progress } from "../ui/progress";

function ProductReview() {
  return (
    <div className="max-w-6xl mx-auto px-8  max-sm:px-4 bg-background py-10 ">
      <h1 className="text-2xl font-semibold mb-8">Reviews</h1>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-20 w-full">
        <div className="col-span-1 w-full rounded-lg p-5 bg-gray-100 flex justify-center flex-col max-md:flex-row max-sm:flex-col items-center gap-4">
          <div className="flex justify-center flex-col">
            <h1 className="text-7xl font-semibold text-center max-md:text-6xl max-sm:text-5xl">
              4.8
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Based on 1000+ reviews
            </p>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <FaStar className="w-6 h-6 text-yellow-400/80" />
            <FaStar className="w-6 h-6 text-yellow-400/80" />
            <FaStar className="w-6 h-6 text-yellow-400/80" />
            <FaStar className="w-6 h-6 text-yellow-400/80" />
            <FaStar className="w-6 h-6 text-yellow-400/80" />
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
