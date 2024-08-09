import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Color {
  id: number | string;
  color: string;
}

const ProductColor = ({
  color,
  setcolor,
}: {
  color: Color[];
  setcolor: React.Dispatch<React.SetStateAction<Color[]>>;
}) => {
  const [newColorName, setNewColorName] = useState<string>("");

  const handleAddVariant = () => {
    if (newColorName.trim() !== "") {
      const newVariant: Color = {
        id: color.length + 1,
        color: newColorName,
      };
      setcolor([...color, newVariant]);
      setNewColorName("");
    }
  };

  useEffect(() => {
    if (color.length > 0) {
      setNewColorName(color[color.length - 1].color);
    }
  }, [color]);
  const handleRemoveVariant = (id: number | string) => {
    const updatedcolor = color.filter((variant) => variant.id !== id);
    setcolor(updatedcolor);
  };

  return (
    <div className="space-y-4 flex flex-col mt-2 mb-3">
      <div className="flex space-x-4">
        <Input
          type="text"
          value={newColorName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewColorName(e.target.value)
          }
          placeholder="Enter Color Code"
        />
      </div>
      <Button type="button" onClick={handleAddVariant} variant={"default"}>
        Add Color
      </Button>
      <div className="space-y-2">
        {color.map((variant) => (
          <div
            key={variant.id}
            className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md"
          >
            <div>
              <span className="font-medium flex gap-3 justify-center items-center">
                {variant.color}
                <span
                  className="rounded-full w-3 h-3 block"
                  style={{ background: variant.color }}
                >
                  &nbsp;
                </span>
              </span>
            </div>
            <Button
              type="button"
              onClick={() => handleRemoveVariant(variant.id)}
              variant={"destructive"}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductColor;
