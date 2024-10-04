import { Address, User } from "@/lib/redux/types";
import { Link } from "react-router-dom";
import { RecentOrderTable } from "./RecentOrderTable";
import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import Loading from "../ui/Loading";

function MainPage() {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [address, setAddress] = useState<Address[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) {
      window.location.href = "/signin";
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const req = await fetch(
          `https://fascobackend-production.up.railway.app/api/address/user/${user.id}`
        );
        const res = await req.json();

        if (res) {
          setAddress(res.address);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, []);
  return (
    <div className="w-full">
      <BreadCrumbAdmin paths={["Dashboard"]} end={"Manage"} />
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Manage My Account
        </h1>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 max-sm:gap-2 max-sm:grid-cols-1">
        {loading ? (
          <div className="col-span-3 flex justify-center items-center h-[35vh]">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 p-4 max-sm:p-2 max-sm:justify-center border border-gray-300/85 rounded-lg">
              <h1 className="text-sm">
                Personal Profile{" "}
                <span className="text-gray-400 text-sm"> | </span>
                <Link to={"/profile"} className="text-yellow-600">
                  Edit
                </Link>
              </h1>
              <div className="mt-2">
                <h1 className="text-sm mb-2">
                  {user.firstname} {user.lastname}
                </h1>
                <h1 className="text-sm">{user.email}</h1>
              </div>
            </div>
            <div className="col-span-2 max-sm:col-span-1 max-sm:grid-cols-1 grid grid-cols-2 border border-gray-300/85 rounded-lg ">
              {address && <AddressCard address={address} />}
            </div>
          </>
        )}
      </div>
      <div className="mt-6 border border-gray-300/85 rounded-lg p-4">
        <h1 className="border-b border-gray-300/85 pb-2">Recent Orders</h1>
        <RecentOrderTable />
      </div>
    </div>
  );
}

export default MainPage;
