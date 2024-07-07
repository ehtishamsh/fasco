import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState, Product, Address } from "@/lib/redux/types";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import AddressCard from "./AddressCard";
import PaymentButton from "./PaymentButton";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { reset } from "@/lib/redux/cartSlice";

interface Data {
  free: boolean;
  standard: boolean;
  express: boolean;
}
function Payment({
  checked,
  setChecked,
  selectedAddress,
}: {
  checked: Data;
  setChecked: React.Dispatch<React.SetStateAction<Data>>;
  selectedAddress: Address | undefined;
}) {
  const [ship, setShip] = useState<String>("free");
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
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
  const placeOrder = async () => {
    if (selectedAddress === undefined) {
      toast({
        title: "Error",
        description: "Please select an address",
        variant: "destructive",
      });
      return;
    } else if (
      checked?.free === false &&
      checked?.standard === false &&
      checked?.express === false
    ) {
      toast({
        title: "Error",
        description: "Please select a shipping method",
        variant: "destructive",
      });
      return;
    } else {
      const orderNumber = Math.floor(Math.random() * 1000);
      const status = ["pending"];
      const totalPrice = total + 50 + (ship === "standard" ? 8.5 : 0);
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
      const addressId = selectedAddress?.id;
      const orderConfirmation = false;
      const shipping = false;
      const toDeliver = false;
      const cod = false;
      const product = data.map((item) => {
        return {
          productId: item.id,
          variantId: item.selectedVariant?.id,
          colorID: item.selectedColor?.id,
          quantity: item.quantity,
          price: Number(item.price) * Number(item.quantity),
        };
      });
      const body = {
        orderNumber,
        status,
        total: totalPrice,
        userId,
        addressId,
        orderConfirmation,
        shipping,
        toDeliver,
        cod,
        product,
      };
      const req = await fetch("http://localhost:4000/api/orders/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (req.ok) {
        toast({
          title: "Success",
          description: "Order placed successfully",
          variant: "success",
        });
        const removeProducts = dispatch(reset());
        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      }
    }
  };
  const prdItems = products?.map((item) => {
    return (
      <div className="grid grid-cols-7 gap-4  max-sm:gap-2  max-sm:p-2 items-center bg-gray-100/80 rounded-lg p-4">
        <img
          src={`http://localhost:4000${item?.cover}`}
          alt={item.title}
          className=" max-sm:col-span-7 object-contain w-full rounded-lg border border-border"
        />
        <Link
          to={`/${item.category.toLowerCase()}/${item.brand.toLowerCase()}/${
            item.slug
          }`}
          className="text-sm max-sm:text-xs flex flex-col col-span-4 max-sm:col-span-5"
        >
          <span className="text-xs text-gray-400">{item.brand}</span>
          <p className=" font-semibold">{item?.title}</p>
          <span className="text-gray-400">
            {`${item.variants[0].name} - $${item.variants[0].price}`}
          </span>
          <span className="text-gray-400 flex items-center gap-2 ">
            Color:
            <span
              style={{ backgroundColor: item.colors[0].name }}
              className="w-4 h-4 rounded-full inline-block shadow"
            >
              &nbsp;
            </span>
          </span>
        </Link>
        <p className="text-sm max-sm:text-xs">Qty: {item?.quantity}</p>
        <p className="text-sm max-sm:text-xs font-semibold">
          ${(Number(item?.price) || 1) * (item?.quantity || 1)}
        </p>
      </div>
    );
  });
  const date = new Date().toLocaleDateString("en-US");
  return (
    <div className="border border-border p-8 rounded-md max-sm:p-2">
      <h1 className="text-xl font-semibold max-sm:text-base">Summary</h1>
      <div className="grid grid-cols-1 gap-4 mt-10 max-sm:mt-5 max-sm:gap-2">
        <div className="grid grid-cols-1 gap-4  max-sm:gap-2">{prdItems}</div>
      </div>
      <div className="mt-14 max-sm:mt-6">
        <h1 className="text-sm font-semibold mb-6">Address</h1>
        <div className="flex gap-4 bg-gray-100/80 p-6 max-sm:p-4 max-sm:gap-2 rounded-lg">
          <AddressCard address={selectedAddress as Address} />
        </div>
        <Separator className="my-4" />
      </div>
      <div className="mt-14  max-sm:mt-6">
        <h1 className="text-sm font-semibold">Shipment Method</h1>
        <p className="mt-4 max-sm:text-sm">
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
      <div className="mt-14 max-sm:mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-sm max-sm:text-xs font-semibold">Subtotal</h1>
          <h1 className="text-sm max-sm:text-xs font-semibold">${total}</h1>
        </div>
        <div className="flex justify-between items-center mt-4">
          <h4 className="text-sm max-sm:text-xs text-muted-foreground">
            Estimated Tax
          </h4>
          <span className="text-sm max-sm:text-xs font-semibold">$50</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h4 className="text-sm max-sm:text-xs text-muted-foreground">
            Estimated Shipping & Handling
          </h4>
          <span className="text-sm max-sm:text-xs font-semibold">
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
          <h4 className="text-lg font-semibold max-sm:text-sm">Total</h4>
          <span className="text-lg font-semibold max-sm:text-sm">
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
        {confirm && (
          <div className="flex justify-between items-center mt-4">
            <h4 className="text-lg font-semibold max-sm:text-sm">
              Payment Method
            </h4>
            <span className="text-lg font-semibold max-sm:text-sm">
              Cash on Delivery
            </span>
          </div>
        )}
      </div>
      {!confirm ? (
        <PaymentButton setConfirm={setConfirm} />
      ) : (
        <Button
          variant={"primary"}
          size={"lg"}
          className="py-6 w-full mt-6"
          onClick={placeOrder}
        >
          Order
        </Button>
      )}
    </div>
  );
}

export default Payment;
