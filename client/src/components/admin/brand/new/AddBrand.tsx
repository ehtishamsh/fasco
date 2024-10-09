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
    .min(1, "Brand Name is required")
    .max(40, "Brand Name is too long"),
});
function AddBrand() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newBrand = {
      name: values.name,
    };
    const fetchData = async () => {
      try {
        const req = await fetch(
          "https://fascobackend-production.up.railway.app/api/brands/new",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBrand),
          }
        );
        const res = await req.json();

        if (res) {
          toast({
            title: "Brand Added",
            description: "Brand added successfully",
            variant: "success",
          });
          setTimeout(() => {
            form.reset();
            window.location.href = "/admin/brands";
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
    <div className="mt-10 px-10 max-sm:px-4">
      <div className=" flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <BreadCrumbAdmin paths={["Admin", "Brands"]} end={"Add"} />
          <h1 className="text-3xl font-bold tracking-tight max-sm:text-xl">
            Add Brand
          </h1>
          <span className="text-sm text-muted-foreground">
            Add a new Brand.
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
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Brand name..."
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

export default AddBrand;
