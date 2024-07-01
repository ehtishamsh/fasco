import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { toast } from "../ui/use-toast";
import { Address, User } from "@/lib/redux/types";

const formSchema = z.object({
  firstname: z.string().min(1, {
    message: "First name is required.",
  }),
  lastname: z.string().min(1, {
    message: "Last name is required.",
  }),
  addressLine1: z.string().min(1, {
    message: "Address Line 1 is required.",
  }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
  postalCode: z.string().min(1, {
    message: "Postal Code is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
});

export function AddModal() {
  const [checkClick, setCheckClick] = useState<{ [key: string]: boolean }>({
    default: false,
    billing: false,
    shipping: false,
  });
  const [existingAddress, setExistingAddress] = useState<Address[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      const fetchData = async () => {
        try {
          const req = await fetch(
            `http://localhost:4000/api/address/user/${user.id}`
          );
          const res = await req.json();
          if (res) {
            setExistingAddress(res.address);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }

    return () => {};
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    //Check if address already exists and its default
    const addressExists = existingAddress.find((address) => address.default);
    if (addressExists) {
      toast({
        title: "Error",
        description: "Default address already exists",
        variant: "destructive",
      });
      return null;
    }

    const newAddress = {
      firstname: values.firstname,
      lastname: values.lastname,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      country: values.country,
      defaultAddress: checkClick.default,
      billing: checkClick.billing,
      shipping: checkClick.shipping,
      userId: user.id,
    };
    try {
      const req = await fetch(`http://localhost:4000/api/address/new`, {
        method: "POST",
        body: JSON.stringify(newAddress),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      if (res) {
        toast({
          title: "Address Added",
          description: "Address added successfully",
          variant: "success",
        });
        form.reset();
        setCheckClick({
          default: false,
          billing: false,
          shipping: false,
        });
        setTimeout(() => {
          window.location.reload();
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
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-sm:max-w-[350px]  max-sm:!p-3">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
          <DialogDescription>
            Add a new address to your account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-sm:space-y-2 "
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-[2.5] max-sm:space-y-1">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="max-sm:text-xs">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="max-sm:py-1 max-sm:text-xs max-sm:!mt-1"
                          placeholder="Enter your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="max-sm:text-xs">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="max-sm:py-1 max-sm:text-xs max-sm:!mt-1"
                          placeholder="Enter your last name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="max-sm:text-xs">
                        Address Line 1
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="max-sm:py-1 max-sm:text-xs max-sm:!mt-1"
                          placeholder="123 Main St"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="max-sm:text-xs">
                        Address Line 2(Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="max-sm:py-1 max-sm:text-xs max-sm:!mt-1"
                          placeholder="Apt 4B"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-[2.5] max-sm:space-y-1">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="max-sm:text-xs">City</FormLabel>
                      <FormControl>
                        <Input
                          className="max-sm:py-1 max-sm:text-xs max-sm:!mt-1"
                          placeholder="New York"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="max-sm:text-xs">State</FormLabel>
                      <FormControl>
                        <Input
                          className="max-sm:py-1 max-sm:text-xs max-sm:!mt-1"
                          placeholder="NY"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="max-sm:text-xs">Country</FormLabel>
                      <FormControl>
                        <Input
                          className="max-sm:py-1 max-sm:text-xs max-sm:!mt-1"
                          placeholder="USA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="max-sm:text-xs">
                        Postal Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="max-sm:py-1 max-sm:text-xs max-sm:!mt-1"
                          placeholder="10001"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={`${
                  checkClick.default === true ? "default" : "outline"
                }`}
                className="col-span-2  max-sm:text-xs"
                type="button"
                onClick={() =>
                  setCheckClick((prev) => ({ ...prev, default: !prev.default }))
                }
              >
                Default
              </Button>
              <Button
                type="button"
                className="max-sm:text-xs"
                variant={`${
                  checkClick.shipping === true ? "default" : "outline"
                }`}
                onClick={() =>
                  setCheckClick((prev) => ({
                    ...prev,
                    shipping: !prev.shipping,
                  }))
                }
              >
                SHIPPING
              </Button>
              <Button
                type="button"
                className="max-sm:text-xs"
                variant={`${
                  checkClick.billing === true ? "default" : "outline"
                }`}
                onClick={() =>
                  setCheckClick((prev) => ({ ...prev, billing: !prev.billing }))
                }
              >
                BILLING
              </Button>
            </div>
            <Separator className="!mb-4 !mt-8  max-sm:!my-2" />
            <DialogFooter>
              <Button type="submit" className="mt-4">
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
