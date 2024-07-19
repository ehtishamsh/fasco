import { Color, Variant } from "@/lib/redux/types";
import { Link } from "react-router-dom";
import OrderCancel from "./OrderCancel";

const ItemCard = ({
  cover,
  title,
  quantity,
  price,
  orderNumber,
  selectedColor,
  selectedVariant,
  category,
  brand,
  deliverd,
  confirmed,
  orderStatus,
  payment_intent_id,
}: {
  cover: string;
  title: string;
  quantity: number;
  price: string;
  orderNumber: number;
  selectedColor: Color;
  selectedVariant: Variant;
  category: string;
  brand: string;
  deliverd: boolean;
  confirmed: boolean;
  orderStatus: string;
  payment_intent_id: string;
}) => {
  return (
    <div className="">
      <div className="mt-3 grid grid-cols-4 max-sm:grid-cols-5 max-sm:gap-5 gap-2 px-6 py-2 text-sm max-sm:px-2">
        <div className="text-left w-full flex gap-1 col-span-1 max-sm:col-span-2">
          <img
            src={`http://localhost:4000${cover}`}
            alt=""
            className="w-20 h-20 max-sm:w-full max-sm:h-full max-sm:object-contain"
          />
        </div>
        <div className="col-span-3 max-sm:flex max-sm:flex-col grid grid-cols-4">
          <Link
            to={`/${category?.toLowerCase() || ""}/${
              brand?.toLowerCase() || ""
            }/${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-gray-700 flex flex-col"
          >
            <span className="text-gray-400 text-xs">{brand}</span>
            {title}
            <span
              style={{ backgroundColor: selectedColor.color }}
              className="w-3 h-3 rounded-full"
            >
              &nbsp;
            </span>
            <span className="text-gray-400 text-xs">
              {selectedVariant.variant} | ${selectedVariant.price}
            </span>
          </Link>
          <div className=" max-sm:mt-4 font-semibold h-full flex  items-center">
            <span>${price}</span>
          </div>
          <div className=" max-sm:mt-4 h-full flex  items-center">
            <span>
              <span className="text-gray-400">Qty:</span> {quantity}
            </span>
          </div>
          <div className="flex flex-col max-sm:mt-4 justify-center items-center ">
            {orderStatus === "CANCELLED" ? (
              <h1 className="text-red-500">Order Cancelled</h1>
            ) : (
              <>
                {deliverd && (
                  <>
                    <Link
                      to={`/order/review/${orderNumber}`}
                      className="text-yellow-600"
                    >
                      Review
                    </Link>
                    <span>-</span>
                  </>
                )}
                <div className="text-yellow-600 flex flex-col  ">
                  <OrderCancel
                    payment_intent_id={payment_intent_id}
                    orderConfirmed={confirmed}
                    orderNumber={orderNumber}
                  />
                  <span className="text-gray-400 text-xs">
                    Should be under 2 days
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
