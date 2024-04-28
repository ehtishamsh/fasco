import React from "react";
import { Button } from "../ui/button";
import { Reveal } from "../animation/Reveal";

function ShopGrid() {
  return (
    <Reveal delayTime={0.5}>
      <div className="py-10 h-fit">
        <div className="grid grid-cols-2 max-md:grid-cols-1 h-fit">
          <div className=" grid grid-cols-1 grid-rows-2">
            <div className="bg-gray-800 grid grid-cols-2">
              <div className="pr-10">
                <img src="/ps.png" alt="" className="max-w-full " />
              </div>
              <div className="p-4 flex justify-center items-start flex-col">
                <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-xl font-semibold mb-2 text-white">
                  <Reveal delayTime={0.7}>Playstation 5</Reveal>
                </h1>
                <p className="text-sm text-left max-sm:text-xs text-gray-400">
                  <Reveal delayTime={0.9}>
                    Incredibly powerful CPUs, GPUs, and an SSD with integrated
                    I/O will redefine your PlayStation experience.
                  </Reveal>
                </p>
              </div>
            </div>

            <div className=" grid grid-cols-2 bg-gray-300/65">
              <div className="grid grid-cols-6">
                <div className=" col-span-2 flex justify-center items-center">
                  <img src="/air.png" alt="" className="max-w-full" />
                </div>
                <div className="p-4 flex justify-center items-start flex-col col-span-4">
                  <h1 className="text-3xl max-md:text-xl max-sm:text-base mb-2 text-left">
                    <Reveal delayTime={0.7}>
                      Apple <br /> AirPods
                    </Reveal>

                    <span className="font-semibold"> Max</span>
                  </h1>
                  <p className="text-sm text-left text-gray-400 max-sm:text-xs">
                    <Reveal delayTime={0.9}>
                      Computational audio. Listen, it's powerful.
                    </Reveal>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-6 bg-gray-600/80">
                <div className=" col-span-2 flex justify-center items-center">
                  <img src="/airpods.png" alt="" className="max-w-full" />
                </div>
                <div className="p-4 flex justify-center items-start flex-col col-span-4">
                  <h1 className="text-3xl max-md:text-xl max-sm:text-base mb-2 text-left text-white">
                    <Reveal delayTime={0.7}>
                      Apple <br /> AirPods
                    </Reveal>
                  </h1>
                  <p className="text-sm text-left text-gray-400 max-sm:text-xs">
                    <Reveal delayTime={0.9}>
                      Computational audio. Listen, it's powerful & incredibly.
                    </Reveal>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 bg-gray-900 ">
            <div className="col-span-2 flex justify-center items-center flex-col ">
              <h1 className="text-6xl max-lg:text-5xl max-md:text-3xl max-sm:text-2xl mb-2 text-left text-white">
                <Reveal delayTime={0.7}>
                  MacBook <span className="font-semibold">Air</span>
                </Reveal>
              </h1>
              <p className="text-sm text-left text-gray-400 max-sm:text-xs">
                <Reveal delayTime={0.9}>
                  The ultimate laptop for the modern age.
                </Reveal>
              </p>
              <Button
                className="mt-5 text-xl !p-6 max-sm:text-base max-sm:!p-4"
                variant={"secondary"}
              >
                Shop Now
              </Button>
            </div>
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
