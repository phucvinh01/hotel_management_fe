import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"
import { DataTable } from "@/components/table/data-table"
import { columns } from "@/components/table/columns"
import { taskSchema } from "@/components/table/data/schema"
import { ModalAddRoom } from "./modal-add-room"



export const metadata: Metadata = {
  title: "Rooms",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/table/data/fakeData.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function RoomPage() {
  const tasks = await getTasks()

  return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Room List</h2>
            <p className="text-muted-foreground">
              Here is our verious rooms.
            </p>
          </div>
          <ModalAddRoom/>

        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
  )
}