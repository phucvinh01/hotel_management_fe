"use client"

import { ColumnDef } from "@tanstack/react-table"



import { formatCurrency } from "@/lib/formatCurrency"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { labels } from "@/components/table/data/data"
import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "@/components/table/data-table-row-actions"

export const columns: ColumnDef<SelectTypeRoomResulet>[] = [
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
      <DataTableColumnHeader column={column} title="Tên Loại Phòng" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("RoomName")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.Price)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {formatCurrency(row.getValue("Price"))}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "TenLoaiGiuong",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giường" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.SoLuongGiuong)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.SoLuongGiuong+"/"+row.getValue("TenLoaiGiuong")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "total_rooms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số phòng" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.total_rooms)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            { row.getValue("total_rooms")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "state_room",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạngt thái" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.total_rooms)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            { row.getValue("state_room") + "/" + row.getValue("total_rooms")}
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