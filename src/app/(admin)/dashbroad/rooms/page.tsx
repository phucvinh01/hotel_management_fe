import { Metadata } from "next"
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout"
import RoomPage from "./page-room"



export const metadata: Metadata = {
  title: "Rooms",
}


export default async function TaskPage() {

  return (
    <DefaultLayout>     
      <RoomPage/>
    </DefaultLayout>
  )
}