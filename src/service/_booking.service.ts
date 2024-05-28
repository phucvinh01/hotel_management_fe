import http from '../axios/http';

export type IResultGetBookings = {
  booking_id: string;
  guest_name: string;
  guest_phone: string;
  room_type: string;
  room_id: string;
  room_name: string;
  check_in_date: string;
  check_out_date: string;
  created_at: string;
  booking_status: string;
  member_count: number;
};

export type IUpdateStatusBooking = {
  confirm_by:string,
  id_booking: string,
  status: number
  message?:string
}

export const getBookings = async (
  idHotel: string,
): Promise<IResultGetBookings[] | undefined> => {
  try {
    const data = await http.get<IResultGetBookings[]>(`/all-booking?hotelId=${idHotel}`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusBooking = async (body:IUpdateStatusBooking): Promise<IUpdateStatusBooking | undefined> => {
  try {
    const result = await http.put<IUpdateStatusBooking>(`/update-state-booking`, body);
    if(result.status === 200) {
      return result.data
    }
  } catch (error :any) {
    return error
  }
}
