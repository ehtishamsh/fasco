import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function SelectStatus({
  selectStatus,
  setSelectStatus,
}: {
  selectStatus: string;
  setSelectStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <Select value={selectStatus} onValueChange={setSelectStatus}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Change Order Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">PENDING</SelectItem>
          <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
          <SelectItem value="SHIPPED">SHIPPED</SelectItem>
          <SelectItem value="COMPLETED">DELIVERED</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectStatus;
