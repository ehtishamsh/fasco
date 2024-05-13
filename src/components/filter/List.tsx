import React, { useEffect, useState } from "react";

function List({
  data,
  setSelected,
  selected,
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
    const itemName = e.target.value.toLowerCase(); // Convert to lowercase
    setSelected((prev) => {
      if (e.target.checked) {
        return [...prev, itemName]; // Add item to selected array
      } else {
        return prev.filter((item) => item !== itemName); // Remove item from selected array
      }
    });
  };

  const mapCate = value?.map((item) => {
    const itemName = item.toLowerCase(); // Convert to lowercase
    const checked = selected?.includes(itemName);
    console.log(checked);
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
