import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Separator } from "../ui/separator";
import List from "./List";

const CollapsibleSection = ({
  title,
  data,
  selected,
  setSelected,
}: {
  title: string;
  data: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-center pb-2">
          <p className="font-semibold">{title}</p>
          <p>{isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
        </div>
        <Separator className="bg-gray-400" />
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden transition duration-300"
      >
        <motion.div className="flex flex-col mt-3 text-sm transition-all duration-300">
          <List data={data} selected={selected} setSelected={setSelected} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CollapsibleSection;
