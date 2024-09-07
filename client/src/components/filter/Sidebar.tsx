import { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FaChevronLeft } from "react-icons/fa";
import Loading from "../ui/Loading";

interface Data {
  brands?: string[];
  batteryCapacity?: string[];
  screenSize?: string[];
  ram?: string[];
  price?: string[];
}

interface AllFilters {
  brands: string[];
  screenSize: string[];
  batteryCapacity: string[];
  ram: string[];
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
  const [price, setPrice] = useState<string[]>([]);
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch initial data (brands, capacities, etc.)
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const brandResponse = await fetch("http://localhost:4000/api/brands");
        const brandData = await brandResponse.json();
        const brands = brandData.brands.map((brand: any) => brand.name);
        if (brandData) {
          setLoading(false);
        }
        setData({
          brands,
          batteryCapacity: [
            "1000",
            "2000",
            "3000",
            "4000",
            "5000",
            "6000",
            "7000",
            "8000",
            "9000",
            "10000",
          ],
          screenSize: [
            "Over 4.5",
            "Over 5.5",
            "Over 6.5",
            "Over 7.5",
            "Over 8.5",
          ],
          ram: ["4GB", "6GB", "8GB", "12GB", "14GB", "16GB"],
          price: [
            "$100",
            "$200",
            "$300",
            "$400",
            "$500",
            "$600",
            "$700",
            "$800",
            "$900",
            "$1000",
            "$1500",
          ],
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    // Fetch data only if it hasn't been fetched before
    if (!data.brands) {
      fetchData();
    }
  }, []);

  // Parse URL parameters to initialize filter states
  useEffect(() => {
    const filterParams = (param: string) =>
      searchParams.getAll(param).flatMap((p) => p.split(" "));
    if (searchParams.get("brand")) {
      setSelectedBrand(filterParams("brand"));
    }
    if (searchParams.get("screenSize")) {
      setScreenSize(filterParams("screenSize"));
    }
    if (searchParams.get("batteryCapacity")) {
      setBatteryCapacity(filterParams("batteryCapacity"));
    }
    if (searchParams.get("ram")) {
      setRAM(filterParams("ram"));
    }
    if (searchParams.get("price")) {
      setPrice(filterParams("price"));
    }
  }, [searchParams]);
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
    if (price.length > 0)
      newSearchParams.set("price", price.join(" ").toLowerCase());

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    setSearchParams(newSearchParams);

    setAllFilters({
      brands: selectedBrand,
      screenSize,
      batteryCapacity,
      ram,
      price,
    });
  }, [selectedBrand, screenSize, batteryCapacity, ram, price]);

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
          {loading ? (
            <Loading />
          ) : (
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
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
