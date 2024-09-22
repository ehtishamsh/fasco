import { BreadCrum } from "@/components/BreadCrum";
import Filter from "@/components/filter/Filter";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FilterPage() {
  const path = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/categories`);
        const data = await res.json();
        console.log(data);
        // Redirect to 404 if category not found
        if (data.categories.length === 0) {
          navigate("/404");
        }

        const findCate = data.categories.find(
          (item: any) => item.name.toLowerCase() === path.category
        );
        if (findCate === undefined) {
          navigate("/404");
        }
      } catch (error) {
        console.log(error);
      }
    };
    check();
    return () => {};
  }, [path.category]);

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
