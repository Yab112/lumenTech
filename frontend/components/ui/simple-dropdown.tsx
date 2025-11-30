"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SimpleDropdownProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  searchable?: boolean;
  className?: string;
}

export function SimpleDropdown({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  searchable = false,
  className,
}: SimpleDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchQuery("");
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("relative w-full", className)}>
      <Button
        ref={buttonRef}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        onClick={() => setOpen(!open)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999] w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg max-h-60 overflow-auto"
          style={{ top: "100%" }}
        >
          {searchable && (
            <div className="p-2 border-b border-slate-200 dark:border-slate-700">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800"
                autoFocus
              />
            </div>
          )}
          <div className="p-1">
            {filteredOptions.length === 0 ? (
              <div className="px-2 py-1.5 text-sm text-slate-500 dark:text-slate-400">
                No results found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-700",
                    value === option.value && "bg-slate-100 dark:bg-slate-700"
                  )}
                  onClick={() => {
                    onValueChange(option.value);
                    setOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

