'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ModalAddRoom() {

  const [isOpen , setIsOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsOpen(false)
  }


  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 grid-cols-2">
          <div className="flex space-y-2 flex-col">
            <Label htmlFor="name" className="text-start">
              Room Name
            </Label>
            <Input
              id="name"
              type="number"
            />
          </div>
          <div className="flex space-y-2 flex-col">
            <Label htmlFor="roomtype" className="text-start">
              Room Type
            </Label>
            <Select name="roomtype">
              <SelectTrigger className="">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-y-2 flex-col">
            <Label htmlFor="state" className="text-start">
              State
            </Label>
            <Select name="state">
              <SelectTrigger className="">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Open</SelectItem>
                  <SelectItem value="banana">Block</SelectItem>
                  <SelectItem value="blueberry">Inactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-y-2 flex-col">
            <Label htmlFor="price" className="text-start">
              Price
            </Label>
            <Input
              id="price"
              type="number"
            />
          </div>
          <div className="flex space-y-2 flex-col">
            <Label htmlFor="discount" className="text-start">
              Discount
            </Label>
            <Input
              id="discount"
              type="number"
            />
          </div>
          <div className="flex space-y-2 flex-col">
            <Label htmlFor="Gift" className="text-start">
              Gift
            </Label>
            <Input
              id="Gift"
              type="text"
            />
          </div>
           <div className="flex items-center space-x-2">
      <Checkbox id="wifi" />
      <label
        htmlFor="wifi"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Wifi
      </label>
    </div>
     <div className="flex items-center space-x-2">
      <Checkbox id="breakfast" />
      <label
        htmlFor="breakfast"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Breakfast
      </label>
    </div>
     <div className="flex items-center space-x-2">
      <Checkbox id="is_morking" />
      <label
        htmlFor="is_morking"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
       Morking
      </label>
    </div>
     <div className="flex items-center space-x-2">
      <Checkbox id="cancel" />
      <label
        htmlFor="cancel"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Cancel
      </label>
    </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} type="submit">Cancel</Button>
          <Button onClick={() => handleSubmit()} type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
