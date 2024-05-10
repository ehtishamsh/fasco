import React, { useEffect, useState } from "react";

function List({
  data,
  setSelected,
}: {
  data: string[] | undefined;
  selected?: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [value, setValue] = useState<string[]>(data || []);

  useEffect(() => {
    setValue(data || []);
  }, [data]);
  const checkSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((prev) => {
      const filter = prev.filter((item) => item !== e.target.name);
      if (e.target.checked) {
        return [...filter, e.target.value];
      }
      return filter;
    });
  };
  const mapCate = value?.map((item) => {
    return (
      <div
        className="flex items-center mb-2 transition-all duration-200 hover:bg-gray-200/70 rounded-md"
        key={item}
      >
        <input
          type="checkbox"
          className="custom-checkbox !w-4 !h-4"
          value={item}
          id={item}
          name={item}
          onChange={(e) => checkSelect(e)}
        />
        <p className="ml-2">{item}</p>
      </div>
    );
  });
  return <>{mapCate}</>;
}

export default List;
