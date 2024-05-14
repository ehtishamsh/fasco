import { useState } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
interface Data {
  batteryCapacity: string[];
  price: string[];
  ram: string[];
  screenSize: string[];
  screenType: string[];
  brands: string[];
  color: string[];
}

function Filter() {
  const [open, setOpen] = useState<boolean>(false);
  const [allFilters, setAllFilters] = useState<Data>({
    batteryCapacity: [],
    price: [],
    ram: [],
    screenSize: [],
    screenType: [],
    brands: [],
    color: [],
  });

  return (
    <div className="grid grid-cols-8 gap-8 mt-28 max-md:mt-10 ">
      <motion.div
        className={`col-span-2 max-sm:col-span-2 ${
          open
            ? "max-md:block max-md:col-span-8  max-md:z-50 max-md:top-20 transition-all duration-300 overflow-y-scroll  max-md:bg-white  max-md:h-screen  max-md:fixed  max-md:right-0  max-md:w-full "
            : "max-md:hidden"
        } `}
      >
        <Sidebar setAllFilters={setAllFilters} setOpen={setOpen} />
      </motion.div>
      <div className="col-span-6 max-md:col-span-8">
        <Content
          setOpen={setOpen}
          open={open}
          batteryCapacity={allFilters.batteryCapacity}
          price={allFilters.price}
          ram={allFilters.ram}
          screenSize={allFilters.screenSize}
          screenType={allFilters.screenType}
          brands={allFilters.brands}
          color={allFilters.color}
        />
      </div>
    </div>
  );
}

export default Filter;
