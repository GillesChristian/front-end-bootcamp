import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface DateSelectorProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  label: string;
}

export function DateSelector<T extends FieldValues>({ field, label }: DateSelectorProps<T>) {
  return (
    <FormItem className="flex-1">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
