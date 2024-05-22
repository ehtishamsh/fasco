import { BsPhoneFill } from "react-icons/bs";
import { BsCpu } from "react-icons/bs";
import { GoCpu } from "react-icons/go";
import { IoMdCamera } from "react-icons/io";
import { IoMdReverseCamera } from "react-icons/io";
import { PiBatteryVerticalHighBold } from "react-icons/pi";

const data = [
  {
    Icon: (
      <BsPhoneFill size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
    label: "Screen Size",
    value: '6.5"',
  },
  {
    Icon: <BsCpu size={24} className="text-gray-800/75 max-sm:text-base" />,
    label: "CPU",
    value: "A16 Bionic",
  },
  {
    Icon: <GoCpu size={24} className="text-gray-800/75 max-sm:text-base" />,
    label: "Cores",
    value: "6",
  },
  {
    Icon: (
      <IoMdCamera size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
    label: "Main Camera",
    value: "48MP",
  },
  {
    Icon: (
      <IoMdReverseCamera
        size={24}
        className="text-gray-800/75 max-sm:text-base"
      />
    ),
    label: "Front Camera",
    value: "12MP",
  },
  {
    Icon: (
      <PiBatteryVerticalHighBold
        size={24}
        className="text-gray-800/75 max-sm:text-base"
      />
    ),
    label: "Battery",
    value: "5000mAh",
  },
];
function TopDetailsGrid() {
  // Data array containing icon components and corresponding data

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3 gap-4 mt-6">
      {/* Mapping over the data array to render each item */}
      {data.map((item, index) => (
        <div
          key={index}
          className="flex justify-start items-center gap-2 p-3 bg-gray-200/50 rounded-md"
        >
          <span>
            {/* Dynamically rendering the icon component */}
            {item.Icon}
          </span>
          <div className="flex flex-col text-sm  max-md:text-xs">
            <span className="text-gray-400">{item.label}</span>
            <span>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopDetailsGrid;