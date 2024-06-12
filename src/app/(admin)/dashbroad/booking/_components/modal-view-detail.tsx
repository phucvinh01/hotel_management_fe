import Badge from '@/components/shared/Badge';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IResultGetBookings } from '@/service/_booking.service';
import { EyeIcon, X } from 'lucide-react';
import { AlertComfrim } from './alert-comfrim';
import formatDate from '@/util/formatDate';
import { formatCurrency } from '@/lib/formatCurrency';
import { WATTING_COMFRIM } from '@/constant';
import { getColorByBookingStatus, getNameStatus } from './columns';

type ModalDetailBookingProp = {
  data: any;
};

export function ModalDetailBooking({ data }: ModalDetailBookingProp) {
  const booking: IResultGetBookings = data;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <EyeIcon />
      </DialogTrigger>
      <DialogContent className='font-mono sm:max-w-[1025px] bg-white dark:bg-black text-black dark:text-white'>
        <DialogHeader>
          <DialogTitle className='flex justify-between items-center'>
            <p> 🪄 Thông tin chi tiết đơn đăt hàng {booking.booking_id}</p>
            <DialogClose asChild>
              <X className='hover:cursor-pointer' />
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            🪄 Tất cả thông tin liên quan đến đơn đặt phòng này sẽ hiện ở đây 😁
          </DialogDescription>
        </DialogHeader>
        <div>
          <Badge
            name={getNameStatus(Number(booking.booking_status))}
            color={getColorByBookingStatus(Number(booking.booking_status))}
          />
        </div>
        <div className='flex justify-between gap-2'>
          <div className='w-1/4'>
            <h3>🫅🏻 Thông tin khách hàng</h3>
            <p className='ml-10 font-bold'>{booking.guest_name}</p>
            <h3>📱 Thông tin liên lạc</h3>
            <p className='ml-10 font-bold'>{booking.guest_phone}</p>
          </div>
          <div className='w-1/4'>
            <h3>💵 Thông tin thanh toán</h3>
            <p className='ml-10 font-bold'>
              {formatCurrency(booking.booking_price.toString())}
            </p>
            <h3>🧾 Hình thức thanh toán</h3>
            <p className='ml-10 font-bold'>{booking.payment ?? 'unknown'}</p>
          </div>
          <div className='w-1/4'>
            <h3>🎊 Thông tin khuyến mãi</h3>
            <p className='ml-10 font-bold'>{booking.gift ?? 'unknown'}</p>
            <h3>🧾 Hình thức thanh toán</h3>
            <p className='ml-10 font-bold'>{booking.code_price ?? 'unknown'}</p>
          </div>
          <div className='w-1/4'>
            <h3>🏨 Thông tin phòng đặt</h3>
            <p className='ml-10 font-bold'>
              <span>{booking.room_type}</span> /{' '}
              <span>{booking.room_name}</span>
            </p>
          </div>
        </div>
        <Separator />
        <div className='flex justify-between gap-2'>
          <div className='grid gap-4 py-4'>
            <h3>📅 Thời gian ở</h3>
            <p className='ml-10'>
              <span className='text-base'>Check in</span>{' '}
              <span className='font-bold'>
                {' '}
                {formatDate(booking.check_in_date)}
              </span>
            </p>
            <p className='ml-10'>
              <span className='text-base'>Check out</span>{' '}
              <span className='font-bold'>
                {formatDate(booking.check_out_date)}
              </span>
            </p>
           
          </div>
           <div className='w-1/2 p-5 border border-green-500 rounded-xl'>
              <p>{booking.note ??  "Không có ghi chú 📝📝"}</p>
            </div>
          {booking.booking_status === 'Đã hủy' && (
            <div className='w-1/2 p-5 border border-red-500 rounded-xl'>
              <p className='font-bold text-red-500'>Lý do hủy</p>
              <small>{booking.cancel_reason}</small>
            </div>
          )}
        </div>

        <Separator />
        <div className='flex gap-3'>
          <div>
            <h3>👥 Thông tin số người</h3>
            <p className='ml-10'>
              <span className='text-base'>Số người</span>{' '}
              <span className='font-bold'> {booking.member_count}</span>
            </p>
          </div>
          <ul>
            {booking.members.map((item, index) => {
              return (
                <li key={index}>
                  <div className='flex gap-4'>
                    <p>🫅🏻 {item.FullName}</p>
                    <p>📆 {item.DateOfBirth ?? "unknown"}</p>
                    <p>👩 🧑 {item.Sex === 1 ? 'Nam' : 'Nữ'}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='flex gap-4 items-center'>
          <h3>✉️ Xác nhận và gữi email cho khách hàng ➜</h3>
          {booking.booking_status === WATTING_COMFRIM.toString() ? (
           <AlertComfrim data={booking} />
          ) : (
             'Đã xác nhận'
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
