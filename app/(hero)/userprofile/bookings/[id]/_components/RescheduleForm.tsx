"use client"

import { CalendarIcon } from 'lucide-react'
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface RescheduleFormProps{
  openReschedule:boolean,
  setOpenReschedule:(open:boolean)=>void
}

export default function RescheduleForm({
  openReschedule,
  setOpenReschedule
}:RescheduleFormProps) {
  
  const [date, setDate] = React.useState<Date>()
  const [reason, setReason] = React.useState("")



  return (
    <Dialog open={openReschedule} onOpenChange={setOpenReschedule}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold gradient-text">
              Reschedule
            </DialogTitle>
           
          </div>
        </DialogHeader>

        <form  className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "2024-12-22"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Service Time</label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 PM - 3 PM</SelectItem>
                  <SelectItem value="2">3 PM - 5 PM</SelectItem>
                  <SelectItem value="3">5 PM - 7 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reason</label>
              <div className="relative">
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide your reason for rescheduling"
                  className="min-h-[120px] resize-none"
                  maxLength={250}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {reason.length}/250
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-center text-sm text-gray-500">
              The Service Provider will review your request and respond soon.
            </p>
            <Button
              type="submit"
              className="w-full "
              variant={"brand"}
            >
              Submit request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

