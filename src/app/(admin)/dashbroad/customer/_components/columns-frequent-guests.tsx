"use client"

import Badge from "@/components/shared/Badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { labels } from "@/components/table/data/data"
import { FlatMember, FrequentGuests } from "@/service/_booking.service"
import { ColumnDef } from "@tanstack/react-table"




export const columnsFrequentGuests: ColumnDef<FrequentGuests>[] = [
  
  {
    accessorKey: "guest_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => <div className="w-[100px]"><Badge name={row.getValue("guest_name")} color="blue" /></div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "guest_email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.guest_email)

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
          {row.getValue("guest_email")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
 
  
  {
    accessorKey: "guest_telephone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số điện thoại" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.guest_telephone)

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
         {row.getValue("guest_telephone")} 

          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    
  }, 
  {
    accessorKey: "booking_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lần đặt phòng" />
    ),
    cell: ({ row }) => 
      <div className="w-[100px]"><Badge name={row.getValue("booking_count")} color="blue" /></div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    
  }, 

]