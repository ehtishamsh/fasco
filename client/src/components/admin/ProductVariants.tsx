import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Variant {
  id: number;
  variant: string;
  price: string;
}
const ProductVariants = ({
  variants,
  setVariants,
}: {
  variants: Variant[];
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
}) => {
  const [newVariantName, setNewVariantName] = useState<string>("");
  const [newVariantPrice, setNewVariantPrice] = useState<string>("");

  const handleAddVariant = () => {
    if (newVariantName.trim() !== "" && newVariantPrice.trim() !== "") {
      const newVariant: Variant = {
        id: variants.length + 1, // Generate a unique ID for the variant
        variant: newVariantName,
        price: newVariantPrice, // Convert price to number
      };
      setVariants([...variants, newVariant]);
      setNewVariantName("");
      setNewVariantPrice("");
    }
  };

  const handleRemoveVariant = (id: number) => {
    const updatedVariants = variants.filter((variant) => variant.id !== id);
    setVariants(updatedVariants);
  };

  return (
    <div className="space-y-4 flex flex-col mt-2 mb-3">
      <div className="flex space-x-4">
        <Input
          type="text"
          value={newVariantName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewVariantName(e.target.value)
          }
          placeholder="Enter Variant Name"
        />
        <Input
          type="text"
          value={newVariantPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewVariantPrice(e.target.value)
          }
          placeholder="Enter Variant Price"
        />
      </div>
      <Button type="button" onClick={handleAddVariant} variant={"default"}>
        Add Variant
      </Button>
      <div className="space-y-2">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md"
          >
            <div>
              <span className="font-medium">{variant.variant}</span>{" "}
              <span className="text-gray-500">(${variant.price})</span>
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

export default ProductVariants;
