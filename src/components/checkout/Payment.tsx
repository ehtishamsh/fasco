import { useEffect, useState } from "react";
import ButtonNextBack from "./ButtonNextBack";
import { useSelector } from "react-redux";
import { CartState, Product } from "@/lib/redux/types";
import { Separator } from "../ui/separator";

interface Data {
  free: boolean;
  standard: boolean;
  express: boolean;
}
function Payment({
  checked,
  setChecked,
}: {
  checked: Data;
  setChecked: React.Dispatch<React.SetStateAction<Data>>;
}) {
  const [ship, setShip] = useState<String>("free");
  const [total, setTotal] = useState(0);
  const products = useSelector<CartState, Product[]>(
    (state) => state?.cart?.items
  );
  const [data, setData] = useState<Product[]>(products);
  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  useEffect(() => {
    setData(products);
    setTotal(() => {
      let sum = 0;
      data.forEach((item) => {
        sum += Number(item.price) * (item?.quantity || 1);
      });
      return sum;
    });
    if (checked?.free) {
      setShip("free");
    } else if (checked?.standard) {
      setShip("standard");
    } else if (checked?.express) {
      setShip("express");
    }
  }, [data, products]);
  const prdItems = products?.map((item) => {
    return (
      <div className="grid grid-cols-7 gap-4 items-center bg-gray-100/80 rounded-lg p-4">
        <img
          src={item?.thumbnail}
          alt={item.title}
          className="max-h-[90px] object-cover w-full rounded-lg border border-border"
        />
        <div className="text-sm  col-span-4">
          <span className="text-xs text-gray-400">{item.brand}</span>
          <p className=" font-semibold">{item?.title}</p>
        </div>
        <p className="text-sm">Qty: {item?.quantity}</p>
        <p className="text-sm font-semibold">
          ${(Number(item?.price) || 1) * (item?.quantity || 1)}
        </p>
      </div>
    );
  });
  const date = new Date().toLocaleDateString("en-US");
  return (
    <div className="border border-border p-8 rounded-md">
      <h1 className="text-xl font-semibold">Summary</h1>
      <div className="grid grid-cols-1 gap-4 mt-10">
        <div className="grid grid-cols-1 gap-4">{prdItems}</div>
      </div>
      <div className="mt-14">
        <h1 className="text-sm font-semibold">Address</h1>
        <p className="mt-4">1131 Dusty Townline, Jacksonville, TX 40322</p>
        <Separator className="my-4" />
      </div>
      <div className="mt-14">
        <h1 className="text-sm font-semibold">Shipment Method</h1>
        <p className="mt-4">
          {ship === "free"
            ? "Free"
            : ship === "standard"
            ? `Standard : $8.50`
            : ship === "express"
            ? "Express : $15.00" + date
            : 0}
        </p>
        <Separator className="my-4" />
      </div>
      <div className="mt-14">
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold">Subtotal</h1>
          <h1 className="text-sm font-semibold">${total}</h1>
        </div>
        <div className="flex justify-between items-center mt-4">
          <h4 className="text-sm text-muted-foreground">Estimated Tax</h4>
          <span className="text-sm font-semibold">$50</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h4 className="text-sm text-muted-foreground">
            Estimated Shipping & Handling
          </h4>
          <span className="text-sm font-semibold">
            {ship === "free"
              ? "Free"
              : ship === "standard"
              ? `$8.50`
              : ship === "express"
              ? "$15.00"
              : 0}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <h4 className="text-lg font-semibold">Total</h4>
          <span className="text-lg font-semibold">
            $
            {total +
              50 +
              (ship === "free"
                ? 0
                : ship === "standard"
                ? 8.5
                : ship === "express"
                ? 15
                : 0)}
          </span>
        </div>
      </div>
      <ButtonNextBack handleNext={() => console.log("next")} />
    </div>
  );
}

export default Payment;
