import { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";

interface Data {
  category: string[];
  brand: string[];
  price: number[];
}

function Sidebar() {
  const [data, setData] = useState<Data>();
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
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
        setSelected={setSelectedBrand}
        title="Category"
        data={data?.category || []}
      />
      <CollapsibleSection
        setSelected={setSelectedCategory}
        title="Brand"
        data={data?.brand || []}
      />
    </div>
  );
}

export default Sidebar;
