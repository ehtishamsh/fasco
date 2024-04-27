import { HeartIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import TopProductsButton from "./TopProductsButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TopProducts() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetehData = async () => {
      try {
        const getres = await fetch("https://fakestoreapi.com/products", {
          method: "GET",
        });
        const res = await getres.json();
        setProducts(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetehData();
    return () => {
      setProducts([]);
    };
  }, []);

  const handleclick = (e: any) => {
    e.preventDefault();
  };
  const [checkActive, setCheckActive] = useState("new");
  const createElement = products?.map((item) => {
    return (
      <Link
        to={`/products/${item.id}`}
        className="grid grid-row-6  border border-border px-4"
        key={item.id}
      >
        <div className="flex items-center justify-end py-4">
          <Button variant={"ghost"}>
            <HeartIcon className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
        <div className="px-2 overflow-hidden flex items-center justify-center ">
          <img
            src={item.image}
            alt=""
            className="max-h-[180px] max-sm:max-h-[120px]"
          />
        </div>

        <h1 className="text-sm font-semibold text-center line-clamp-3 mt-3 ">
          {item.title}
        </h1>
        <h2 className="text-2xl font-bold text-center  flex items-end justify-center">
          ${item.price}
        </h2>
        <div className="flex justify-center items-end py-4">
          <Button
            variant={"default"}
            className="w-full"
            onClick={(e) => handleclick(e)}
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    );
  });

  return (
    <div className="max-w-6xl mt-11 mx-auto">
      <TopProductsButton active={checkActive} setActive={setCheckActive} />
      <div className="grid grid-cols-4 gap-4 mt-10 max-sm:grid-cols-2 max-md:grid-cols-3">
        {createElement}
      </div>
    </div>
  );
}

export default TopProducts;
