import { Link } from "react-router-dom";
import { IoCameraOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { BsController, BsSmartwatch } from "react-icons/bs";
import { IoLaptopOutline } from "react-icons/io5";
import { CiHeadphones } from "react-icons/ci";

function Category() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-10 max-sm:mt-5 px-2 py-7 max-sm:py-5">
        <h1 className="text-xl font-semibold max-sm:text-base">
          Browse By Category
        </h1>
        <div className="grid grid-cols-6 gap-5 mt-12 max-md:grid-cols-3 max-sm:grid-cols-2">
          <Link
            to={"/smartphones"}
            className="flex justify-center  items-center flex-col gap-4 bg-gray-100 transition-all duration-300 hover:scale-105  hover:shadow-md  rounded-md text-black py-6 px-2 max-sm:py-3"
          >
            <IoPhonePortraitOutline className="text-4xl max-md:text-3xl max-sm:text-2xl" />
            <p className="font-semibold text-sm">Smartphones</p>
          </Link>

          <Link
            to={"/smartwatches"}
            className="flex justify-center  items-center flex-col gap-4 bg-gray-100 transition-all duration-300 hover:scale-105  hover:shadow-md  rounded-md text-black py-6 px-2 max-sm:py-3"
          >
            <BsSmartwatch className="text-4xl max-md:text-3xl max-sm:text-2xl" />
            <p className="font-semibold text-sm">Smart Watches</p>
          </Link>

          <Link
            to={"/gaming"}
            className="flex justify-center  items-center flex-col gap-4 bg-gray-100 transition-all duration-300 hover:scale-105  hover:shadow-md  rounded-md text-black py-6 px-2 max-sm:py-3"
          >
            <BsController className="text-4xl max-md:text-3xl max-sm:text-2xl" />
            <p className="font-semibold text-sm">Gaming</p>
          </Link>

          <Link
            to={"/cameras"}
            className="flex justify-center  items-center flex-col gap-4 bg-gray-100 transition-all duration-300 hover:scale-105  hover:shadow-md  rounded-md text-black py-6 px-2 max-sm:py-3"
          >
            <IoCameraOutline className="text-4xl max-md:text-3xl max-sm:text-2xl" />
            <p className="font-semibold text-sm">Cameras</p>
          </Link>
          <Link
            to={"/laptops"}
            className="flex justify-center  items-center flex-col gap-4 bg-gray-100 transition-all duration-300 hover:scale-105  hover:shadow-md  rounded-md text-black py-6 px-2 max-sm:py-3"
          >
            <IoLaptopOutline className="text-4xl max-md:text-3xl max-sm:text-2xl" />
            <p className="font-semibold text-sm">Laptops</p>
          </Link>

          <Link
            to={"/headphones"}
            className="flex justify-center  items-center flex-col gap-4 bg-gray-100 transition-all duration-300 hover:scale-105  hover:shadow-md  rounded-md text-black py-6 px-2 max-sm:py-3"
          >
            <CiHeadphones className="text-4xl max-md:text-3xl max-sm:text-2xl" />
            <p className="font-semibold text-sm">Headphones</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
