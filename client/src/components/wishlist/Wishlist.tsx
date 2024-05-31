import { useSelector } from "react-redux";
import { BreadCrum } from "../BreadCrum";
import { Product, WishlistState } from "@/lib/redux/types";

function Wishlist() {
  const wishlistData = useSelector<WishlistState, Product[]>(
    (state) => state?.wishlist.items
  );
  console.log(wishlistData);
  return (
    <div className="max-w-6xl mx-auto px-3">
      <BreadCrum />
      <div className="mt-10 max-sm:mt-5 flex"></div>
    </div>
  );
}

export default Wishlist;
