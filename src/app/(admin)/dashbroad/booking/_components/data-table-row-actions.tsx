"use client";;
import { Row } from "@tanstack/react-table"
import { AlertComfrim } from "./alert-comfrim";



interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {


  return (
    <div className="flex space-x-2">
        <AlertComfrim data={row.original}/>
    </div>
  )
}