import { BreadCrum } from "@/components/BreadCrum";
import Filter from "@/components/filter/Filter";
import { useParams } from "react-router-dom";

function FilterPage() {
  const path = useParams();
  console.log(path);
  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto">
        <BreadCrum cat={path.category} />
        <div className="mt-10">
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default FilterPage;
