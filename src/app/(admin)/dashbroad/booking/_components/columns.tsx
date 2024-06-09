"use client"

import Badge from "@/components/shared/Badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { labels } from "@/components/table/data/data"
import { IResultGetBookings } from "@/service/_booking.service"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"


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

export const columns: ColumnDef<IResultGetBookings>[] = [
  {
    accessorKey: "booking_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]"><Badge name={row.getValue("booking_id")} color="blue"/></div>,
    enableSorting: false,
    enableHiding: false,
  },
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
      <DataTableColumnHeader column={column} title="Người đặt" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.guest_name)

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
            <Badge name={row.getValue("guest_name")} color="purple"/>

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
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đặt vào" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.created_at)

      return (
        <div className="flex space-x-2">
          {label && label.label}
         <span className="max-w-[500px] truncate font-medium">
            <Badge name={row.getValue("created_at")} />

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
            <Badge name={row.getValue("booking_status")} color={getColorByBookingStatus(row.getValue("booking_status"))}/>

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