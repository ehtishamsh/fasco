import { Product } from "@/lib/redux/types";
import FieldMappings from "./FieldMappings";

interface FieldMappings {
  [key: string]: { label: string; icon: JSX.Element };
}
function TopDetailsGrid({ data }: { data: Product | any }) {
  const filterKeys = Object.keys(FieldMappings).filter(
    (field: string) =>
      data[field] !== null &&
      data[field] !== undefined &&
      data[field] !== "" &&
      data[field] !== 0 &&
      data[field] !== false
  );
  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3 gap-4 mt-6">
      {filterKeys.map((field: string) => {
        const { label, icon } =
          FieldMappings[field as keyof typeof FieldMappings];
        return (
          <div
            key={field}
            className="flex justify-start items-center gap-2 p-3 bg-gray-200/50 rounded-md"
          >
            <span>{icon}</span>
            <div className="flex flex-col text-xs">
              <span className="text-gray-400">{label}</span>
              <span className="line-clamp-2">{data[field]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TopDetailsGrid;
