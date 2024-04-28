import Brands from "@/components/home/Brands";

import Hero from "@/components/home/Hero";
import ShopGrid from "@/components/home/ShopGrid";
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
    </>
  );
}

export default Homepage;
