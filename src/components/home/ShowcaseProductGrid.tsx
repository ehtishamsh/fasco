import { Button } from "../ui/button";
import { GridCarousel } from "./GridCarousel";

function ShowcaseProductGrid() {
  return (
    <div className=" mt-28 ">
      <div className="grid grid-cols-4  max-lg:grid-cols-2  max-sm:hidden">
        <div className="grid grid-cols-1 bg-white">
          <div className="p-6 max-sm:p-4 flex justify-center items-center">
            <img
              src="/oneplus.png"
              alt=""
              className="max-w-full object-cover max-h-80"
            />
          </div>
          <div className="p-6 max-sm:p-4 flex flex-col gap-4 justify-end">
            <h1 className="text-3xl max-md:text-xl max-sm:text-lg font-semibold">
              OnePlus 12
            </h1>
            <p className="text-sm text-gray-500   line-clamp-3">
              iPad combines a magnificent 10.2-inch Retina display, incredible
              performance, multitasking and ease of use.
            </p>
            <Button variant={"default"} size={"lg"}>
              Shop now
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 bg-gray-100">
          <div className="p-6 max-sm:p-4 flex justify-center items-center">
            <img
              src="/watch.png"
              alt=""
              className="max-w-full object-cover max-h-80 "
            />
          </div>
          <div className="p-6 max-sm:p-4 flex flex-col gap-4 justify-end">
            <h1 className="text-3xl max-md:text-xl max-sm:text-lg font-semibold">
              Galaxy Watch 6
            </h1>
            <p className="text-sm text-gray-500  line-clamp-3">
              Galaxy Watch 6 is a bright, always-on Super AMOLED touch display,
              a touch bezel for scrolling, and a water-friendly sport band.
            </p>
            <Button variant={"default"} size={"lg"}>
              Shop now
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 bg-gray-200">
          <div className="p-6 max-sm:p-4 flex justify-center items-center">
            <img
              src="/ipadpro.png"
              alt=""
              className="max-w-full object-cover max-h-80 "
            />
          </div>
          <div className="p-6 max-sm:p-4 flex flex-col gap-4 justify-end">
            <h1 className="text-3xl max-md:text-xl max-sm:text-lg font-semibold">
              Ipad Pro
            </h1>
            <p className="text-sm text-gray-500  line-clamp-3">
              iPad combines a magnificent 10.2-inch Retina display, incredible
              performance, multitasking and ease of use.
            </p>
            <Button variant={"default"} size={"lg"}>
              Shop now
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 bg-gray-700">
          <div className="p-6 max-sm:p-4 flex justify-center items-center">
            <img
              src="/mc_grid.png"
              alt=""
              className="max-w-full object-cover max-h-80 "
            />
          </div>
          <div className="p-6 max-sm:p-4 flex flex-col gap-4 justify-end">
            <h1 className="text-3xl max-md:text-xl max-sm:text-lg font-semibold text-white">
              MacBook Pro
            </h1>
            <p className="text-sm text-gray-400  line-clamp-3">
              The new 15‑inch MacBook Pro makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <Button variant={"default"} size={"lg"}>
              Shop now
            </Button>
          </div>
        </div>
      </div>
      <div className="max-sm:block hidden">
        <GridCarousel />
      </div>
    </div>
  );
}

export default ShowcaseProductGrid;
