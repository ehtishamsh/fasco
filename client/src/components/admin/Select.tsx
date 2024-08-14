import React, { useState, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

const Select = ({
  selectedOptions,
  setSelectedOptions,
  options,
  name,
}: {
  selectedOptions: Option | undefined; // Allow undefined for initial state
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option | undefined>>;
  options: Option[];
  name: string;
}) => {
  const [optionInput, setOptionInput] = useState<string>("");
  const [optionSuggestions, setOptionSuggestions] = useState<Option[]>([]);

  const handleOptionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setOptionInput(input);
    // Filter options based on input
    const suggestions = options.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setOptionSuggestions(suggestions);
  };

  const handleAddOption = (item: Option) => {
    setSelectedOptions(item); // Set the selected option
    setOptionInput("");
    setOptionSuggestions([]);
  };

  return (
    <div className="relative">
      <label className="text-sm  font-medium">{name}</label>
      <Input
        type="text"
        value={optionInput}
        onChange={handleOptionInputChange}
        placeholder={"Select an option"}
        className="mt-3"
      />
      {optionSuggestions.length > 0 && (
        <ul className="absolute z-10 w-[28rem] max-sm:w-[20rem] mt-3 bg-white border-border dark:bg-background border dark:border-border rounded">
          {optionSuggestions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleAddOption(option)}
              className="px-4 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-muted transition-all duration-300"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
      {selectedOptions && selectedOptions.name && (
        <span className="border relative border-border px-5 py-3 cursor-pointer text-white text-sm mt-3 inline-block rounded-md bg-foreground dark:bg-background">
          {selectedOptions?.name}
          <button>
            <X
              className="absolute right-1 top-1 w-3 h-3"
              onClick={() => setSelectedOptions(undefined)}
            />
          </button>
        </span>
      )}
    </div>
  );
};

export default Select;
