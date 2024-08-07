import { Address as AddressType } from "@/lib/redux/types";
import { BiEdit, BiX } from "react-icons/bi";
import { Button } from "../ui/button";

function AddressCard({ address }: { address: AddressType }) {
  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-3 mb-4 max-sm:gap-2 max-sm:mb-2">
          <h1 className="max-sm:text-xs">
            {address.firstname} {address.lastname}
          </h1>
          <span className="bg-foreground text-sm max-sm:text-xs text-white px-[8px] py-[4px] rounded-lg">
            {address.default ? "Default" : "Secondary"}
          </span>
        </div>
        <h1 className="mb-2 max-sm:text-xs">
          {address.addressLine1}, {address.city}, {address.state}
          {address.postalCode}
        </h1>
        <span className="max-sm:text-xs">{address.country}</span>
      </div>
      <div className="flex justify-center items-center">
        <Button
          size={"icon"}
          onClick={() => (window.location.href = `/address`)}
          className="max-sm:py-1 max-sm:!px-1 max-sm:w-fit max-sm:h-fit"
        >
          <BiEdit className="text-xl max-sm:text-base" />
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <Button
          size={"icon"}
          onClick={() => (window.location.href = `/address`)}
          className="max-sm:py-1 max-sm:!px-1 max-sm:w-fit max-sm:h-fit"
        >
          <BiX className="text-xl max-sm:text-base" />
        </Button>
      </div>
    </>
  );
}

export default AddressCard;
