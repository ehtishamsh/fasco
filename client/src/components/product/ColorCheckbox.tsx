import React, { useState } from "react";

interface Color {
  id: string;
  name: string;
}
const ColorCheckbox = ({
  colors,
  onChange,
}: {
  colors: Color[];
  onChange: React.Dispatch<React.SetStateAction<Color>>;
}) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleClick = (color: any) => {
    setSelectedColor(color);
    onChange(color);
  };

  return (
    <div className="flex space-x-2">
      {colors.map((color, index) => (
        <button
          key={index}
          type="button"
          className={`w-8 h-8 rounded-full focus:outline-none transition-all duration-200  ${
            color.name === selectedColor.name
              ? "bg-opacity-100 border-2 border-foreground"
              : "bg-opacity-50"
          }`}
          style={{ backgroundColor: color.name }}
          onClick={() => handleClick(color)}
        />
      ))}
    </div>
  );
};

export default ColorCheckbox;
