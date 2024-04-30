import { Button } from "../ui/button";

function SaleSection() {
  return (
    <div className="mt-24 max-sm:mt-10">
      <div className="grid grid-cols-7 max-md:grid-cols-1   bg-gradient-to-r  from-[#434343] via:[#212121] to-[#121212]">
        <div className="col-span-2 max-md:col-span-1 flex justify-start">
          <img
            src="/sale_left.png"
            alt="sale"
            className="object-cover max-md:max-h-[300px]"
          />
        </div>
        <div className="flex justify-center items-center flex-col gap-4 col-span-3 py-10 max-sm:py-4 max-md:col-span-1 ">
          <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl text-white">
            Big Summer
            <span className="font-semibold"> Sale</span>
          </h1>
          <p className="text-sm text-gray-500 px-3">
            Best deals on all your favorite products this summer, up to 70% off.
          </p>
          <Button
            variant={"outline"}
            size={"lg"}
            className="py-6 text-lg max-sm:text-base mt-8"
          >
            Shop Now
          </Button>
        </div>
        <div className="flex justify-end col-span-2 max-md:col-span-1 ">
          <img
            src="/sale_right.png"
            alt="sale"
            className="object-cover max-md:max-h-[300px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SaleSection;
