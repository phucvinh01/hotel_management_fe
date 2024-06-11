"use client"

import Badge from "@/components/shared/Badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { labels } from "@/components/table/data/data"
import { FlatMember } from "@/service/_booking.service"
import { ColumnDef } from "@tanstack/react-table"


const getColorByBookingStatus = (status:string) => {
  switch (status) {
    case 'Đã xác nhận':
      return 'blue'
    case 'Yêu cầu hủy':
      return 'pink';
    case 'Đã hủy':
      return 'red';
    case 'Checked out':
      return 'gray';
    case 'Đang ở':
      return 'green';
    default:
      return 'purple';
  }
};

export const columns: ColumnDef<FlatMember>[] = [
  
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
    accessorKey: "guest_cccd",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chứng minh thư" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.guest_cccd)

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
          {row.getValue("guest_cccd")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
 
   {
    accessorKey: "guest_sex",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giới tính" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.guest_sex.toString())

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
          
           {row.getValue("guest_sex") === 1 ? "Nam" : "Nữ"}

          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    
  },
  {
    accessorKey: "check_in_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày nhận phòng" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.check_in_date)

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
         {row.getValue("check_in_date")} 

          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    
  }, 
  {
    accessorKey: "check_out_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày trả phòng" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.check_out_date)

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
        {row.getValue("check_out_date")}

          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    
  }, 

]