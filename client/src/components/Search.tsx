import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BsSearch } from "react-icons/bs";

function Search() {
  return (
    <>
      <Input type="text" className="py-5 " placeholder="Search" />
      <Button
        variant={"outline"}
        size={"icon"}
        className="border-none absolute right-1 py-1"
      >
        <BsSearch size={18} className=" text-gray-400" />
      </Button>
    </>
  );
}

export default Search;
