import Lottie from "lottie-react";
import BG from "../animation/bg.json";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
function Form() {
  return (
    <div className=" overflow-hidden  mb-20 bg-center">
      <div className="max-w-6xl mx-auto">
        <div className="w-full h-full grid grid-cols-2">
          <div className="overflow-hidden rounded-md  border border-border">
            <Lottie
              animationData={BG}
              className=" h-full left-0  w-full"
              loop
              autoplay
            />
          </div>
          <div className="border border-border ">
            <div className="flex  flex-col items-center justify-center h-full p-8">
              <img src="/logo.png" className="max-w-[100px]" alt="" />
              <h1 className="text-2xl  mt-6">Sign in</h1>
              <p className="text-sm mt-2 text-gray-400">
                Sign in to your account
              </p>
              <form action="" className="w-full px-28  mt-8">
                <Label
                  className="mt-6 text-gray-400 font-normal text-sm"
                  htmlFor="email"
                >
                  Email:
                </Label>
                <Input
                  type="text"
                  id="email"
                  className="mb-4"
                  placeholder="Enter your Email"
                />
                <Label
                  className="mt-6 text-gray-400 font-normal text-sm"
                  htmlFor="password"
                >
                  Password:
                </Label>
                <Input
                  type="password"
                  id="password"
                  className=""
                  placeholder="Enter your Password"
                />
                <Button className="mt-6 w-full">Sign in</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
