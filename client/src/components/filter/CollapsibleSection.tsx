import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Separator } from "../ui/separator";
import List from "./List";
interface CollapsibleSectionProps {
  title: string;
  data: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  select: string[];
  type?: string;
}
const CollapsibleSection = ({
  title,
  data,
  setSelected,
  select,
  type,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (select.length > 0) {
      setIsOpen(true);
    }
    return () => {};
  }, [select]);
  const open = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={open}>
        <div className="flex justify-between items-center pb-2">
          <p className="font-semibold text-sm">{title}</p>
          <p>{isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
        </div>
        <Separator className="bg-gray-200 py-[0.3px]" />
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-y-auto transition duration-300 scrollBar max-h-[300px] max-md:max-h-[160px]"
      >
        <motion.div className="flex flex-col mt-3 text-sm transition-all duration-300 pr-3 pl-2">
          <List
            data={data}
            setSelected={setSelected}
            selected={select}
            type={type}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CollapsibleSection;
