import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Select from "../../Select";
import { useEffect, useState } from "react";

const formSchema = z.object({
  ProductName: z
    .string()
    .min(1, "Product Name is required")
    .max(40, "Product Name is too long"),
  Price: z.string().min(1, "Price is required"),
  Stock: z.string().min(1, "Stock is required"),
  Description: z.string().min(1, "Description is required"),
  screenSize: z.string().min(1, "Screen Size is required"),
  cpu: z.string().min(1, "Cpu is required"),
  cores: z.string().min(1, "Cores is required"),
  mainCamera: z.string().min(1, "Main Camera is required"),
  frontCamera: z.string().optional(),
  battery: z.string().min(1, "Battery is required"),
});

interface Option {
  id: string;
  name: string;
}

function AddProduct() {
  const [selectCategory, setSelectCategory] = useState<Option | undefined>();
  const [categories, setCategories] = useState<Option[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("http://localhost:4000/api/categories");
        const res = await req.json();
        setCategories(res.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProductName: "",
      Price: "",
      Stock: "",
      Description: "",
      screenSize: "",
      cpu: "",
      cores: "",
      mainCamera: "",
      frontCamera: "",
      battery: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="mt-10 px-10">
      <div className=" flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
          <span className="text-sm text-muted-foreground">
            Add a new Product.
          </span>
        </div>
        <DropdownMenuSeparator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-3xl mx-auto w-full"
          >
            <FormField
              control={form.control}
              name="ProductName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Product name..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="Price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Price..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="Stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Stock..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenuSeparator />
            <Select
              options={categories}
              selectedOptions={selectCategory}
              setSelectedOptions={setSelectCategory}
              name="Category"
            />
            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Description..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="screenSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Screen Size</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Screen Size..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="cpu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPU</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product CPU..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="cores"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cores</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Cores..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="mainCamera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Camera</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Main Camera..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="frontCamera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Front Camera</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Front Camera..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenuSeparator />
            <FormField
              control={form.control}
              name="battery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Battery</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Battery..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="default" className="w-full mt-6">
              Add
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
