import { Link } from "react-router-dom";
import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import { AddModal } from "./AddModal";
import { Address, User } from "@/lib/redux/types";
import { useEffect, useState } from "react";

function AddressBook() {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [address, setAddress] = useState<Address[]>([]);
  useEffect(() => {
    if (!user) {
      window.location.href = "/signin";
    }
    const fetchData = async () => {
      try {
        const req = await fetch(
          `http://localhost:4000/api/address/user/${user.id}`
        );
        const res = await req.json();
        console.log(res);
        if (res) {
          setAddress(res.address);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setAddress([]);
    };
  }, []);
  return (
    <div className="w-full">
      <BreadCrumbAdmin paths={["Dashboard"]} end={"Address"} />
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Address Book
        </h1>
      </div>
      <div className="flex justify-end items-center mt-10">
        <AddModal />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 max-sm:gap-2">
        {address &&
          address.map((item) => (
            <div className="border border-gray-300/85 rounded-lg px-4 py-2 flex gap-2 text-sm items-center">
              <div className="flex flex-col gap-3 p-4 max-sm:p-2 max-sm:justify-center  w-full">
                <div className="flex justify-between items-center">
                  <h1 className="text-sm">
                    {item.default ? "Personal Address" : ""}
                    <span className="text-gray-400 text-sm"> | </span>
                    <Link to={"/address"} className="text-yellow-600">
                      Edit
                    </Link>
                  </h1>
                </div>
                <span className="text-gray-400 text-xs">
                  {item.default
                    ? "Default Address"
                    : item.shipping
                    ? "Shipping Address"
                    : item.billing
                    ? "Billing Address"
                    : ""}
                </span>
                <div className="mt-2">
                  <h1 className="text-sm mb-2 font-semibold">
                    {item.firstname} {item.lastname}
                  </h1>
                  <div className="text-xs flex flex-col gap-2">
                    <span>{item.addressLine1.replace(/\s+/g, " ")}</span>
                    <span>
                      {item.city} - {item.state} - {item.country}
                    </span>
                    <span>{item.postalCode}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AddressBook;
