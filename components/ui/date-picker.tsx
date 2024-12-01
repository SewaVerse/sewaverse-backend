import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addDays, format, isBefore, isAfter, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

type BookingSlot = {
  date: string;
  slot: string;
  isAvailable: boolean;
};

type DatePickerWithPresetsProps = {
  selectedDate: Date | undefined;
  selectedTime: any;
  onDateTimeChange: (date: Date, startTime: string, endTime: string) => void;
};

export function DatePickerWithPresets({
  selectedDate,
  onDateTimeChange,
}: DatePickerWithPresetsProps) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);
  const [slots, setSlots] = React.useState<BookingSlot[]>([]);

  const today = startOfDay(new Date());

  const disableOutOfRangeDates = (currentDate: Date) => {
    return isBefore(currentDate, today);
  };

  React.useEffect(() => {
    if (date) {
      const generatedSlots = generateBookingSlotsForDate(date);
      setSlots(generatedSlots);
    }
  }, [date]);

  const generateBookingSlotsForDate = (selectedDate: Date): BookingSlot[] => {
    const timeSlots = [
      { start: "06:00 AM", end: "08:00 AM" },
      { start: "09:00 AM", end: "11:00 AM" },
      { start: "12:00 PM", end: "02:00 PM" },
      { start: "04:00 PM", end: "06:00 PM" },
      { start: "08:00 PM", end: "10:00 PM" },
    ];

    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      return { hours, minutes };
    };

    const currentDateTime = new Date();
    const isToday =
      currentDateTime.toDateString() === selectedDate.toDateString();

    return timeSlots.map((slot) => {
      const slotStartTime = new Date(selectedDate);
      const { hours: startHour, minutes: startMinute } = parseTime(slot.start);
      slotStartTime.setHours(startHour, startMinute, 0);

      const isAvailable = !isToday || currentDateTime < slotStartTime;

      return {
        date: format(selectedDate, "yyyy-MM-dd"),
        slot: `${slot.start} - ${slot.end}`,
        isAvailable,
      };
    });
  };

  const handleSlotSelect = (slot: BookingSlot) => {
    if (slot.isAvailable) {
      const selectedDateTime = new Date(slot.date);
      onDateTimeChange(selectedDateTime, slot.slot, "");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={disableOutOfRangeDates}
          />
        </div>
      </PopoverContent>

      {date && (
        <div className="mt-4">
          <h2 className="text-sm mb-2">Available Time Slots</h2>
          <ul className="grid grid-cols-2 gap-4">
            {slots.map((slot, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!slot.isAvailable}
                  className={`text-xs p-2 rounded-md w-full text-white ${
                    slot.isAvailable
                      ? " bg-green-500"
                      : " bg-red-500 cursor-not-allowed"
                  }`}
                >
                  {slot.slot}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Popover>
  );
}
