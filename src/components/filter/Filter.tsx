import Sidebar from "./Sidebar";

function Filter() {
  return (
    <div className="grid grid-cols-8 gap-8 ">
      <div className="col-span-2 relative">
        <div className="sticky top-28">
          <Sidebar />
        </div>
      </div>
      <div className="col-span-6"></div>
    </div>
  );
}

export default Filter;
