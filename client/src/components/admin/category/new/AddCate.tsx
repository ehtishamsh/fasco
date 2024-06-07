import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

function AddCate() {
  const [category, setCategory] = useState("");
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory = {
      name: category,
    };
    const fetchData = async () => {
      try {
        const req = await fetch("http://localhost:4000/api/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        });
        const res = await req.json();
        console.log(res);
        if (res) {
          toast({
            title: "Category Added",
            description: "Category added successfully",
            variant: "success",
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    };

    fetchData();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category Name"
        />
        <Button type="submit" className="w-full">
          Add
        </Button>
      </form>
    </>
  );
}

export default AddCate;
