"use client";;
import { Row } from "@tanstack/react-table"

import { ModelViewTypeRoom } from "./modal-view-typeroom";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {


  return (
    <div className="flex space-x-2">
        <ModelViewTypeRoom data={row.original}/>
    </div>
  )
}