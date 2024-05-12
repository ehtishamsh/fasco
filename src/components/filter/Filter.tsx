import { useState } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";

function Filter() {
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [batteryCapacity, setBatteryCapacity] = useState<string[]>([]);
  const [screenSize, setScreenSize] = useState<string[]>([]);
  const [screenType, setScreenType] = useState<string[]>([]); // State for screen type
  const [ram, setRAM] = useState<string[]>([]); // State for RAM
  const [color, setColor] = useState<string[]>([]); // State for color
  const [price, setPrice] = useState<string[]>([]);
  console.log(
    selectedBrand,
    selectedCategory,
    batteryCapacity,
    screenSize,
    screenType,
    ram,
    color,
    price
  );
  return (
    <div className="grid grid-cols-8 gap-8 mt-28 ">
      <div className="col-span-2">
        <div className="">
          <Sidebar
            batteryCapacity={batteryCapacity}
            color={color}
            ram={ram}
            screenSize={screenSize}
            screenType={screenType}
            setBatteryCapacity={setBatteryCapacity}
            setColor={setColor}
            setRAM={setRAM}
            setScreenSize={setScreenSize}
            setScreenType={setScreenType}
            setSelectedBrand={setSelectedBrand}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            selectedCategory={selectedCategory}
            setPrice={setPrice}
            price={price}
          />
        </div>
      </div>
      <div className="col-span-6">
        <Content
          batteryCapacity={batteryCapacity}
          price={price}
          ram={ram}
          screenSize={screenSize}
          screenType={screenType}
          brands={selectedBrand}
          color={color}
        />
      </div>
    </div>
  );
}

export default Filter;
