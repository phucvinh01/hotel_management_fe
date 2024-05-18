"use client"

import { ColumnDef } from "@tanstack/react-table"


import { labels, priorities, statuses } from "./data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Checkbox } from "../ui/checkbox"
import Badge from './../shared/Badge';
import { formatCurrency } from "@/lib/formatCurrency"

export const columns: ColumnDef<SelectRoomsResult>[] = [
  {
    accessorKey: "RoomName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên Phòng" />
    ),
    cell: ({ row }) => <div className="w-[80px]"><Badge name={row.getValue("RoomName")} color="blue"/></div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại Phòng" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.type_name)

      return (
        <div className="flex space-x-2">
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
            <Badge name={row.getValue("type_name")} color="purple"/>

          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "State",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.State)

      return (
        <div className="flex space-x-2">
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
          <Badge name={  row.getValue("State") === 0 ? "Trống" : "Đang được thuê"} color={row.getValue("State") === 1 ? "green" : "gray"}/>
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "type_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.type_price)

      return (
        <div className="flex space-x-2">
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
            <Badge name={formatCurrency(row.getValue("type_price"))} color="indigo"/>
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