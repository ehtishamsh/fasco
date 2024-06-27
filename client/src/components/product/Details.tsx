import { Product } from "@/lib/redux/types";

interface Variant {
  id: string;
  name: string;
  price: string;
}
function Details({ data }: { data: Product }) {
  return (
    <div className="max-w-6xl mx-auto px-8 py-4 max-sm:px-4  bg-background">
      <h1 className="text-2xl font-semibold mb-8">Details</h1>
      <p className="text-gray-400 text-sm tracking-wide mb-8">
        {data.description}
      </p>
      <h1 className="text-2xl font-semibold mb-8">Screen</h1>
      <div className="w-full">
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Screen Diagonal</h2>
          <p>{data.screenSize}" inch</p>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-8">Hardware</h1>
      <div className="w-full">
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Chipset</h2>
          <p>{data.cpu}</p>
        </div>
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Cores</h2>
          <p>{data.cores} cores</p>
        </div>
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Ram</h2>
          <p>{data.ram}GB</p>
        </div>
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Battery</h2>
          <p>{data.battery}mAh</p>
        </div>
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Storage</h2>
          <p>{data.variants.map((item: Variant) => item.name).join(", ")}</p>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-8">Camera</h1>
      <div className="w-full">
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Main Camera</h2>
          <p>{data.mainCamera}</p>
        </div>
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Front Camera</h2>
          <p>{data.frontCamera}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
