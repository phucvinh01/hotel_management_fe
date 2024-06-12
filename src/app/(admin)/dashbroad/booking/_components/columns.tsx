"use client"

import Badge from "@/components/shared/Badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { labels } from "@/components/table/data/data"
import { IResultGetBookings } from "@/service/_booking.service"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"
import { CANCELED, CHECKED_OUT, COMFRIMED, REQUIED_CANCEL, STAYING, WATTING_COMFRIM } from "@/constant"


 export const getColorByBookingStatus = (status:number) => {
  switch (status) {
    case WATTING_COMFRIM:
      return 'blue'
    case REQUIED_CANCEL:
      return 'pink';
      case COMFRIMED:
        return 'green'
    case CANCELED:
      return 'red';
    case CHECKED_OUT:
      return 'gray';
    case STAYING:
      return 'green';
    default:
      return 'purple';
  }
};

export const getNameStatus = (status:number) => {
  switch (status) {
    case WATTING_COMFRIM:
      return 'Chờ xác nhận'
    case REQUIED_CANCEL:
      return 'Yêu cầu hủy';
      case COMFRIMED:
        return 'Đã xác nhận'
    case CANCELED:
      return 'Đã hủy';
    case CHECKED_OUT:
      return 'Đã checkout ';
    case STAYING:
      return 'Đang ở';
    default:
      return 'purple';
  }
};

export const columns: ColumnDef<IResultGetBookings>[] = [
  {
    accessorKey: "room_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại Phòng" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.room_type)

      return (
        <div className="flex space-x-2">
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
            <Badge name={row.getValue("room_type")} color="purple"/>

          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "room_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên phòng" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.room_name)

      return (
        <div className="flex space-x-2">
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
            <Badge name={row.getValue("room_name")} color="purple"/>

          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
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
          
            <Badge name={row.getValue("check_in_date")} color="purple"/>

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
            <Badge name={row.getValue("check_out_date")} color="purple"/>

          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    
  }, 
  {
    accessorKey: "booking_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.booking_status)

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
            <Badge name={getNameStatus(row.getValue("booking_status"))} color={getColorByBookingStatus(row.getValue("booking_status"))}/>

          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]