import Brands from "@/components/home/Brands";
import DiscountedProducts from "@/components/home/DiscountedProducts";

import Hero from "@/components/home/Hero";
import SaleSection from "@/components/home/SaleSection";
import ShopGrid from "@/components/home/ShopGrid";
import ShowcaseProductGrid from "@/components/home/ShowcaseProductGrid";
import TopProducts from "@/components/home/TopProducts";

function Homepage() {
  return (
    <>
      <div className="px-4">
        <div className="max-w-6xl mx-auto">
          <Hero />
        </div>

        <Brands />
      </div>
      <ShopGrid />
      <TopProducts />
      <ShowcaseProductGrid />
      <DiscountedProducts />
      <SaleSection />
    </>
  );
}

export default Homepage;
