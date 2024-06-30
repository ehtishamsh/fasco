import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDate() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Last 5 order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="5" defaultChecked>
            Last 5 orders
          </SelectItem>
          <SelectItem value="15d">Last 15 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="6m">Last 6 months</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
