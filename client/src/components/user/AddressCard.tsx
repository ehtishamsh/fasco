import { Address } from "@/lib/redux/types";
import { EditModal } from "./EditModal";

function AddressCard({ address }: { address: Address[] }) {
  return address.map((item) => (
    <div className="flex gap-2 text-sm items-center">
      <div className="flex flex-col gap-3 p-4 max-sm:p-2 max-sm:justify-center  w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-sm">
            {item.default ? "Main Address" : "Secondary Address"}
            <span className="text-gray-400 text-sm"> | </span>
            <EditModal address={item} />
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
  ));
}

export default AddressCard;
