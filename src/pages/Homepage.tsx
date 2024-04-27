import Brands from "@/components/home/Brands";

import Hero from "@/components/home/Hero";
import TopProducts from "@/components/home/TopProducts";

function Homepage() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <Hero />
      </div>
      <Brands />
      <TopProducts />
    </>
  );
}

export default Homepage;
