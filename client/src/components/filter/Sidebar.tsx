import { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { useSearchParams } from "react-router-dom";
import Color from "./Color";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FaChevronLeft } from "react-icons/fa";
import { Product } from "@/lib/redux/types";

interface Data {
  brands?: string[];
  batteryCapacity?: string[];
  screenSize?: string[];
  ram?: string[];
  color?: string[];
  price?: string[];
}

interface AllFilters {
  brands: string[];
  screenSize: string[];
  batteryCapacity: string[];
  ram: string[];
  color: string[];
  price: string[];
}

interface SidebarProps {
  setAllFilters: React.Dispatch<React.SetStateAction<AllFilters>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setAllFilters, setOpen }) => {
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [screenSize, setScreenSize] = useState<string[]>([]);
  const [batteryCapacity, setBatteryCapacity] = useState<string[]>([]);
  const [ram, setRAM] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [data, setData] = useState<Data>({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();

        if (data) {
          const getColors = data.products.map((product: Product) =>
            product.colors.map((i) => i.name)
          );
          const getNames = [...getColors.flat()];
          const getNamesUnique = [...new Set(getNames)];

          setData((prev) => {
            return { ...prev, color: getNamesUnique };
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (selectedBrand.length > 0)
      newSearchParams.set("brand", selectedBrand.join(" ").toLowerCase());
    if (screenSize.length > 0)
      newSearchParams.set("screenSize", screenSize.join(" ").toLowerCase());
    if (batteryCapacity.length > 0)
      newSearchParams.set(
        "batteryCapacity",
        batteryCapacity.join(" ").toLowerCase()
      );

    if (ram.length > 0) newSearchParams.set("ram", ram.join(" ").toLowerCase());
    if (color.length > 0)
      newSearchParams.set("color", color.join(" ").toLowerCase());
    if (price.length > 0)
      newSearchParams.set("price", price.join(" ").toLowerCase());

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    setSearchParams(newSearchParams);

    setAllFilters({
      brands: selectedBrand,
      screenSize,
      batteryCapacity,

      ram,
      color,
      price,
    });
  }, [
    selectedBrand,
    screenSize,
    batteryCapacity,

    ram,
    color,
    price,
    setSearchParams,
    setAllFilters,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await fetch("http://localhost:4000/api/brands");
        const brandData = await brandResponse.json();
        const brands = brandData.brands.map((brand: any) => brand.name);

        setData({
          brands,
          batteryCapacity: [
            "1000mAh",
            "2000mAh",
            "3000mAh",
            "4000mAh",
            "5000mAh",
            "6000mAh",
            "7000mAh",
            "8000mAh",
            "9000mAh",
            "10000mAh",
          ],
          screenSize: ["4.5", "5.5", "6.5", "7.5", "8.5"],

          ram: ["4GB", "6GB", "8GB", "12GB", "14GB", "16GB"],

          price: [
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
            "1000",
            "1500",
          ],
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();

    return () => {
      setData({});
    };
  }, []);

  useEffect(() => {
    const filterParams = (param: string) =>
      searchParams.getAll(param).flatMap((p) => p.split(" "));

    const batteryCapacity = filterParams("batteryCapacity");
    const brand = filterParams("brand");
    const screenSize = filterParams("screenSize");

    const ram = filterParams("ram");
    const color = filterParams("color");
    const price = filterParams("price");

    setBatteryCapacity(batteryCapacity);
    setSelectedBrand(brand);
    setScreenSize(screenSize);

    setRAM(ram);
    setColor(color);
    setPrice(price);
  }, [searchParams]);

  return (
    <div className={`max-md:max-h-[80svh] max-md:overflow-y-auto`}>
      <div className="hidden max-md:block">
        <div className="flex items-center">
          <Button variant={"ghost"} onClick={() => setOpen(false)}>
            <FaChevronLeft className="text-base" />
          </Button>
          <h1 className="text-xl font-semibold">Filter</h1>
        </div>
      </div>
      <div className="max-md:px-6">
        <motion.div className={`flex flex-col p-2 gap-2 w-full bg-white`}>
          {data?.brands && (
            <>
              <CollapsibleSection
                select={selectedBrand}
                setSelected={setSelectedBrand}
                title="Brand"
                data={data?.brands || []}
              />
              <CollapsibleSection
                select={batteryCapacity}
                setSelected={setBatteryCapacity}
                title="Battery Capacity"
                data={data?.batteryCapacity || []}
              />
              <CollapsibleSection
                select={screenSize}
                setSelected={setScreenSize}
                title="Screen Size"
                data={data?.screenSize || []}
              />

              <CollapsibleSection
                select={ram}
                setSelected={setRAM}
                title="RAM"
                data={data?.ram || []}
              />
              <CollapsibleSection
                select={price}
                setSelected={setPrice}
                title="Price"
                data={data?.price || []}
              />
            </>
          )}
          <div>
            <p className="font-semibold text-sm">Color</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {data?.color?.map((item) => (
                <Color key={item} color={item} setColor={setColor} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
