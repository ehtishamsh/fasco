import { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { useParams, useSearchParams } from "react-router-dom";

interface Data {
  category: string[];
  brand: string[];
  batteryCapacity: string[];
  price: number[];
}

function Sidebar() {
  const [data, setData] = useState<Data>();
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [batteryCapacity, setBatteryCapacity] = useState<string[]>([]);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (selectedBrand.length > 0) {
      newSearchParams.append("brand", selectedBrand.join(" "));
    }
    if (batteryCapacity.length > 0) {
      newSearchParams.append("batteryCapacity", batteryCapacity.join(" "));
    }
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    setSearchParams(newSearchParams);
  }, [
    selectedBrand,
    selectedCategory,
    batteryCapacity,
    params.category,
    setSearchParams,
  ]);

  useEffect(() => {
    let battryArr: string[] = [];

    let brandArr: string[] = [];
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
    if (battryArr.length > 0 || brandArr.length > 0) {
      setBatteryCapacity(battryArr);
      setSelectedBrand(brandArr);
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
    </div>
  );
}

export default Sidebar;
