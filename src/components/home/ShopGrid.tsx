import React from "react";

function ShopGrid() {
  return (
    <div className="">
      <div className="grid grid-cols-2 max-sm:grid-cols-1">
        <div className=" text-center">
          <div className=" grid grid-cols-1 grid-rows-4">
            <div className="row-span-2 bg-gray-800">
              <div className="grid grid-cols-2  h-full">
                <div className="pt-4 pr-10">
                  <img
                    src="/ps.png"
                    alt=""
                    className="h-full w-full object-cover "
                  />
                </div>
                <div className="p-4 flex justify-center items-start flex-col">
                  <h1 className="text-5xl font-semibold mb-2 text-white">
                    Playstation 5
                  </h1>
                  <p className="text-sm text-left text-gray-400">
                    Incredibly powerful CPUs, GPUs, and an SSD with integrated
                    I/O will redefine your PlayStation experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="row-span-2">
              <div className=" grid grid-cols-2">
                <div className="bg-gray-300">
                  <div className="grid grid-cols-6">
                    <div className="py-4 col-span-2">
                      <img
                        src="/air.png"
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex justify-center items-start flex-col col-span-4">
                      <h1 className="text-3xl mb-2 text-left">
                        Apple <br /> AirPods
                        <span className="font-semibold"> Max</span>
                      </h1>
                      <p className="text-sm text-left text-gray-400">
                        Computational audio. Listen, it's powerful
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-600">
                  <div className="grid grid-cols-6">
                    <div className="py-4 col-span-2">
                      <img
                        src="/airpods.png"
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex justify-center items-start flex-col col-span-4">
                      <h1 className="text-3xl mb-2 text-left text-white">
                        Apple <br /> AirPods
                      </h1>
                      <p className="text-sm text-left text-gray-400">
                        Computational audio. Listen, it's powerful
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" text-center flex justify-center items-center text-7xl">
          4
        </div>
      </div>
    </div>
  );
}

export default ShopGrid;
