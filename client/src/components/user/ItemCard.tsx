import { Link } from "react-router-dom";

interface Props {
  orderNumber: number;
  images: string[];
  title: string;
  quantity: number;
  price: number;
}
const ItemCard = ({ images, title, quantity, price, orderNumber }: Props) => {
  return (
    <div className="">
      <div className="mt-3 grid grid-cols-4 max-sm:grid-cols-5 max-sm:gap-5 gap-2 px-6 py-2 text-sm max-sm:px-2">
        <div className="text-left w-full flex gap-1 col-span-1 max-sm:col-span-2">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt=""
              className="w-20 h-20 max-sm:w-full max-sm:h-full max-sm:object-contain"
            />
          ))}
        </div>
        <div className="col-span-3 max-sm:flex max-sm:flex-col grid grid-cols-4">
          <Link
            to={`/smartphones/oneplus/${title.replace(" ", "-").toLowerCase()}`}
            className="text-gray-400"
          >
            {title}
          </Link>
          <div className=" max-sm:mt-4 font-semibold">
            <span>${price}</span>
          </div>
          <div className=" max-sm:mt-4">
            <span>
              <span className="text-gray-400">Qty:</span> {quantity}
            </span>
          </div>
          <div className="flex flex-col max-sm:mt-4 ">
            <Link
              to={`/order/review/${orderNumber}`}
              className="text-yellow-600"
            >
              Review
            </Link>
            <span>-</span>
            <Link
              to={`/order/cancel/${orderNumber}`}
              className="text-yellow-600 flex flex-col  "
            >
              Cancel
              <span className="text-gray-400 text-xs">
                Should be under 2 days
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
