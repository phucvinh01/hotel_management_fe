import http from '@/axios/http';
import { EMAIL, PHONE } from '@/constant';
import axios from 'axios';
import { string } from 'zod';

type UserRegistrationsByMonth = {
  name: string;
  total: number;
};

export type TopHotelRevenue = {
  hotel_id: string;
  hotel_name: string;
  total_revenue: string;
  staff_id: string;
  staff_email: string;
};

type TotalRegisterByType = {
  month: string;
  staff: number;
  guest: number;
};

type CurrentMonthBookings = {
  month: string;
  total_bookings: number;
};

export type Statistics = {
  month: string;
  registrations: TotalRegisterByType;
  total_bookings: number;
  top_hotels: TopHotelRevenue[];
};

export const getUserRegistrationsByMonth = async (): Promise<
  UserRegistrationsByMonth[]
> => {
  try {
    const res = await http.get<UserRegistrationsByMonth[]>(
      `/user-registrations`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTopHotelsByRevenue = async (): Promise<TopHotelRevenue[]> => {
  try {
    const res = await http.get<TopHotelRevenue[]>(`/get-top-hotels-by-revenue`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalRegisterByType =
  async (): Promise<TotalRegisterByType> => {
    try {
      const res = await http.get<TotalRegisterByType>(
        `/get-total-register-by-type`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

export const getCurrentMonthBookings =
  async (): Promise<CurrentMonthBookings> => {
    try {
      const res = await http.get<CurrentMonthBookings>(
        `/get-current-month-bookings`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

export const getStatistics = async (month: string): Promise<Statistics> => {
  try {
    const res = await http.get<Statistics>(
      `/get-statistics-by-month?month=${month}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

interface Room {
  type_room_name: string;
  typeroom_price: number;
  typeroom_maxpeople: number;
  typeroom_type_bed: string;
  typeroom_num_bed: number;
  typeroom_convenient: string;
  room_count: number;
}

interface Hotel {
  hotel_id: string;
  hotel_name: string;
  hotel_address: string;
  hotel_phone: string;
  hotel_decs: string;
  hotel_created: string | null;
  rooms: Room[];
}

export interface User {
  user_id: string;
  user_email: string;
  user_name: string;
  user_phone: string;
  user_created: string;
  hotel_id: string;
  hotel_name: string;
  hotel_address: string;
  hotel_phone: string;
  hotel_decs: string;
  hotel_created: string | null;
  rooms: Room[];
}

export const getHotelRegisterByMonth = async (
  month: string,
): Promise<User[]> => {
  try {
    const res = await http.get<User[]>(
      `/get-user-staff-registrations?monthYear=${month}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export interface AllHotel {
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    created_at: string;
  };
  hotel: {
    id: string;
    name: string;
    address: string;
    phone: string;
    description: string;
    created_at: string;
    total_room_types: string;
    total_rooms: string;
    is_active: number
  };
}

export interface UserData {
  user_email: string;
  user_name: string;
  user_phone: string;
  created_at: string;
  user_type: string
}

export interface UserDataManagement {
  current_month: {
    staff:UserData[],
    guest:UserData[]
  };
  all_users:UserData[]
}

export const getAllHotel = async (): Promise<AllHotel[]> => {
  try {
    const res = await http.get<AllHotel[]>(
      `/get-all-hotel`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginSuperAdmin = async (formData: FormData): Promise<any> => {
  try {
    const data = await http.post(`login-super-administrator`, formData);
    console.log(data);
    if (data.status === 200) {

      return {
        user: data.data,
        success: true,
        message: "Đăng nhập thành công"
      };
    }
    else if (data.status = 204) {
      return {
        user: null,
        success: false,
        message: "Tài khoản không có quyên truy cập chức năng này"
      };
    }
    else if (data.status == 205) {
      return {
        user: null,
        success: false,
        message: "Mật khẩu không đúng, vui lòng nhập lại"
      };
    }
    else {
      return {
        user: null,
        success: false,
        message: "Lỗi sever vui lòng kiểm tra kết nối"
      };
    }
  } catch (error) {
    console.log(error);
  }

}

export const getUserData = async (): Promise<UserDataManagement> => {
  try {
    const res = await http.get<UserDataManagement>(
      `/get-user-data`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};