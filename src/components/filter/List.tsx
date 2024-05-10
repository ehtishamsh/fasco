import React, { useEffect, useState } from "react";

function List({ data }: { data: string[] | undefined }) {
  const [value, setValue] = useState<string[]>(data || []);
  useEffect(() => {
    setValue(data || []);
  }, [data]);
  const mapCate = value?.map((item) => {
    return (
      <div className="flex items-center mb-2" key={item}>
        <input
          type="checkbox"
          className="custom-checkbox !w-4 !h-4"
          value={item}
          id={item}
          name={item}
        />
        <p className="ml-2">{item}</p>
      </div>
    );
  });
  return <>{mapCate}</>;
}

export default List;
