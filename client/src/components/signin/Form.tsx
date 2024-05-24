import Lottie from "lottie-react";
import BG from "../animation/bg.json";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Reveal } from "../animation/Reveal";
import { Link } from "react-router-dom";
import { useState } from "react";
function Form() {
  const [details, setDetails] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = details;
    if (email === "") {
      alert("Please enter email");
    } else if (password === "") {
      alert("Please enter password");
    } else if (email && password) {
      alert("Login successful");
    }
    const res = await fetch(`http://localhost:4000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      console.error("Login failed");
    }
    console.log(data);
    setDetails({ email: "", password: "" });
  };
  return (
    <Reveal width="100%">
      <div className=" overflow-hidden  mb-20 max-sm:mb-10 bg-center">
        <div className="max-w-6xl mx-auto">
          <div className="w-full h-full grid grid-cols-2 max-md:grid-cols-1">
            <div className="overflow-hidden rounded-md  border border-border">
              <Lottie
                animationData={BG}
                className=" h-full left-0  w-full"
                loop
                autoplay
              />
            </div>
            <div className="border border-border ">
              <div className="flex  flex-col items-center justify-center h-full p-8 max-md:p-6 max-sm:p-4">
                <img src="/logo.png" className="max-w-[100px]" alt="" />
                <h1 className="text-2xl mt-6 max-sm:mt-4">Sign in</h1>
                <p className="text-sm mt-2 text-gray-400">
                  Sign in to your account
                </p>
                <form
                  onSubmit={onSubmit}
                  className="w-full px-28 max-sm:px-10 max-md:px-16  mt-8 max-sm:mt-6"
                >
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
                    onChange={(e) => {
                      setDetails({ ...details, email: e.target.value });
                    }}
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
                    id="password"
                    value={details.password}
                    onChange={(e) => {
                      setDetails({ ...details, password: e.target.value });
                    }}
                    className=""
                    placeholder="Enter your Password"
                  />
                  <Button className="mt-6 max-sm:mt-4 w-full">Sign in</Button>
                  <p className="text-sm mt-4 text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="underline">
                      Sign up
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
