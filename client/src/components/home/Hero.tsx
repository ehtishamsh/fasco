import { Link } from "react-router-dom";
import { Reveal } from "../animation/Reveal";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1  gap-8 max-sm:gap-3 h-[78vh] max-md:h-[100svh]">
      <Link
        to={"/smartphones/samsung/samsung-galaxy-s23-ultra"}
        className="rounded-lg overflow-hidden max-sm:h-full transition-all duration-300 "
      >
        <Reveal height="100%" width="100%" delayTime={0.4}>
          <img
            src="/hero-right.png"
            className="h-full w-full rounded-lg transition-all duration-300 max-md:object-cover "
          />
        </Reveal>
      </Link>
      <div className="grid grid-cols-1 grid-rows-8 gap-4 max-sm:gap-3">
        <div className="row-span-2  rounded-lg">
          <Reveal height="100%" delayTime={0.6}>
            <img
              src="/top-img.png"
              className="h-full w-full rounded-lg transition-all duration-300 max-md:object-cover"
            />
          </Reveal>
        </div>
        <div className=" row-span-4 flex items-center justify-center">
          <Reveal delayTime={0.8}>
            <div className="rounded-lg flex flex-col items-center max-sm:justify-center">
              <h1 className="text-7xl max-lg:text-6xl max-md:text-5xl max-sm:mb-3 max-sm:text-6xl font-semibold transition-all duration-300">
                ULTIMATE
              </h1>
              <h1 className="text-9xl max-lg:text-8xl  max-md:text-7xl max-sm:mb-3 font-bold outline-title transition-all duration-300">
                SALE
              </h1>
              <p className="text-sm  tracking-[2px] mb-5">NEW COLLECTION</p>
              <Button variant="default" size="lg">
                SHOP NOW
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="row-span-2 rounded-lg overflow-hidden transition-all duration-300">
          <Reveal height="100%" delayTime={0.6}>
            <img
              src="/bottom-img.png"
              className="h-full w-full rounded-lg transition-all duration-300 max-md:object-cover"
            />
          </Reveal>
        </div>
      </div>
      <Link
        to={"/smartphones/apple/apple-iphone-14-pro-max"}
        className=" rounded-lg overflow-hidden transition-all duration-300  max-sm:h-full "
      >
        <Reveal height="100%" width="100%" delayTime={0.4}>
          <img
            src="/hero-left.png"
            className="h-full w-full rounded-lg transition-all duration-300 max-md:object-cover max-sm:object-cover "
          />
        </Reveal>
      </Link>
    </div>
  );
}

export default Hero;
