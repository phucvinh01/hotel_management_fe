import { number } from 'zod';
import http from '../axios/http';
import axios from 'axios';

export type IResultGetBookings = {
  booking_id: string;
  booking_price: number;
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
  cancel_reason: string;
  payment: string;
  VAT: string;
  code_price: string;
  gift: string;
  note: string;
  members: [
    {
      BookHotelId: string;
      FullName: string;
      DateOfBirth: string;
      Sex: number;
    },
  ];
};

export type IUpdateStatusBooking = {
  confirm_by: string;
  id_booking: string;
  status: number;
  message?: string;
};

export const getBookings = async (
  idHotel: string,
): Promise<IResultGetBookings[] | undefined> => {
  try {
    const data = await http.get<IResultGetBookings[]>(
      `/all-booking?hotelId=${idHotel}`,
    );
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusBooking = async (
  body: IUpdateStatusBooking,
): Promise<IUpdateStatusBooking | undefined> => {
  try {
    const result = await http.put<IUpdateStatusBooking>(
      `/update-state-booking`,
      body,
    );
    if (result.status === 200) {
      return result.data;
    }
  } catch (error: any) {
    return error;
  }
};
interface MemberToday {
    member_name: string;
    member_dob: string | null;
    member_sex: number;
}

interface BookingToday {
    booking_id: string;
    guest_name: string;
    guest_telephone: string;
    guest_cccd: string;
    guest_sex: number;
    room_name: string;
    type_name: string;
    check_in_date: string;
    check_out_date: string;
    members: MemberToday[];
}

export interface FlatMember {
    booking_id: string;
    guest_name: string;
    guest_telephone: string;
    guest_cccd: string;
    guest_sex: number;
    room_name: string;
    type_name: string;
    check_in_date: string;
    check_out_date: string;

}

export interface FrequentGuests {
    id: string;
    guest_name: string;
    guest_email: string;
    guest_telephone: string;
    booking_count: number;
    guest_sex:number
  
}



function transformData(inputData: BookingToday[]): FlatMember[] {
  const outputData: FlatMember[] = [];

  inputData.forEach((booking) => {
    const {
      booking_id,
      guest_name,
      guest_telephone,
      guest_cccd,
      guest_sex,
      room_name,
      type_name,
      check_in_date,
      check_out_date,
    } = booking;

    outputData.push({
      booking_id,
      guest_name,
      guest_telephone,
      guest_cccd,
      guest_sex,
      room_name,
      type_name,
      check_in_date,
      check_out_date,
    });

    booking.members.forEach((member) => {
      const { member_name, member_sex } = member;

      outputData.push({
        booking_id,
        guest_name: member_name,
        guest_telephone: "",
        guest_cccd: "",
        guest_sex: member_sex,
        room_name,
        type_name,
        check_in_date,
        check_out_date,
      });
    });
  });

  return outputData;
}



export const getPeopleStayToday = async (
  idHotel: string,
): Promise<FlatMember[] | undefined> => {
  try {
    const result = await http.get<BookingToday[]>(
      `/get-customer-today?idHotel=${idHotel}`,
    );
    if (result.status === 200) {
      const data = transformData(result.data)
      return data;
    }
  } catch (error: any) {
    return error;
  }
};

export const getFrequentGuests = async (
  idHotel: string,
): Promise<FrequentGuests[] | undefined> => {
  try {
    const result = await http.get<FrequentGuests[]>(
      `/get-frequent-guests?idHotel=${idHotel}`,
    );
    if (result.status === 200) {
      return result.data;
    }
  } catch (error: any) {
    return error;
  }
};

