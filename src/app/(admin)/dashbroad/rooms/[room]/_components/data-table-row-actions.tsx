"use client";;
import { ModalEditRoom } from "@/app/(admin)/dashbroad/rooms/[room]/_components/modal-edit-room";
import { Row } from "@tanstack/react-table"



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