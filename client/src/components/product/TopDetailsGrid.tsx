import { Product } from "@/lib/redux/types";
import { BsPhoneFill } from "react-icons/bs";
import { BsCpu } from "react-icons/bs";
import { GoCpu } from "react-icons/go";
import { IoMdCamera } from "react-icons/io";
import { IoMdReverseCamera } from "react-icons/io";
import { PiBatteryVerticalHighBold } from "react-icons/pi";

function TopDetailsGrid({ data }: { data: Product }) {
  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3 gap-4 mt-6">
      <div className="flex justify-start items-center gap-2 p-3 bg-gray-200/50 rounded-md">
        <span>
          <BsPhoneFill
            size={24}
            className="text-gray-800/75 max-sm:text-base"
          />
        </span>
        <div className="flex flex-col text-sm max-md:text-xs">
          <span className="text-gray-400">Screen Size</span>
          <span>{data.screenSize}"</span>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2 p-3 bg-gray-200/50 rounded-md">
        <span>
          <BsCpu size={24} className="text-gray-800/75 max-sm:text-base" />
        </span>
        <div className="flex flex-col text-sm max-md:text-xs">
          <span className="text-gray-400">CPU</span>
          <span>{data.cpu}</span>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2 p-3 bg-gray-200/50 rounded-md">
        <span>
          <GoCpu size={24} className="text-gray-800/75 max-sm:text-base" />
        </span>
        <div className="flex flex-col text-sm max-md:text-xs">
          <span className="text-gray-400">Cores</span>
          <span>{data.cores}</span>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2 p-3 bg-gray-200/50 rounded-md">
        <span>
          <IoMdCamera size={24} className="text-gray-800/75 max-sm:text-base" />
        </span>
        <div className="flex flex-col text-sm max-md:text-xs">
          <span className="text-gray-400">Main Camera</span>
          <span>{data.mainCamera}</span>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2 p-3 bg-gray-200/50 rounded-md">
        <span>
          <IoMdReverseCamera
            size={24}
            className="text-gray-800/75 max-sm:text-base"
          />
        </span>
        <div className="flex flex-col text-sm max-md:text-xs">
          <span className="text-gray-400">Front Camera</span>
          <span>{data.frontCamera}</span>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2 p-3 bg-gray-200/50 rounded-md">
        <span>
          <PiBatteryVerticalHighBold
            size={24}
            className="text-gray-800/75 max-sm:text-base"
          />
        </span>
        <div className="flex flex-col text-sm max-md:text-xs">
          <span className="text-gray-400">Battery</span>
          <span>{data.battery}</span>
        </div>
      </div>
    </div>
  );
}

export default TopDetailsGrid;
