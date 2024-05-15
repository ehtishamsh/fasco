import React from "react";
import { Link } from "react-router-dom";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { BsSmartwatch } from "react-icons/bs";

function Category() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-10 max-sm:mt-5 px-2 py-7">
        <h1 className="text-xl font-semibold">Browse By Category</h1>
        <div className="grid grid-cols-6 gap-5 mt-12">
          <Link
            to={"/smartphones"}
            className="flex justify-center items-center flex-col gap-3 bg-gray-100 rounded-md text-black py-8 px-2"
          >
            <IoPhonePortraitOutline size={40} />
            <p className="font-semibold text-sm">Smartphones</p>
          </Link>
          <Link
            to={"/smartwatches"}
            className="flex justify-center items-center flex-col gap-3 bg-gray-100 rounded-md text-black py-8 px-2"
          >
            <BsSmartwatch size={40} />
            <p className="font-semibold text-sm">Smart Watches</p>
          </Link>
          <Link
            to={"/smartphones"}
            className="flex justify-center items-center flex-col gap-3 bg-gray-100 rounded-md text-black py-8 px-2"
          >
            <IoPhonePortraitOutline size={40} />
            <p className="font-semibold text-sm">Smartphones</p>
          </Link>
          <Link
            to={"/smartphones"}
            className="flex justify-center items-center flex-col gap-3 bg-gray-100 rounded-md text-black py-8 px-2"
          >
            <IoPhonePortraitOutline size={40} />
            <p className="font-semibold text-sm">Smartphones</p>
          </Link>
          <Link
            to={"/smartphones"}
            className="flex justify-center items-center flex-col gap-3 bg-gray-100 rounded-md text-black py-8 px-2"
          >
            <IoPhonePortraitOutline size={40} />
            <p className="font-semibold text-sm">Smartphones</p>
          </Link>
          <Link
            to={"/smartphones"}
            className="flex justify-center items-center flex-col gap-3 bg-gray-100 rounded-md text-black py-8 px-2"
          >
            <IoPhonePortraitOutline size={40} />
            <p className="font-semibold text-sm">Smartphones</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
