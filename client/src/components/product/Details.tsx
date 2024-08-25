import { Product } from "@/lib/redux/types";

interface FieldMapping {
  label: string;
  unit?: string;
}

const DetailsFieldMappings: { [key: string]: FieldMapping } = {
  screenSize: { label: "Screen Diagonal", unit: "inch" },
  cpu: { label: "Chipset" },
  ram: { label: "Ram", unit: "GB" },
  cores: { label: "Cores", unit: "cores" },
  mainCamera: { label: "Main Camera" },
  frontCamera: { label: "Front Camera" },
  battery: { label: "Battery", unit: "mAh" },
  features: { label: "Features" },
  connectivity: { label: "Connectivity" },
  sensor: { label: "Sensor" },
  screenType: { label: "Screen Type" },
  lens: { label: "Lens" },
  zoom: { label: "Zoom" },
  megapixels: { label: "Megapixels" },
  aperture: { label: "Aperture" },
  videoResolution: { label: "Video Resolution" },
  type: { label: "Type" },
  noiseCancellation: { label: "Noise Cancellation", unit: "Yes" },
  batteryLife: { label: "Battery Life" },
  wireless: { label: "Wireless", unit: "Yes" },
  microphone: { label: "Microphone", unit: "Yes" },
  storage: { label: "Storage" },
  gpu: { label: "GPU" },
  maxResolution: { label: "Max Resolution" },
  numberOfControllers: { label: "Number of Controllers" },
  compatibleGames: { label: "Compatible Games" },
};

function Details({ data }: { data: Product | any }) {
  const filterKeys = Object.keys(DetailsFieldMappings).filter(
    (field: string) =>
      data[field] !== null &&
      data[field] !== undefined &&
      data[field] !== "" &&
      data[field] !== 0 &&
      data[field] !== false
  );

  return (
    <div className="max-w-6xl mx-auto px-8 py-4 max-sm:px-4  bg-background">
      <span className="text-gray-400 inline-block my-10 text-sm ">
        {data?.description}
      </span>
      <h1 className="text-2xl font-semibold mb-8">Details</h1>
      {filterKeys.map((field: string) => {
        const { label, unit } =
          DetailsFieldMappings[field as keyof typeof DetailsFieldMappings];
        return (
          <div key={field} className="w-full">
            <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
              <h2>{label}</h2>
              <p className="max-w-96">
                {data[field]}
                {unit ? ` ${unit}` : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Details;
