import { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { useParams, useSearchParams } from "react-router-dom";
import Color from "./Color";

interface Data {
  category: string[];
  brand: string[];
  batteryCapacity: string[];
  screenSize: string[];
  screenType: string[]; // Add screenType
  ram: string[]; // Add RAM
  color: string[]; // Add color
  price: number[];
}

function Sidebar() {
  const [data, setData] = useState<Data>();
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [batteryCapacity, setBatteryCapacity] = useState<string[]>([]);
  const [screenSize, setScreenSize] = useState<string[]>([]);
  const [screenType, setScreenType] = useState<string[]>([]); // State for screen type
  const [ram, setRAM] = useState<string[]>([]); // State for RAM
  const [color, setColor] = useState<string[]>([]); // State for color
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (selectedBrand.length > 0) {
      newSearchParams.append("brand", selectedBrand.join(" "));
    }
    if (screenSize.length > 0) {
      newSearchParams.append("screenSize", screenSize.join(" "));
    }
    if (batteryCapacity.length > 0) {
      newSearchParams.append("batteryCapacity", batteryCapacity.join(" "));
    }
    if (screenType.length > 0) {
      newSearchParams.append("screenType", screenType.join(" "));
    }
    if (ram.length > 0) {
      newSearchParams.append("ram", ram.join(" "));
    }
    if (color.length > 0) {
      newSearchParams.append("color", color.join(" "));
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
    console.log(battryArr, brandArr, sizeArr, screenTypeArr, ramArr, colorArr);

    if (
      battryArr.length > 0 ||
      brandArr.length > 0 ||
      sizeArr.length > 0 ||
      screenTypeArr.length > 0 ||
      ramArr.length > 0 ||
      colorArr.length > 0
    ) {
      setBatteryCapacity(battryArr);
      setSelectedBrand(brandArr);
      setScreenSize(sizeArr);
      setScreenType(screenTypeArr);
      setRAM(ramArr);
      setColor(colorArr);
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
  console.log(color);

  return (
    <div className="flex flex-col p-2 gap-2">
      <CollapsibleSection
        setSelected={setSelectedCategory}
        title="Category"
        data={data?.category || []}
      />
      <CollapsibleSection
        setSelected={setSelectedBrand}
        title="Brand"
        data={data?.brand || []}
      />
      <CollapsibleSection
        setSelected={setBatteryCapacity}
        title="Battery Capacity"
        data={data?.batteryCapacity || []}
      />
      <CollapsibleSection
        setSelected={setScreenSize}
        title="Screen Size"
        data={data?.screenSize || []}
      />
      <CollapsibleSection
        setSelected={setScreenType}
        title="Screen Type"
        data={data?.screenType || []}
      />
      <CollapsibleSection
        setSelected={setRAM}
        title="RAM"
        data={data?.ram || []}
      />
      <div>
        <p className="font-semibold text-sm">Color</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {data?.color?.map((item) => (
            <Color key={item} color={item} setColor={setColor} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
