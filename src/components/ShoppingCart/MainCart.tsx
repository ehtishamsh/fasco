import { add, qty, remove } from "@/lib/redux/cartSlice";
import { CartState, Product } from "@/lib/redux/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { BiMinus, BiPlus, BiX } from "react-icons/bi";
import { Separator } from "../ui/separator";
import { PlusIcon } from "@radix-ui/react-icons";

function MainCart() {
  const dispatch = useDispatch();
  const [checkqty, setCheckQty] = useState(1);
  const items = useSelector<CartState, Product[]>(
    (state) => state?.cart?.items
  );
  const [data, setData] = React.useState<Product[]>(items);
  const handleCheckQty = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product
  ) => {
    const newObj = {
      name: e.currentTarget.name,
      product: item,
    };
    if (e.currentTarget.name === "plus") {
      dispatch(qty(newObj));
      setCheckQty((prev) => prev + 1);
    } else if (e.currentTarget.name === "minus") {
      if (checkqty > 1) {
        dispatch(qty(newObj));
        setCheckQty((prev) => prev - 1);
      }
    }
  };
  useEffect(() => {
    setData(items);
  }, [data, items, checkqty]);
  const mapData = data?.map((item, i) => {
    return (
      <div key={i}>
        <div className="grid grid-cols-7 gap-4 p-2 rounded-md mb-5   transition-all duration-300">
          <div className="flex justify-center items-center">
            <img src={item.thumbnail} alt="" className="max-h-[120px]" />
          </div>
          <div className="flex col-span-2 items-center justify-start">
            <div>
              <p className="text-xs text-gray-500">{item.brand}</p>
              <Link
                to={`/${item.category}/${item.id}`}
                className="text-sm font-semibold line-clamp-1"
              >
                {item.quantity || 1} x {item.title}
              </Link>
            </div>
          </div>

          <div className="flex col-span-2 justify-center items-center gap-1">
            <Button
              size={"sm"}
              variant={"ghost"}
              name="minus"
              onClick={(e: any) => handleCheckQty(e, item)}
            >
              <BiMinus className="text-xl" />
            </Button>
            <input
              type="text"
              value={item.quantity}
              onChange={() => setCheckQty(item?.quantity || 1)}
              className=" w-8 text-center rounded-md border border-border px-2 py-1"
            />
            <Button
              size={"sm"}
              variant={"ghost"}
              name="plus"
              onClick={(e: any) => handleCheckQty(e, item)}
            >
              <BiPlus className="text-xl" />
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-sm text-yellow-600 font-semibold ">
              ${(item.quantity || 1) * Number(item.price)}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => handleRemove(item)}
              className="rounded-full bg-yellow-300 hover:bg-yellow-400"
            >
              <BiX className="text-2xl text-yellow-800" />
            </Button>
          </div>
        </div>
        <Separator />
      </div>
    );
  });
  function handleRemove(item: Product) {
    dispatch(remove(item));
  }
  return (
    <div className="grid grid-cols-8 gap-3 min-h-[500px] mb-10">
      <div className="col-span-5">
        <h1 className="text-xl font-semibold">Shopping Cart</h1>
        <div className="flex flex-col gap-7 mt-10">{mapData}</div>
      </div>
      <div className="col-span-3 border border-border rounded-lg">lkjkhjh</div>
    </div>
  );
}

export default MainCart;
