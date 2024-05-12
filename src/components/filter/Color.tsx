import React, { useState } from "react";

function Color({
  color,
  setColor,
}: {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [selectedColor, setSelectedColor] = useState(color[0]);
  const handleClick = (color: any) => {
    setSelectedColor(color);
    setColor((prev) => {
      const filter = prev.filter((item) => item !== color);
      if (prev.includes(color)) {
        return filter;
      } else {
        return [...filter, color];
      }
    });
  };
  return (
    <>
      <button
        key={color}
        type="button"
        className={`w-6 h-6 rounded-full focus:outline-none transition-all duration-200 border-2 border-foreground `}
        style={{
          backgroundColor: color,
          opacity: color === selectedColor ? 1 : 0.5,
        }}
        onClick={() => handleClick(color)}
      />
    </>
  );
}

export default Color;
