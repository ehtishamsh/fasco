import { Button } from "../ui/button";
import { Reveal } from "../animation/Reveal";
import { Link } from "react-router-dom";

function ShopGrid() {
  return (
    <Reveal delayTime={0.5}>
      <div className="py-10 h-fit">
        <div className="grid grid-cols-2 max-md:grid-cols-1 h-fit">
          <div className=" grid grid-cols-1 grid-rows-2">
            <Link to="/gaming?brand=sony" className="bg-white grid grid-cols-2">
              <div className="pr-10">
                <img src="/ps.png" alt="" className="max-w-full " />
              </div>
              <div className="p-4 max-sm:p-2 flex justify-center items-start flex-col">
                <div className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-xl font-semibold mb-2 text-black">
                  <Reveal delayTime={0.7}>Playstation 5</Reveal>
                </div>
                <div className="text-sm text-left px-2 max-sm:px-1 max-sm:text-xs text-gray-400">
                  <Reveal delayTime={0.9}>
                    Incredibly powerful CPUs, GPUs, and an SSD with integrated
                    I/O will redefine your PlayStation experience.
                  </Reveal>
                </div>
              </div>
            </Link>

            <div className=" grid grid-cols-2 bg-gray-200">
              <Link
                to="/headphones/apple/apple-airpods-max"
                className="grid grid-cols-6"
              >
                <div className=" col-span-2 flex justify-center items-center">
                  <img src="/air.png" alt="" className="max-w-full" />
                </div>
                <div className="p-4 max-sm:p-2 flex justify-center items-start flex-col col-span-4">
                  <div className="text-3xl max-md:text-xl max-sm:text-base mb-2 text-left px-2 max-sm:px-1">
                    <Reveal delayTime={0.7}>
                      Apple <br /> AirPods
                    </Reveal>

                    <span className="font-semibold"> Max</span>
                  </div>
                  <div className="text-sm text-left px-2 max-sm:px-1 text-gray-400 max-sm:text-xs">
                    <Reveal delayTime={0.9}>
                      Computational audio. Listen, it's powerful.
                    </Reveal>
                  </div>
                </div>
              </Link>

              <Link
                to="/headphones/apple/apple-airpods-pro"
                className="grid grid-cols-6 bg-gray-700"
              >
                <div className=" col-span-2 flex justify-center items-center">
                  <img src="/airpods.png" alt="" className="max-w-full" />
                </div>
                <div className="p-4 max-sm:p-2 flex justify-center items-start flex-col col-span-4">
                  <div className="text-3xl max-md:text-xl max-sm:text-base mb-2 text-left px-2 max-sm:px-1 text-white">
                    <Reveal delayTime={0.7}>
                      Apple <br /> AirPods
                    </Reveal>
                  </div>
                  <div className="text-sm text-left px-2 max-sm:px-1 text-gray-400 max-sm:text-xs">
                    <Reveal delayTime={0.9}>
                      Computational audio. Listen, it's powerful & incredibly.
                    </Reveal>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 bg-gray-200 ">
            <Link
              to={"/laptops/apple/macbook-air-2023"}
              className="col-span-2 flex justify-center items-center flex-col"
            >
              <div className="text-6xl max-lg:text-5xl max-md:text-3xl max-sm:text-2xl mb-2 text-left px-2 max-sm:px-1 text-black">
                <Reveal delayTime={0.7} width="fit-content">
                  MacBook <span className="font-semibold">Air</span>
                </Reveal>
              </div>
              <div className="text-sm text-left px-2 max-sm:px-1 text-gray-400 max-sm:text-xs max-w-[400px] max-sm:max-w-[250px]">
                <Reveal delayTime={0.9} width="fit-content">
                  The new 15‑inch MacBook Air makes room for more of what you
                  love with a spacious Liquid Retina display.
                </Reveal>
              </div>
              <Reveal delayTime={1}>
                <Button
                  className="mt-5 text-xl !p-6 max-sm:text-base max-sm:!p-4"
                  variant={"default"}
                >
                  Shop Now
                </Button>
              </Reveal>
            </Link>
            <div className="flex justify-center items-center">
              <img src="/mb.png" alt="" className=" max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default ShopGrid;
