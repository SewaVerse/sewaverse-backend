'use client'

import { ChevronRight, Upload } from 'lucide-react'
import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function AddSewaModal() {
  const [open, setOpen] = useState(true)
  const categories = {
    "Home Maintenance": {
      subCategories: ["Painting", "Plumbing", "Electrician", "Cleaning", "Gardening", "Caretaker", "Masonry"]
    },
    "Construction": {
      subCategories: ["Architecture", "Interior Design", "Renovation"]
    },
    "Computer repair & maintenance": {
      subCategories: ["Hardware", "Software", "Networking"]
    },
    "Beauty & Personal care(Female)": {
      subCategories: ["Hair", "Makeup", "Spa"]
    },
    "Beauty & Personal care(Male)": {
      subCategories: ["Hair", "Beard", "Massage"]
    },
    "Mover": {
      subCategories: ["Local", "Long Distance", "International"]
    }
  }

 

  const [category, setCategory] = React.useState<string>("Home Maintenance")
  const [subCategory, setSubCategory] = React.useState<string>("Painting")


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add your Sewa</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
      <DialogHeader>
      <DialogTitle className="text-2xl">Add your Sewa</DialogTitle>
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[200px] border-0 p-0 hover:bg-transparent focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(categories).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <ChevronRight className="h-4 w-4 mx-1" />
        
        <Select value={subCategory} onValueChange={setSubCategory}>
          <SelectTrigger className="w-[150px] border-0 p-0 hover:bg-transparent focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories[category as keyof typeof categories].subCategories.map((subCat) => (
                <SelectItem key={subCat} value={subCat}>
                  {subCat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </DialogHeader>
  

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className='flex justify-between items-center'>
         <div>
         <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title<span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              placeholder="Enter Title of Sewa"
              required
              className='w-[400px]'
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description<span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Description..."
              className="min-h-[100px]"
              required
            />
          </div>

         </div>

          <div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Images of Sewa
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
            
              className={cn(
                "border-2 border-dashed rounded-lg p-8",
                "flex flex-col items-center justify-center gap-2",
                "cursor-pointer hover:border-primary/50 transition-colors"
              )}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag your Picture here or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                Acceptable file types: jpg, png, jpeg
              </p>
             
            </div>
          </div>
          </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Price<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  id="price"
                  type="text"
                  placeholder="Enter your Desired Price..."
                  
                 
                  required
                />
                <Select defaultValue="hr">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="/hr" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr">/hr</SelectItem>
                    <SelectItem value="session">/session</SelectItem>
                    <SelectItem value="unit">/unit</SelectItem>
                    <SelectItem value="task">/task</SelectItem>
                    <SelectItem value="project">/project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="discount" className="text-sm font-medium">
                Discount
              </label>
              <div className="flex gap-2">
                <Select value='discount' >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your discount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="15">15%</SelectItem>
                  </SelectContent>
                </Select>
                <div className="w-[60px] flex items-center justify-center border rounded-md">
                  %
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total price of Sewa:</span>
              <span>Rs./hr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>10% Sewaverse service charge:</span>
              <span>- Rs. </span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total amount you'll receive:</span>
              <span>Rs. /hr</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Note: 1.5% Transaction fee will be deducted if payment gateway is used
          </p>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"

              onClick={() => setOpen(false)}
              className='gradient-text'
            >
              Cancel
            </Button>
            <Button type="submit" variant='brand'>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

