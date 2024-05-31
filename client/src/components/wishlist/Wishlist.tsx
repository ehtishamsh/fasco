import { useSelector } from "react-redux";
import { BreadCrum } from "../BreadCrum";
import { Product, WishlistState } from "@/lib/redux/types";
import { Button } from "../ui/button";

function Wishlist() {
  const wishlistData = useSelector<WishlistState, Product[]>(
    (state) => state?.wishlist.items
  );
  return (
    <div className="max-w-6xl mx-auto px-3">
      <BreadCrum />
      <div className="mt-10 max-sm:mt-5">
        {wishlistData.length > 0 ? (
          <h1>{wishlistData.length}</h1>
        ) : (
          <div className="flex justify-center w-full h-fit flex-col items-center mb-36">
            <img
              src="/empty_wishlist.png"
              alt=""
              className="max-w-72 object-cover max-sm:max-w-32"
            />
            <h1 className="text-3xl text-gray-400 font-semibold mt-8 text-center w-full max-sm:text-xl mb-4 max-sm:mb-2">
              Your Wishlist is Empty!
            </h1>
            <Button variant={"default"} size={"lg"}>
              Shop Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
