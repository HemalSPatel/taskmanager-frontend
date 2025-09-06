"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { groupService } from "@/services/api"

interface GroupDropdownProps {
    value?: string;
    onChange?: (value: string) => void;
}

export function GroupDropdown({ value: externalValue, onChange }: GroupDropdownProps) {
    const [open, setOpen] = React.useState(false)
    const value = externalValue || "";
    
    const { data: groups = [], isLoading, error } = useQuery({
            queryKey: ['groups'],
            queryFn: async () => {
                const response = await groupService.getAllGroups();
                return response.data;
            }
    });
    
    if (isLoading) {
        return <Loader2 className="h-4 w-4 animate-spin" />;
    }

    if (error) {
        return <p>Error loading groups</p>;
    }
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? groups.find((group) => group.title === value)?.title
                        : "Select group..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search groups..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No groups found.</CommandEmpty>
                        <CommandGroup>
                            {groups.map((group) => (
                                <CommandItem
                                    key={group.id}
                                    value={group.title}
                                    onSelect={(currentValue) => {
                                        onChange?.(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {group.title}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === group.title ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
