import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown,} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Option {
  id: number;
  label: string;
  value: string;
}

const options: Option[] = [
  { id: 1, label: "Barchasini tanlash", value: "all" },
  { id: 2, label: "Dastlabki tayyorgarlik bosqichi ", value: "pre-seed" },
  { id: 4, label: "Ilk o‘sish bosqichi ", value: "series-a" },
  { id: 3, label: "G‘oyani bozorga chiqarish bosqichi", value: "seed" },
];

export default function CustomSelect() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleSelect = (option: Option) => {
    if (option.value === "all") {
      setSelectedOptions(selectedOptions.length === options.length - 1 ? [] : options.slice(1));
    } else {
      setSelectedOptions((prev) =>
        prev.some((item) => item.value === option.value)
          ? prev.filter((item) => item.value !== option.value)
          : [...prev, option]
      );
    }
  };

  const toast = useToast();
  const proccess = () => {
    toast.toast({
      description: 'Jarayonda',
      variant: 'warning',
      duration: 1000,
    });
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="w-44  relative z-40  px-3 flex justify-between items-center 
       border-2 rounded-xl text-white ">
        <span className="text-[14px] me-1" >{selectedOptions.length > 0 ? `${selectedOptions.length} ta tanlangan` : "Bosqichni tanlash"}</span>
        <ChevronDown className="w-4 " />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-40 mt-2 w-76  bg-white border rounded-lg shadow-lg max-h-60 overflow-auto p-2 py-3"
          align="start"
        >

          <div className="flex flex-col ">
            {options   
              .map((option) => (
                <label key={option.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer hover:rounded-md">
                  <input
                    type="checkbox"
                    onClick={proccess}
                    checked={
                      selectedOptions.some((sel) => sel.value === option.value) ||
                      (option.value === "all" && selectedOptions.length === options.length - 1)
                    }
                    onChange={() => handleSelect(option)}
                    className="w-4 h-4 border rounded cursor-pointer"
                  />
                  <span className="text-[14px]">{option.label}</span>
                </label>
              ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
