"use client"

import { ColumnDef } from "@tanstack/react-table"


import { labels, priorities, statuses } from "./data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Checkbox } from "../ui/checkbox"
import { Badge } from "../ui/badge"
import { formatCurrency } from "@/lib/formatCurrency"

export const columns: ColumnDef<SelectRoomsResult>[] = [
  {
    id: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "RoomName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên Phòng" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("RoomName")}</div>,
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
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("type_name")}
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
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("State") === 0 ? "Trống" : "Đang được thuê"}
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
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            { formatCurrency(row.getValue("type_price"))}
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