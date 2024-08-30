import React, { useState } from "react";
import { Input } from "../ui/input";

const StarRating = ({
  productId,
  ratings,
  setRatings,
  comment,
  setComment,
}: {
  productId: string;
  ratings: { [key: string]: number };
  setRatings: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  comment: { [key: string]: string };
  setComment: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}) => {
  const [hover, setHover] = useState<{ [key: string]: number }>({});

  const handleRating = (productId: string, ratingValue: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: ratingValue,
    }));
  };

  const handleHover = (productId: string, ratingValue: number) => {
    setHover((prevHover) => ({
      ...prevHover,
      [productId]: ratingValue,
    }));
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            <svg
              key={index}
              onMouseEnter={() => handleHover(productId, ratingValue)}
              onMouseLeave={() => handleHover(productId, 0)}
              onClick={() => handleRating(productId, ratingValue)}
              className={`cursor-pointer w-8 h-8 ${
                ratingValue <= (hover[productId] || ratings[productId])
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927a.75.75 0 011.902 0l1.03 3.17a.75.75 0 00.708.515h3.346c.658 0 .936.84.404 1.196l-2.707 1.83a.75.75 0 00-.272.832l1.03 3.17c.21.646-.54 1.185-1.104.832l-2.707-1.83a.75.75 0 00-.884 0l-2.707 1.83c-.564.353-1.314-.186-1.104-.832l1.03-3.17a.75.75 0 00-.272-.832L3.51 7.808c-.532-.356-.254-1.196.404-1.196h3.346a.75.75 0 00.708-.515l1.03-3.17z" />
            </svg>
          );
        })}
      </div>
      <div className="flex flex-col justify-center gap-1 mt-2">
        <span className="text-gray-500 text-xs mb-2">Comment :</span>
        <Input
          type="text"
          value={comment[productId] || ""}
          onChange={(e) =>
            setComment((prev) => {
              return { ...prev, [productId]: e.target.value };
            })
          }
        />
      </div>
    </>
  );
};

export default StarRating;
