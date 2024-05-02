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
    console.log(size);
    setSelectedSize(size);
  };
  console.log(selectedSize);
  return (
    <>
      {sizes.map((item, i) => {
        return (
          <Button
            key={i}
            onClick={() => handleClick(item)}
            variant={selectedSize === item ? "default" : "outline"}
            className="w-full py-6"
          >
            {item}
          </Button>
        );
      })}
    </>
  );
}

export default SelectSize;
