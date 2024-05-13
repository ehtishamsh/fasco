import { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { useParams, useSearchParams } from "react-router-dom";
import Color from "./Color";
import { motion } from "framer-motion";

interface Data {
  [key: string]: string[];
}

interface AllFilters {
  batteryCapacity: string[];
  price: string[];
  ram: string[];
  screenSize: string[];
  screenType: string[];
  brands: string[];
  color: string[];
}
function Sidebar({
  allFilters,
  setAllFilters,
}: {
  allFilters: AllFilters;
  setAllFilters: React.Dispatch<React.SetStateAction<AllFilters>>;
}) {
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [screenSize, setScreenSize] = useState<string[]>([]);
  const [batteryCapacity, setBatteryCapacity] = useState<string[]>([]);
  const [screenType, setScreenType] = useState<string[]>([]);
  const [ram, setRAM] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    setAllFilters({
      brands: selectedBrand,
      screenSize: screenSize,
      batteryCapacity: batteryCapacity,
      screenType: screenType,
      ram: ram,
      color: color,
      price: price,
    });
  }, [
    batteryCapacity,
    color,
    price,
    ram,
    screenType,
    screenSize,
    selectedBrand,
  ]);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (selectedBrand.length > 0) {
      newSearchParams.append("brand", selectedBrand.join(" ").toLowerCase());
    }
    if (screenSize.length > 0) {
      newSearchParams.append("screenSize", screenSize.join(" ").toLowerCase());
    }
    if (batteryCapacity.length > 0) {
      newSearchParams.append(
        "batteryCapacity",
        batteryCapacity.join(" ").toLowerCase()
      );
    }
    if (screenType.length > 0) {
      newSearchParams.append("screenType", screenType.join(" ").toLowerCase());
    }
    if (ram.length > 0) {
      newSearchParams.append("ram", ram.join(" ").toLowerCase());
    }
    if (color.length > 0) {
      newSearchParams.append("color", color.join(" ").toLowerCase());
    }
    if (price.length > 0) {
      newSearchParams.append("price", price.join(" ").toLowerCase());
    }
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    setSearchParams(newSearchParams);
  }, [
    selectedBrand,
    selectedCategory,
    batteryCapacity,
    params.category,
    screenSize,
    screenType,
    price,
    ram,
    color,

    setSearchParams,
  ]);

  useEffect(() => {
    let battryArr: string[] = [];
    let sizeArr: string[] = [];
    let brandArr: string[] = [];
    let screenTypeArr: string[] = [];
    let ramArr: string[] = [];
    let colorArr: string[] = [];
    let priceArr: string[] = [];

    if (searchParams.get("batteryCapacity")) {
      searchParams.getAll("batteryCapacity").forEach((item) => {
        item.split(" ").forEach((item) => {
          battryArr.push(item);
        });
      });
    }
    if (searchParams.get("brand")) {
      searchParams.getAll("brand").forEach((item) => {
        item.split(" ").forEach((item) => {
          brandArr.push(item);
        });
      });
    }
    if (searchParams.get("screenSize")) {
      searchParams.getAll("screenSize").forEach((item) => {
        item.split(" ").forEach((item) => {
          sizeArr.push(item);
        });
      });
    }
    if (searchParams.get("screenType")) {
      searchParams.getAll("screenType").forEach((item) => {
        item.split(" ").forEach((item) => {
          screenTypeArr.push(item);
        });
      });
    }
    if (searchParams.get("ram")) {
      searchParams.getAll("ram").forEach((item) => {
        item.split(" ").forEach((item) => {
          ramArr.push(item);
        });
      });
    }
    if (searchParams.get("color")) {
      searchParams.getAll("color").forEach((item) => {
        item.split(" ").forEach((item) => {
          colorArr.push(item);
        });
      });
    }
    if (searchParams.get("price")) {
      searchParams.getAll("price").forEach((item) => {
        item.split(" ").forEach((item) => {
          priceArr.push(item);
        });
      });
    }

    if (
      battryArr.length > 0 ||
      brandArr.length > 0 ||
      sizeArr.length > 0 ||
      screenTypeArr.length > 0 ||
      ramArr.length > 0 ||
      colorArr.length > 0 ||
      priceArr.length > 0
    ) {
      setBatteryCapacity(battryArr);
      setSelectedBrand(brandArr);
      setScreenSize(sizeArr);
      setScreenType(screenTypeArr);
      setRAM(ramArr);
      setColor(colorArr);
      setPrice(priceArr);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("https://dummyjson.com/products/categories");
        const res = await req.json();
        const replaceDash = res.map((item: string) => {
          return item
            .replace("-", " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        });

        setData((prev: any) => {
          return { ...prev, category: replaceDash };
        });
        try {
          const req2 = await fetch("https://dummyjson.com/products");
          const res2 = await req2.json();
          const getBrands = res2?.products?.map((item: any) => {
            return item.brand
              .replace("-", "")
              .split(" ")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(" ")
              .replace(/\s+/g, " ");
          });
          const getBrandsSet = new Set(getBrands);
          const getBrandsUnique = Array.from(getBrandsSet);
          setData((prev: any) => {
            return { ...prev, brand: getBrandsUnique };
          });
          setData((prev: any) => {
            return {
              ...prev,
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
              screenType: ["LCD", "OLED", "AMOLED"], // Sample screen types
              ram: ["4GB", "8GB", "16GB"], // Sample RAM options
              color: ["black", "red", "gray", "blue"], // Sample color options
              price: [
                "10000",
                "15000",
                "20000",
                "25000",
                "30000",
                "35000",
                "40000",
                "45000",
                "50000",
              ],
            };
          });
          setData((prev: any) => {
            return {
              ...prev,
            };
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setData({} as Data);
    };
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      className="flex flex-col p-2 gap-2 "
    >
      {!params.category && (
        <CollapsibleSection
          select={selectedCategory}
          setSelected={setSelectedCategory}
          title="Category"
          data={data?.category || []}
        />
      )}
      <CollapsibleSection
        select={selectedBrand}
        setSelected={setSelectedBrand}
        title="Brand"
        data={data?.brand || []}
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
        select={screenType}
        setSelected={setScreenType}
        title="Screen Type"
        data={data?.screenType || []}
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
      <div>
        <p className="font-semibold text-sm">Color</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {data?.color?.map((item) => (
            <Color key={item} color={item} setColor={setColor} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
