import React from "react";
import { Button } from "../ui/button";

interface Size {
  id: string;
  name: string;
  price: string;
}
function SelectSize({
  sizes,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  const handleClick = (size: any) => {
    setSelectedSize(size);
  };
  return (
    <>
      {sizes.map((item) => {
        return (
          <Button
            key={item.id}
            onClick={() => handleClick(item)}
            variant={selectedSize.name === item.name ? "default" : "outline"}
            className="w-full py-6 max-sm:py-2"
          >
            {item.name} : ${item.price}
          </Button>
        );
      })}
    </>
  );
}

export default SelectSize;
