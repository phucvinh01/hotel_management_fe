"use client";;
import { Row } from "@tanstack/react-table"

import { ModalEditRoom } from "@/app/(admin)/dashbroad/rooms/modal-edit-room";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {


  return (
    <div className="flex space-x-2">
    <ModalEditRoom data={row.original}/>
    </div>
  )
}