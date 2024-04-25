import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="grid grid-cols-3  gap-8 h-[78vh]">
      <div className="rounded-lg overflow-hidden transition-all duration-300">
        <img
          src="/hero-right.png"
          className="h-full w-full rounded-lg transition-all duration-300"
        />
      </div>
      <div className="grid grid-cols-1 grid-rows-8 gap-4">
        <div className="row-span-2  rounded-lg">
          <img
            src="/top-img.png"
            className="h-full w-full rounded-lg transition-all duration-300"
          />
        </div>
        <div className=" row-span-4  rounded-lg flex flex-col items-center">
          <h1 className="text-7xl max-lg:text-6xl max-md:text-5xl max-sm:text-4xl font-semibold transition-all duration-300">
            ULTIMATE
          </h1>
          <h1 className="text-9xl max-lg:text-8xl  max-md:text-7xl max-sm:text-6xl font-bold outline-title transition-all duration-300">
            SALE
          </h1>
          <p className="text-sm  tracking-[2px] mb-5">NEW COLLECTION</p>
          <Button variant="default" size="lg">
            SHOP NOW
          </Button>
        </div>
        <div className="row-span-2 bg-black rounded-lg overflow-hidden transition-all duration-300">
          <img
            src="/bottom-img.png"
            className="h-full w-full rounded-lg transition-all duration-300"
          />
        </div>
      </div>
      <div className=" rounded-lg overflow-hidden transition-all duration-300">
        <img
          src="/hero-left.png"
          className="h-full w-full rounded-lg transition-all duration-300"
        />
      </div>
    </div>
  );
}

export default Hero;
