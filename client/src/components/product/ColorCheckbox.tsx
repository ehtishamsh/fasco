import React, { useState } from "react";

const ColorCheckbox = ({
  colors,
  onChange,
}: {
  colors: string[];
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleClick = (color: any) => {
    setSelectedColor(color);
    onChange(color);
  };

  return (
    <div className="flex space-x-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={`w-8 h-8 rounded-full focus:outline-none transition-all duration-200 ${color} ${
            color === selectedColor
              ? "bg-opacity-100 border-2 border-foreground"
              : "bg-opacity-50"
          }`}
          onClick={() => handleClick(color)}
        />
      ))}
    </div>
  );
};

export default ColorCheckbox;
