"use client";;
import { Row } from "@tanstack/react-table"

import { taskSchema } from "./data/schema"
import { ModalEditRoom } from "@/app/(admin)/dashbroad/rooms/modal-edit-room";
import { useState } from "react";
import { ModalDeleteRoom } from "@/app/(admin)/dashbroad/rooms/modal-delete-room";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex space-x-2">
    <ModalEditRoom data={task}/>
    <ModalDeleteRoom data={task}/>
    </div>
  )
}