import React from "react";

function Filter() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-2 bg-red-300">Sidebar</div>
      <div className="col-span-3 bg-blue-400">Content</div>
    </div>
  );
}

export default Filter;
