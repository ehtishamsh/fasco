import Lottie from "lottie-react";
import BG from "../animation/bg.json";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Reveal } from "../animation/Reveal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "../ui/use-toast";
function Form() {
  const [details, setDetails] = useState<{
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
  }>({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
  });
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password, repeatPassword, name } = details;
    if (password !== repeatPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please enter the same password in both fields.",
        variant: "destructive",
      });
    } else if (password.length < 4 || repeatPassword.length < 4) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
    } else if (name.length < 3) {
      toast({
        title: "Name too short",
        description: "Name must be at least 3 characters.",
        variant: "destructive",
      });
    } else {
      try {
        const req = await fetch("http://localhost:4000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name,
          }),
        });
        if (req.status === 200) {
          toast({
            title: "Account created successfully",
            description: "Please login with your credentials.",
            variant: "success",
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  return (
    <Reveal width="100%">
      <div className=" overflow-hidden  mb-20 max-sm:mb-10 bg-center">
        <div className="max-w-6xl mx-auto">
          <div className="w-full h-full grid grid-cols-2 max-md:grid-cols-1">
            <div className="overflow-hidden rounded-md  border border-border">
              <Lottie
                animationData={BG}
                className=" h-full  w-full"
                loop
                autoplay
              />
            </div>
            <div className="border border-border ">
              <div className="flex  flex-col items-center justify-center h-full p-8 max-md:p-6 max-sm:p-4">
                <img src="/logo.png" className="max-w-[100px]" alt="" />
                <h1 className="text-2xl mt-6 max-sm:mt-4">Sign up</h1>
                <p className="text-sm mt-2 text-gray-400">
                  Create your account to get started.
                </p>
                <form
                  onSubmit={handleSubmit}
                  action=""
                  className="w-full px-28 max-sm:px-10 max-md:px-16  mt-8 max-sm:mt-6"
                >
                  <Label
                    className="mt-6 max-sm:mt-4 text-gray-400 font-normal text-sm"
                    htmlFor="name"
                  >
                    Full Name:
                  </Label>
                  <Input
                    value={details.name}
                    onChange={(e) =>
                      setDetails({ ...details, name: e.target.value })
                    }
                    type="text"
                    id="name"
                    className="mb-4"
                    placeholder="Enter your Full Name"
                  />
                  <Label
                    className="mt-6 max-sm:mt-4 text-gray-400 font-normal text-sm"
                    htmlFor="email"
                  >
                    Email:
                  </Label>
                  <Input
                    type="text"
                    id="email"
                    value={details.email}
                    onChange={(e) =>
                      setDetails({ ...details, email: e.target.value })
                    }
                    className="mb-4"
                    placeholder="Enter your Email"
                  />
                  <Label
                    className="mt-6 max-sm:mt-4 text-gray-400 font-normal text-sm"
                    htmlFor="password"
                  >
                    Password:
                  </Label>
                  <Input
                    type="password"
                    value={details.password}
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                    id="password"
                    className=""
                    placeholder="Enter your Password"
                  />
                  <div className="mt-4">
                    <Label
                      className="  text-gray-400 font-normal text-sm"
                      htmlFor="repassword"
                    >
                      Re-enter Password:
                    </Label>
                    <Input
                      value={details.repeatPassword}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          repeatPassword: e.target.value,
                        })
                      }
                      type="password"
                      id="repassword"
                      className=""
                      placeholder="Re-enter your Password"
                    />
                  </div>
                  <Button className="mt-6 max-sm:mt-4 w-full">Sign up</Button>
                  <p className="text-sm mt-4 text-center text-gray-400">
                    Already have an account?{" "}
                    <Link to={"/signin"} className="underline">
                      Sign in
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default Form;
