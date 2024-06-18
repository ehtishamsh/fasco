import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BreadCrumbAdmin } from "../../BreadCrumAdmin";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Category Name is required")
    .max(40, "Category Name is too long"),
});
function AddCate() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newCategory = {
      name: values.name,
    };
    const fetchData = async () => {
      try {
        const req = await fetch("http://localhost:4000/api/categories/new", {
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
          setTimeout(() => {
            form.reset();
            window.location.href = "/admin/categories";
          }, 2000);
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
    <div className="mt-10 px-10">
      <div className=" flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <BreadCrumbAdmin paths={["Admin", "Categories"]} end={"Add"} />
          <h1 className="text-3xl font-bold tracking-tight">Add Category</h1>
          <span className="text-sm text-muted-foreground">
            Add a new category.
          </span>
        </div>
        <DropdownMenuSeparator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-3xl mx-auto w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your category name..."
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

export default AddCate;
