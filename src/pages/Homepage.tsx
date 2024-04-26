import Brands from "@/components/home/Brands";
import Deals from "@/components/home/Deals";
import Hero from "@/components/home/Hero";

function Homepage() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <Hero />
      </div>
      <Brands />
      <Deals />
    </>
  );
}

export default Homepage;
