import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "../ui/select";
function SelectBy({
  select,
  setSelect,
}: {
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <Select value={select} onValueChange={setSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Best match" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="best">Best match</SelectItem>
            <SelectItem value="rating">By rating</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="top">Top Selling</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectBy;
