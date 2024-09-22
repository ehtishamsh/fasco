import { qty, remove } from "@/lib/redux/cartSlice";
import { CartState, Product } from "@/lib/redux/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { BiMinus, BiPlus, BiX } from "react-icons/bi";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

function MainCart() {
  const checktoken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [checkqty, setCheckQty] = useState(1);
  const [total, setTotal] = useState(0);
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
    const getTotal = () => {
      return items.map((i) => {
        return (
          ((Number(i.discounted) > 0 ? Number(i.discounted) : Number(i.price)) +
            Number(i.selectedVariant?.price)) *
          (i.quantity || 1)
        );
      });
    };
    setTotal(() => {
      return getTotal().reduce((a, b) => a + b, 0);
    });
  }, [data, items, checkqty]);
  const mapData = data?.map((item, i) => {
    const category =
      typeof item?.category === "string" &&
      item?.category.replace(" ", "-").toLowerCase();
    const title = item?.title.replace(" ", "-").replace(" ", "-");
    const brand =
      typeof item?.brand === "string" &&
      item.brand.toLowerCase().replace(" ", "-");
    return (
      <div key={i}>
        <div className="grid grid-cols-7 gap-4 p-2 max-md:grid-rows-2 rounded-md mb-5   transition-all duration-300">
          <div className="flex justify-center items-center">
            <img
              src={`http://localhost:4000${item?.cover}`}
              alt=""
              className="max-h-[120px]"
            />
          </div>
          <div className="flex col-span-2 max-md:col-span-6 items-center justify-start">
            <div>
              <p className="text-xs text-gray-500">
                {typeof item?.brand === "string" && item.brand}
              </p>
              <Link
                to={`/shop/${
                  typeof item?.category === "string" && category
                }/${brand}/${title.toLowerCase()}`}
                className="text-sm font-semibold line-clamp-2"
              >
                {item.quantity || 1} x {item.title}
              </Link>

              <span
                className="rounded-full w-3 h-3 inline-block"
                style={{ backgroundColor: item.selectedColor?.name }}
              >
                &nbsp;
              </span>

              <p className="text-xs text-gray-500 mt-0">
                {item.selectedVariant?.name} + ${item.selectedVariant?.price}
              </p>
            </div>
          </div>

          <div className="flex col-span-2 max-md:col-span-3 justify-center items-center gap-1">
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
          <div className="flex justify-center items-center max-md:col-span-2">
            <p className="text-sm text-yellow-600 font-semibold ">${total}</p>
          </div>
          <div className="flex justify-center items-center max-md:col-span-2">
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
    <div className="grid grid-cols-9 max-md:grid-cols-1 gap-3 min-h-[500px] mb-10">
      <div className="col-span-5">
        <h1 className="text-xl font-semibold">Shopping Cart</h1>
        <div className="flex flex-col gap-7 mt-10">{mapData}</div>
      </div>
      <div className="col-span-4 border border-border rounded-lg p-12 max-sm:p-4">
        <h1 className="text-xl font-semibold mb-6">Order Summary</h1>
        <span className="text-xs text-muted-foreground">
          Discount code / Promo code
        </span>
        <Input type="text" placeholder="Code" className="mb-6 py-6" />
        <span className="text-xs text-muted-foreground">
          Your Bonus Card Number
        </span>
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter card number"
            className="mb-6 py-6"
          />
          <Button
            variant={"outline"}
            size={"sm"}
            className="absolute right-3 top-[9px] border border-muted-foreground"
          >
            Apply
          </Button>
        </div>
        <div className="my-7">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold">Subtotal</h4>
            <span className="text-sm font-semibold">${total}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <h4 className="text-sm text-muted-foreground">Estimated Tax</h4>
            <span className="text-sm font-semibold">$0</span>
          </div>
          <div className="flex justify-between items-center">
            <h4 className="text-sm text-muted-foreground">
              Estimated Shipping & Handling
            </h4>
            <span className="text-sm font-semibold">Free</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <h4 className="text-sm font-semibold">Total</h4>
            <span className="text-sm font-semibold">${total}</span>
          </div>
        </div>
        {checktoken ? (
          <Link to="/checkout" className="w-full">
            <Button className="w-full" size={"lg"}>
              Checkout
            </Button>
          </Link>
        ) : (
          <Link to="/signin" className="w-full">
            <Button className="w-full" size={"lg"}>
              Sign in to checkout
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MainCart;
