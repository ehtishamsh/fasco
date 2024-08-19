import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import Select from "../Select";

interface Option {
  id: string;
  name: string;
}
export default function ProductsTable() {
  const [getData, setData] = useState<any>({});
  const [unEditedData, setUnEditedData] = useState<any>({});
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectCategory, setSelectCategory] = useState<any>([]);

  useEffect(() => {
    setData((prev: any) => {
      return {
        ...prev,
        products:
          selectCategory?.id === undefined
            ? unEditedData?.products
            : selectCategory === undefined
            ? unEditedData?.products
            : getData?.products?.filter(
                (item: any) => selectCategory.id === item.categoryId
              ),
      };
    });
  }, [selectCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("http://localhost:4000/api/products");
        const res = await req.json();
        setData(res);
        setUnEditedData(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const req = await fetch("http://localhost:4000/api/categories");
        const res = await req.json();
        setCategories(res.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="pb-8">
      <div className="max-w-96">
        <Select
          name="Category"
          options={categories}
          selectedOptions={selectCategory}
          setSelectedOptions={setSelectCategory}
        />
      </div>
      <DataTable columns={columns} data={getData?.products || []} />
    </div>
  );
}
