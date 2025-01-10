"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";



interface AddYourWorksProps {
  worksOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddYourWorks({
  worksOpen,
  onOpenChange,
}: AddYourWorksProps) {
 

  return (
    <Dialog open={worksOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Showcase your previous works
            </DialogTitle>
            {/* <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button> */}
          </div>
        </DialogHeader>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            

            <div className="space-y-2">
              <Label htmlFor="workName">Name of Work</Label>
              <Input id="workName" placeholder="Ex: Hair Styling" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide Short Description of works"
                className="min-h-[100px] resize-none"
              />
                

            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div> <p className="text-[12px] text-muted-foreground">You can add multiple Works later from &apos;Edit Profile&apos;.</p></div>
            <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="gradient-text"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="brand"
           
            >
              Next
            </Button>
            </div>
          </div>
        </form>
       
      </DialogContent>
    </Dialog>
  );
}
