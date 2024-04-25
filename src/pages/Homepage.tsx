import Brands from "@/components/home/Brands";
import Hero from "@/components/home/Hero";

function Homepage() {
  return (
    <div className="max-w-6xl mx-auto">
      <Hero />
      <Brands />
    </div>
  );
}

export default Homepage;
