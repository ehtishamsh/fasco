import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  ProductName: z
    .string()
    .min(1, "Product Name is required")
    .max(40, "Product Name is too long"),
});
function AddProduct() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProductName: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className=" flex flex-col gap-5 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Add Produt</h1>
        <span className="text-sm text-muted-foreground">
          Add a new Product.
        </span>
      </div>
      <DropdownMenuSeparator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
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
                    className="max-w-96"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DropdownMenuSeparator />
          <Button variant="default" className="max-w-96">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddProduct;
