"use client"

import { ColumnDef } from "@tanstack/react-table"



import { formatCurrency } from "@/lib/formatCurrency"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { labels } from "@/components/table/data/data"
import { DataTableRowActions } from "./data-table-row-actions"
import Badge from "@/components/shared/Badge"

export const columns: ColumnDef<SelectTypeRoom>[] = [
  // {
  //   id: "id",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "RoomName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên Loại Phòng" />
    ),
    cell: ({ row }) => <div className="w-[100px]"><Badge name={row.getValue("RoomName")} color="blue" /></div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá / Đêm" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.Price)

      return (
        <div className="flex space-x-2">
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
            <Badge name={formatCurrency(row.getValue("Price"))} color="indigo"/>
            
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
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
            <Badge name= {row.original.SoLuongGiuong+"/"+row.getValue("TenLoaiGiuong")}  color="yellow"/>
           
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
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
            <Badge name={ row.getValue("total_rooms")} color="purple"/>
            
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
          {label && label.label}
          <span className="max-w-[500px] truncate font-medium">
            <Badge name={ (row.getValue("state_room") !== null ? row.getValue("state_room"): 0)  + "/" + row.getValue("total_rooms")} color={(row.getValue("state_room") !== null ? row.getValue("state_room"): 0) != row.getValue('total_rooms') ? "green" : "pink"}/>

            
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