import React, { useEffect, useState } from "react";

function List({
  data,
  setSelected,
  selected,
  type,
}: {
  data: string[] | undefined;
  selected?: string[];
  type?: string;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [value, setValue] = useState<string[]>(data || []);

  useEffect(() => {
    setValue(data || []);
  }, [data]);

  const checkSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemName =
      type === "brand" || type === "video"
        ? e.target.value.toLowerCase()
        : e.target.value.replace(/[^\d.]+/g, "");
    console.log(itemName);
    setSelected((prev) => {
      if (e.target.checked) {
        return [...prev, itemName]; // Add item to selected array
      } else {
        return prev.filter((item) => item !== itemName); // Remove item from selected array
      }
    });
  };

  const mapCate = value?.map((item) => {
    const itemName =
      type === "brand" || type === "video"
        ? item.toLowerCase()
        : item.replace(/[^\d.]+/g, "");
    const checked = selected?.includes(itemName);
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
          checked={checked || false}
        />
        <p className="ml-2">{item}</p>
      </div>
    );
  });

  return <>{mapCate}</>;
}

export default List;
