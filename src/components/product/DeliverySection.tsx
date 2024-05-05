import { GoVerified } from "react-icons/go";
import { PiWarehouseLight } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";

const data = [
  {
    id: 1,
    title: "Free Delivery",
    icon: <CiDeliveryTruck className="text-2xl text-gray-500" />,
    text: "1-2 day",
  },
  {
    id: 2,
    title: "In Stock",
    icon: <PiWarehouseLight className="text-2xl text-gray-500" />,
    text: "Today",
  },
  {
    id: 3,
    title: "Guaranteed",
    icon: <GoVerified className="text-2xl text-gray-500" />,
    text: "1 Year",
  },
];
function DeliverySection() {
  const mapData = data.map((item) => {
    return (
      <div
        className="flex max-sm:flex-col  gap-4 max-sm:justify-center max-sm:items-center"
        key={item.id}
      >
        <span className=" flex justify-center py-4 px-5 max-sm:py-4 max-sm:px-5 max-sm:w-full rounded-lg items-center bg-gray-200/50 col-span-1">
          {item.icon}
        </span>
        <div className="flex flex-col text-sm max-sm:text-xs  justify-center gap-1 w-full">
          <p className="text-gray-500">{item.title}</p>
          <p>{item.text}</p>
        </div>
      </div>
    );
  });
  return <>{mapData}</>;
}

export default DeliverySection;
