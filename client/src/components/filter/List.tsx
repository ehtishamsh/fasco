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
    const hasNumbers = /\d/.test(e.target.value); // Check if item contains any digits
    const itemName = hasNumbers
      ? e.target.value.replace(/[^\d.]+/g, "") // Keep only numbers
      : e.target.value.toLowerCase(); // Keep entire text if no numbers
    setSelected((prev) => {
      if (e.target.checked) {
        return [...prev, itemName]; // Add item to selected array
      } else {
        return prev.filter((item) => item !== itemName); // Remove item from selected array
      }
    });
  };

  const mapCate = value?.map((item) => {
    const hasNumbers = /\d/.test(item); // Check if item contains any digits
    const itemName = hasNumbers
      ? item.replace(/[^\d.]+/g, "") // Keep only numbers
      : item.toLowerCase(); // Keep entire text if no numbers
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
