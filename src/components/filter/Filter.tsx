import { useState } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
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
    <div className="grid grid-cols-8 gap-8 mt-28 ">
      <div className="col-span-2">
        <div className="">
          <Sidebar allFilters={allFilters} setAllFilters={setAllFilters} />
        </div>
      </div>
      <div className="col-span-6">
        <Content
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
