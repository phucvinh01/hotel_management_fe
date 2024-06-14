import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuthContext"
import { IResultGetBookings, IUpdateStatusBooking, updateStatusBooking } from "@/service/_booking.service"
import { Check } from "lucide-react"

type AlertComfrimProp = {
    data: any
}

export function AlertComfrim({data}:AlertComfrimProp) {
  const booking = data as IResultGetBookings
  const {admin} = useAuth()
  const hanleUpdateState = async () => {
    const body:IUpdateStatusBooking = {
      confirm_by:admin?.id as string,
      id_booking: booking.booking_id,
      status: 1,
    }
    const res = await updateStatusBooking(body)

    booking.booking_status = "Đã xác nhận"

    toast({
      title: "📣📣📣📣",
      description: res?.message
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='px-2 py-1 bg-cyan-500 rounded-3xl border hover:cursor-pointer hover:outline-2 flex gap-3'>
             <span>Xác nhận</span> <Check color="green"/>
          </div>
        
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-black rounded-xl text-black dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận đơn đặt phòng {booking.booking_id}</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={() => hanleUpdateState()} className="bg-cyan-500 dark:bg-cyan-900">Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
