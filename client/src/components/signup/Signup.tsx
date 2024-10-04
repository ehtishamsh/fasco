import Lottie from "lottie-react";
import BG from "../animation/bg.json";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Reveal } from "../animation/Reveal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "../ui/use-toast";
const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
function Signup() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await fetch(
        "https://fascobackend-production.up.railway.app/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "User created successfully",
          variant: "success",
        });
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while creating the user",
        variant: "destructive",
      });
    }
  }

  return (
    <Reveal width="100%">
      <div className=" overflow-hidden  mb-20 max-sm:mb-10 bg-center px-5">
        <div className="max-w-6xl mx-auto">
          <div className="w-full h-full grid grid-cols-2 max-md:grid-cols-1">
            <div className="overflow-hidden rounded-md  border border-border">
              <Lottie
                animationData={BG}
                className=" h-full w-full object-cover"
                loop
                autoplay
              />
            </div>
            <div className="border border-border ">
              <div className="flex  flex-col items-center justify-center h-full p-8 max-md:p-6 max-sm:p-4">
                <img src="/logo.png" className="max-w-[100px]" alt="" />
                <h1 className="text-2xl mt-6 max-sm:mt-4">Sign up</h1>
                <p className="text-sm mt-2 text-gray-400 mb-4">
                  Create your account to get started.
                </p>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full px-28 max-sm:px-10 max-md:px-16 space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default Signup;
