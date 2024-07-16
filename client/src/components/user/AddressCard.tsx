import { Address } from "@/lib/redux/types";
import { EditModal } from "./EditModal";

function AddressCard({ address }: { address: Address[] }) {
  const addressComponet = address.map((address, index) => {
    return (
      <div className="flex gap-2 text-sm items-center" key={index}>
        <div className="flex flex-col gap-3 p-4 max-sm:p-2 max-sm:justify-center  w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-sm">
              {address.default ? "Main Address" : "Secondary Address"}
              <span className="text-gray-400 text-sm"> | </span>
              <EditModal address={address} />
            </h1>
          </div>
          <span className="text-gray-400 text-xs">
            {address.default
              ? "Default Address"
              : address.shipping
              ? "Shipping Address"
              : address.billing
              ? "Billing Address"
              : ""}
          </span>
          <div className="mt-2">
            <h1 className="text-sm mb-2 font-semibold">
              {address.firstname} {address.lastname}
            </h1>
            <div className="text-xs flex flex-col gap-2">
              <span>{address.addressLine1.replace(/\s+/g, " ")}</span>
              <span>
                {address.city} - {address.state} - {address.country}
              </span>
              <span>{address.postalCode}</span>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <>{addressComponet}</>;
}

export default AddressCard;
