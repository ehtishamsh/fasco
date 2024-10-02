import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartState, Product, Address, User } from "@/lib/redux/types";

import PaymentForm from "./PaymentForm";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

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
        const itemPrice =
          Number(item.discounted) > 0
            ? Number(item.discounted)
            : Number(item.price);
        sum +=
          (itemPrice + Number(item.selectedVariant?.price || 0)) *
          (item?.quantity || 1);
      });
      return sum;
    });
  }, [data, products]);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="h-[80svh] max-sm:h-full mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 max-sm:gap-10">
        <div>
          <h2 className="font-semibold text-sm text-gray-400 border-b pb-2  border-border mb-4">
            SHIPPING & PAYMENT
          </h2>
          {/* Shipping Details */}
          <div className="my-8">
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm">
                {selectedAddress?.firstname} {selectedAddress?.lastname}
              </span>
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex flex-col text-sm gap-1">
              <span className=" text-gray-400 text-xs">Home Address</span>
              <span className="max-w-[300px]">
                {selectedAddress?.addressLine1}
              </span>
              <span>{selectedAddress?.addressLine2}</span>
              <span className=" text-gray-400 text-xs">State</span>
              <span>{selectedAddress?.state}</span>
              <span className=" text-gray-400 text-xs">City</span>
              <span>{selectedAddress?.city}</span>
              <span className=" text-gray-400 text-xs">Country</span>
              <span>{selectedAddress?.country}</span>
              <span className=" text-gray-400 text-xs">Postal Code</span>
              <span>{selectedAddress?.postalCode}</span>
            </div>
          </div>
          {/* Payment Details */}
          <div>
            <PaymentForm address={selectedAddress as Address} cartData={data} />
          </div>
        </div>
        <div className="max-sm:order-first">
          <div className="flex items-center justify-start gap-2 text-gray-400  border-b pb-2 border-border mb-4">
            <h2 className="font-semibold  text-sm">YOUR ORDER</h2>
            <Link to="/cart" className="text-xs">
              EDIT SHOPPING CART
            </Link>
          </div>
          <div className="space-y-4">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 items-center border-b pb-4"
              >
                <div className="col-span-1 max-sm:col-span-1">
                  <img
                    src={`http://localhost:4000${item?.cover}`}
                    alt={item?.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <Link
                  to={`/shop/${item.category.toString().toLowerCase()}/${
                    typeof item.brand === "string" && item.brand.toLowerCase()
                  }/${item.slug}`}
                  className="text-sm max-sm:text-xs max-sm:col-span-2 flex flex-col col-span-2"
                >
                  <span className="text-xs text-gray-400">
                    {typeof item.brand === "string" && item.brand}
                  </span>
                  <p className=" font-semibold">{item?.title}</p>
                  <span className="text-gray-400 text-xs">
                    {`${item.selectedVariant?.name} - $${item.selectedVariant?.price}`}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-2 ">
                    Color:
                    <span
                      style={{ backgroundColor: item.colors[0].name }}
                      className="w-2 h-2 rounded-full inline-block shadow"
                    >
                      &nbsp;
                    </span>
                  </span>
                </Link>
                <div className="flex justify-center items-center">
                  <p className="text-sm max-sm:text-xs  px-2 py-1 hover:bg-yellow-400 hover:text-white transition-all duration-300 border border-border rounded  w-fit">
                    {item?.quantity}
                  </p>
                </div>
                <p className="text-sm text-right max-sm:text-xs font-semibold">
                  $
                  {(Number(item?.discounted) > 0
                    ? Number(item.discounted)
                    : Number(item.price)) +
                    Number(item.selectedVariant?.price || 0) *
                      (item?.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <p className=" mb-0 text-sm font-semibold ">Subtotal</p>
              <p className="text-base">${total}</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p className=" mb-0 text-sm font-semibold">Shipping</p>
              <p>0</p>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <p className=" mb-0 text-sm font-semibold">Total</p>
              <p className="text-base">${total}</p>
            </div>
            <Separator />
            <span className="text-xs text-gray-400 inline-block">
              Note: A 5% platform fee, including taxes, is already included in
              the product price.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
