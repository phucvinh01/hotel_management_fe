// import {
//   ApiGetPageResponse,
//   Hotel,
//   HotelResponse,
//   ICardHotel,
//   IOneHotel,
//   IResponeCardHotel,
//   IUploadCoverImagePayload,
//   IUploadCoverImageResult,
//   Room,
//   SelectRoomsResult,
//   TypeRoom,
// } from '@/types/hotel';
import http from '../axios/http';
import axios, { AxiosInstance, AxiosError } from 'axios';

// Staff

export const insertStaff = async (
  HotelId: string,
  StaffId: string,
): Promise<InsertResult | false | undefined> => {
  try {
    const response = await http.post<InsertResult>(``);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return false;

    throw error;
  }
};

// Hotel

export const getHotelPage = async (
  page: number,
): Promise<ApiGetPageResponse | false> => {
  try {
    const data = await http.get(`hotel/get-page?page=${page}`);
    if (data.status === 200) {
      const res: ApiGetPageResponse = data.data;
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getHotel = async (id: string): Promise<HotelResponse[]> => {
  try {
    const response = await http.get<HotelResponse[]>(
      `/hotel/get-hotel?id=${id}`,
    );
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};

export interface IHotel {
  id: string;
  Name: string;
  Address: string;
  Telephone: string;
  Description?: string;
  LocationDetail?: string;
  IsActive?: number;
  TimeCheckIn: string;
  TimeCheckOut: string;
  created_at?: string;
  updated_at?: string;
  Type?: string;
  Province_Id?: string;
  StarRate?: number; // | null;
  province?: IProvince;
}

export const updateHotel = async (
  body: HotelResponse,
): Promise<boolean | undefined> => {
  try {
    const response = await http.put<boolean>(`/hotel/update-hotel`, body);
    if (response.status === 200) {
      if (response.data) {
        return true;
      }
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getOneHotelById = async (
  id: string,
): Promise<IOneHotel | false | undefined> => {
  try {
    const response = await http.get<IOneHotel>(`hotel/get-one-by-id?id=${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const getHotelsByProvince = async (
  province: string,
): Promise<ICardHotel[] | false | undefined> => {
  try {
    const response = await http.get<ICardHotel[]>(
      `hotel/hotels-by-province?province=${province}`,
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
    return false;
  }
};

export type InsertResult = {
  id: string;
  hotel_id: string;
};

export const insertHotel = async (
  body: Hotel | undefined,
): Promise<string | false | undefined> => {
  try {
    const response = await http.post<InsertResult>(`/hotel/insert-hotel`, body);
    if (response.status === 200) {
      return response.data.id;
    }
    if (response.status === 500) {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const insertTyperoom = async (
  body: TypeRoom | undefined,
  id: string,
): Promise<InsertResult | false | undefined> => {
  try {
    const response = await axios.post<InsertResult>(`/hotel/insert-typeroom`, {
      ...body,
      HotelId: id,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export async function uploadImage(
  image: File,
  typeRoom: InsertResult,
  region: string,
): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id_hotel', typeRoom.hotel_id);
    formData.append('id_typeroom', typeRoom.id);
    formData.append('region', region);

    const response = await fetch('http://localhost:8000/api/upload-image', {
      method: 'POST',
      body: formData,
    });
    console.log('Image uploaded successfully:', await response.text());
    return true;
  } catch (error) {
    console.error('Error uploading image:', error);
    return false;
  }
}

export const insertRoom = async (
  body: Room | undefined,
  id: string,
  index: number,
): Promise<InsertResult | false | undefined> => {
  try {
    const response = await axios.post<InsertResult>(`/room/insert-room`, {
      ...body,
      typeRoom_id: id,
      name_room: `${body?.RoomName} ${index} `,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

//Tan >>>>??? co gi o doi lai
// export const insertStaff = async (HotelId: string, StaffId: string): Promise<InsertResult | false | undefined> => {

// export const insertRoom = async (
//   body: Room,
// ): Promise<InsertResult | false | undefined> => {
//   try {
//     const response = await http.post<InsertResult>(`/room/insert-room`, body);
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       console.log(response);
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return false;
//   } finally {
//     console.log(Response);
//   }
// };

export const getRooms = async (
  id: string,
): Promise<SelectRoomsResult[] | undefined> => {
  try {
    const response = await http.get<SelectRoomsResult[]>(
      `/room/select-room?id=${id}`,
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching rooms: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error; // Re-throw for handling in useQuery
  }
};

export const updateRoom = async (body: Room): Promise<boolean | undefined> => {
  try {
    const response = await http.put<string>(`/room/update-room`, body);
    if (response.status === 200) {
      return true;
    } else if (response.status === 201) {
      return false;
    } else {
      throw new Error(`Error fetching rooms: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return false;
  }
};

//TanVND
export const getHotelsByProvinceId = async (
  provinceId: string,
): Promise<IResponeCardHotel | false | undefined> => {
  try {
    const response = await http.get<IResponeCardHotel>(
      `hotel/get-list-by-province-id?id=${provinceId}`,
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const searchListHotelWithParam = async (
  p_province: string,
  p_totalnight: string,
  p_totalmember: string,
  p_totalmemberchild: string,
  p_timereceive: string,
  p_totalroom: string,
): Promise<IHotel | false | undefined> => {
  try {
    const response =
      await http.get<IHotel>(`hotel/search?province=${p_province}&totalnight=${p_totalnight}&
      totalmember=${p_totalmember}&totalmemberchild=${p_totalmemberchild}
      &timereceive=${p_timereceive}&totalroom=${p_totalroom}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateImageCover = async (
  body: IUploadCoverImagePayload,
): Promise<IUploadCoverImageResult> => {
  const res = await axios.post<IUploadCoverImageResult>(
      `http://localhost:8000/api/update-cover-image-hotel`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    );
  if (res.status === 400) {
    return {
      success: false,
      mga: 'ẢNH KHÔNG ĐÚNG ĐỊNH DẠNG',
    };
  } else if (res.status === 500) {
    return {
      success: false,
      mga: 'LỖI SEVER',
    };
  } else if (res.status === 200) {
    return {
      success: true,
      mga: 'UPDATE THÀNH CÔNG',
    };
  } else {
    return {
      success: false,
      mga: 'LỖI SEVER',
    };
  }
};
