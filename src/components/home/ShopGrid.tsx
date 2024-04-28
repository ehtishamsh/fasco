import React from "react";

function ShopGrid() {
  return (
    <div className="">
      <div className="grid grid-cols-2 max-sm:grid-cols-1">
        <div className=" text-center">
          <div className=" grid grid-cols-1 grid-rows-4">
            <div className="row-span-2 bg-slate-200">
              <div className="grid grid-cols-2">
                <div className="pt-4">
                  <img src="/ps.png" alt="" className="max-w-80" />
                </div>
                <div className="p-4 flex justify-center items-center flex-col">
                  <h1 className="text-3xl">Playstation 5</h1>
                  <p>
                    Incredibly powerful CPUs, GPUs, and an SSD with integrated
                    I/O will redefine your PlayStation experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="row-span-2 grid grid-cols-2 ">
              <div className="bg-slate-600">2</div>
              <div className="bg-slate-700">3</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-500 text-center flex justify-center items-center text-7xl">
          4
        </div>
      </div>
    </div>
  );
}

export default ShopGrid;
