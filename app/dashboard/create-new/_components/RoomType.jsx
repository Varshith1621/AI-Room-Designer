import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function RoomType({selectedRoomType}) {
  return (
    <div>
        <label className="text-slate-400">Select Room Type *</label>
        <Select onValueChange={(value)=>selectedRoomType(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="RoomType" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Living Room">Living Room</SelectItem>
    <SelectItem value="Bedroom">Bedroom</SelectItem>
    <SelectItem value="Kitchen">Kitchen</SelectItem>
    <SelectItem value="Bathroom">Bathroom</SelectItem>
    <SelectItem value="Office">Office</SelectItem>
    <SelectItem value="other">Other</SelectItem>
  </SelectContent>
</Select>
    </div>
  )
}

export default RoomType
