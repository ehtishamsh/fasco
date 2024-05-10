import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import List from "./List";

interface Data {
  category: string[];
  brand: string[];
  price: number[];
}
function Sidebar() {
  const [isOpen, setIsOpen] = useState({
    brand: false,
    category: false,
    price: false,
  });
  const [data, setData] = useState<Data>();
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
    <div className="flex flex-col p-2">
      <div className="relative">
        <div
          className=" cursor-pointer"
          onClick={() => setIsOpen({ ...isOpen, category: !isOpen.category })}
        >
          <div className="flex justify-between items-center pb-2">
            <p className="font-semibold">Category</p>
            <p>{isOpen.category ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
          </div>
          <Separator className="bg-gray-400" />
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen.category ? "auto" : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="overflow-hidden transition duration-300"
        >
          <motion.div className="flex flex-col mt-3 text-sm transition-all duration-300">
            <List data={data?.category} />
          </motion.div>
        </motion.div>
      </div>
      {/* Brand */}
      <div className="relative">
        <div
          className=" cursor-pointer"
          onClick={() => setIsOpen({ ...isOpen, brand: !isOpen.brand })}
        >
          <div className="flex justify-between items-center pb-2">
            <p className="font-semibold">Brand</p>
            <p>{isOpen.brand ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
          </div>
          <Separator className="bg-gray-400" />
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen.brand ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
          className="overflow-hidden transition duration-300"
        >
          <motion.div className="flex flex-col mt-3 text-sm transition-all duration-300">
            <List data={data?.brand} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Sidebar;
