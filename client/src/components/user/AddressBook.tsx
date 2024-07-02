import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import { AddModal } from "./AddModal";
import { Address, User } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";

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
          My Address
        </h1>
      </div>
      <div className="flex justify-end items-center mt-10">
        <AddModal />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 max-sm:gap-2 border border-gray-300/85 rounded-lg">
        {address && <AddressCard address={address} />}
      </div>
    </div>
  );
}

export default AddressBook;
