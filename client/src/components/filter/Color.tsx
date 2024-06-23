import React, { useState } from "react";

interface ColorProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string[]>>;
}

const Color: React.FC<ColorProps> = ({ color, setColor }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const handleClick = () => {
    setColor((prevColors) => {
      if (prevColors.includes(color)) {
        return prevColors.filter((c) => c !== color);
      } else {
        setSelected([...selected, color]);
        return [...prevColors, color];
      }
    });
  };

  return (
    <div
      className={`w-6 h-6 rounded-full cursor-pointer border border-gray-300 ${
        selected.includes(color) ? "border-blue-500" : "opacity-50"
      }`}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    />
  );
};

export default Color;
