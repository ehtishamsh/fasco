import { Link } from "react-router-dom";
import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import { SelectDate } from "./SelectDate";

function Orders() {
  return (
    <div className="w-full">
      <BreadCrumbAdmin paths={["Dashboard"]} end={"Orders"} />
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Orders
        </h1>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 max-sm:gap-2">
        <div className="border border-gray-300/85 rounded-lg  px-4 py-2 flex gap-2 text-sm  items-center">
          Show: <SelectDate />
        </div>
        <div className="border border-gray-300/85 rounded-lg mt-3 gap-2 text-sm  items-center">
          <div className="flex justify-between items-center border-b border-gray-300/85  px-4 py-2 ">
            <div className=" flex flex-col gap-1">
              <span>
                Order{" "}
                <Link
                  className="text-yellow-600"
                  to={`/order/${1233443534464554}`}
                >
                  #11233443534464554
                </Link>
              </span>
              <span className="text-gray-400 text-xs">
                Placed on 25 June 2024 at 11:21:54
              </span>
            </div>
            <Link
              to={`/order/${1233443534464554}`}
              className="bg-yellow-200 py-1 px-2 max-sm:px-1  max-sm:text-xs text-sm rounded-xl text-yellow-900"
            >
              Manage
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-2 px-6 py-2  ">
            <div className="text-left w-full max-w-[170px] flex gap-1">
              <img src="/ps.png" alt="" className="w-20 h-20" />
              <img src="/ps.png" alt="" className="w-20 h-20" />
            </div>
            <div className="col-span-2">
              <h1>Dairy Omung 225 ml Carton (Pack of 27)</h1>
            </div>
            <div>
              <span>
                <span className="text-gray-400">Qty:</span> 1
              </span>
            </div>

            <div>
              <span className="text-yellow-600 bg-yellow-200 py-1 px-2 max-sm:px-1 text-xs rounded-xl">
                Shipping
              </span>
            </div>
            <div className="">
              <span>Delivered on 25 June 2024</span>
            </div>
          </div>
        </div>
        <div className="border border-gray-300/85 rounded-lg mt-3 gap-2 text-sm  items-center">
          <div className="flex justify-between items-center border-b border-gray-300/85  px-4 py-2 ">
            <div className=" flex flex-col gap-1">
              <span>
                Order{" "}
                <Link
                  className="text-yellow-600"
                  to={`/order/${1233443534464554}`}
                >
                  #11233443534464554
                </Link>
              </span>
              <span className="text-gray-400 text-xs">
                Placed on 25 June 2024 at 11:21:54
              </span>
            </div>
            <Link
              to={`/order/${1233443534464554}`}
              className="bg-yellow-200 py-1 px-2 max-sm:px-1  max-sm:text-xs text-sm rounded-xl text-yellow-900"
            >
              Manage
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-2 px-6 py-2  ">
            <div className="text-left w-full max-w-[170px] flex gap-1">
              <img src="/ps.png" alt="" className="w-20 h-20" />
              <img src="/ps.png" alt="" className="w-20 h-20" />
            </div>
            <div className="col-span-2">
              <h1>Dairy Omung 225 ml Carton (Pack of 27)</h1>
            </div>
            <div>
              <span>
                <span className="text-gray-400">Qty:</span> 1
              </span>
            </div>

            <div>
              <span className="text-yellow-600 bg-yellow-200 py-1 px-2 max-sm:px-1 text-xs rounded-xl">
                Shipping
              </span>
            </div>
            <div className="">
              <span>Delivered on 25 June 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
