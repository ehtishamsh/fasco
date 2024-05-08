import { BiEdit, BiPlus, BiX } from "react-icons/bi";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

function Address() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Select Address</h1>
      <div className="grid grid-cols-1 gap-9 mt-10">
        <div className="flex gap-4 bg-gray-200/70 p-6 rounded-lg">
          <div className="flex justify-center">
            <Checkbox className="rounded-full mt-[5px] " />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="">2118 Thornridge</h1>
              <span className="bg-foreground text-sm text-white px-[8px] py-[4px] rounded-lg">
                Home
              </span>
            </div>
            <h1 className="mb-2">
              2118 Thornridge Cir. Syracuse, Connecticut 35624
            </h1>

            <span>(209) 555-0104</span>
          </div>
          <div className="flex justify-center items-center">
            <Button size={"icon"}>
              <BiEdit size={20} />
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button size={"icon"}>
              <BiX size={20} />
            </Button>
          </div>
        </div>
        <div className="flex gap-4 bg-gray-200/70 p-6 rounded-lg">
          <div className="flex justify-center">
            <Checkbox className="rounded-full mt-[5px]" />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="">2118 Thornridge</h1>
              <span className="bg-foreground text-sm text-white px-[8px] py-[4px] rounded-lg">
                Home
              </span>
            </div>
            <h1 className="mb-2">
              2118 Thornridge Cir. Syracuse, Connecticut 35624
            </h1>

            <span>(209) 555-0104</span>
          </div>
          <div className="flex justify-center items-center">
            <Button size={"icon"}>
              <BiEdit size={20} />
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button size={"icon"}>
              <BiX size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className=" w-full my-16 relative">
        <div className="relative">
          <span className="bg-gradient-to-r from-white via-transparent cursor-none pointer-events-none to-white absolute h-full w-full ">
            &nbsp;
          </span>
          <hr className=" border  border-gray-600 border-spacing-2 border-dashed z-20" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
          <Button
            className="rounded-full mt-[28px]"
            variant={"default"}
            size={"icon"}
          >
            <BiPlus size={24} />
          </Button>
          <h1 className="text-sm mt-2">Add new address</h1>
        </div>
      </div>
      <div className="flex justify-end items-center  py-10">
        <div className="w-[500px] flex items-center gap-5">
          <Button variant={"outline"} size={"lg"} className="py-6 w-full">
            Back
          </Button>
          <Button size={"lg"} className="py-6 w-full">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Address;
