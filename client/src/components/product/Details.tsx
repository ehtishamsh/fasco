import { Product } from "@/lib/redux/types";

interface FieldMapping {
  label: string;
  unit?: string;
}

const DetailsFieldMappings: { [key: string]: { [key: string]: FieldMapping } } =
  {
    hardware: {
      cpu: { label: "Chipset" },
      ram: { label: "Ram", unit: "GB" },
      gpu: { label: "GPU" },
      cores: { label: "Cores", unit: "cores" },
      storage: { label: "Storage" },
    },
    camera: {
      mainCamera: { label: "Main Camera" },
      frontCamera: { label: "Front Camera" },
      megapixels: { label: "Megapixels" },
      aperture: { label: "Aperture" },
      videoResolution: { label: "Video Resolution" },
      lens: { label: "Lens" },
      zoom: { label: "Zoom" },
    },
    battery: {
      battery: { label: "Battery", unit: "mAh" },
      batteryLife: { label: "Battery Life" },
    },
    display: {
      screenSize: { label: "Screen Diagonal", unit: "inch" },
      screenType: { label: "Screen Type" },
      maxResolution: { label: "Max Resolution" },
    },
    audio: {
      noiseCancellation: { label: "Noise Cancellation", unit: "Yes" },
      microphone: { label: "Microphone", unit: "Yes" },
      wireless: { label: "Wireless", unit: "Yes" },
    },
    connectivityAndSensors: {
      connectivity: { label: "Connectivity" },
      sensor: { label: "Sensor" },
    },
    gaming: {
      type: { label: "Type" },
      numberOfControllers: { label: "Number of Controllers" },
      compatibleGames: { label: "Compatible Games" },
    },
    features: {
      features: { label: "Features" },
    },
  };

function Details({ data }: { data: Product | any }) {
  return (
    <div className="max-w-6xl mx-auto px-8 py-4 max-sm:px-4  bg-background">
      <span className="text-gray-400 inline-block my-10 text-sm ">
        {data?.description}
      </span>
      <h1 className="text-2xl font-semibold mb-8">Details</h1>

      {Object.keys(DetailsFieldMappings).map((category) => {
        const fields = DetailsFieldMappings[category];
        const filterKeys = Object.keys(fields).filter(
          (field: string) =>
            data[field] !== null &&
            data[field] !== undefined &&
            data[field] !== "" &&
            data[field] !== 0 &&
            data[field] !== false
        );

        if (filterKeys.length === 0) return null;

        return (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {category}
            </h2>
            {filterKeys.map((field: string) => {
              const { label, unit } = fields[field];
              return (
                <div key={field} className="w-full">
                  <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
                    <h3>{label}</h3>
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
      })}
    </div>
  );
}

export default Details;
