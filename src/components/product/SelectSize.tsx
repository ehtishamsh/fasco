import React from "react";
import { Button } from "../ui/button";

function SelectSize({
  sizes,
  selectedSize,
  setSelectedSize,
}: {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleClick = (size: any) => {
    setSelectedSize(size);
  };
  return (
    <>
      {sizes.map((item, i) => {
        return (
          <Button
            key={i}
            onClick={() => handleClick(item)}
            variant={selectedSize === item ? "default" : "outline"}
            className="w-full py-6 max-sm:py-2"
          >
            {item}
          </Button>
        );
      })}
    </>
  );
}

export default SelectSize;
