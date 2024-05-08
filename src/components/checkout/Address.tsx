import { BiEdit, BiX } from "react-icons/bi";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

function Address() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Select Address</h1>
      <div className="grid grid-cols-1 gap-9 mt-10">
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
    </div>
  );
}

export default Address;
