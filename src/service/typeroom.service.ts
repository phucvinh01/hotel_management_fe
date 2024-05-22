import http from '@/axios/http';
import axios from 'axios';
import { InsertResult } from './hotel.service';

export const getTypeRooms = async (id: string): Promise<any> => {
  try {
    const response = await http.get<TypeRoomsTableResult>(
      `/room/select-typeroom?id=${id}`,
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching rooms: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const insertTyperoom = async (
  body: InsertTyperoomAndImage,
): Promise<string | undefined> => {
  try {
    const response = await axios.post<string>(
      `http://localhost:8000/api/room/insert-typeroom`,
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
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    return error;
  }
};

export const updateTyperoom = async (
  body: SelectTypeRoom,
): Promise<string | boolean> => {
  try {
    const response = await http.put<string>(`/room/update-typeroom`, body);
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error: any) {
    return error;
  }
};

export const insertTyperooms = async (
  body: TypeRoom,
  id: string,
): Promise<InsertResult | false | undefined> => {
  try {
    const response = await axios.post<InsertResult>(
      `http://127.0.1:8000/api/room/insert-typeroom`,
      { ...body, HotelId: id },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
    return false;
  }
};

export async function uploadMultipleImage(
  formData: IMutilpleImageUpload,
): Promise<boolean | undefined> {
  try {
    const response = await axios.post<boolean>(
      `http://localhost:8000/api/upload-multiple-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    return error;
  }
}

export async function deleteImageTypeRoom(id: string): Promise<boolean> {
  try {
    const res = await http.delete(`delete-image-typeroom?id=${id}`);
    if (res) return true;
    else return false;
  } catch (error) { return false}
}

export const getImageTypeRoom = async (
  id: string,
): Promise<IHotelImage[] | undefined> => {
  try {
    const response = await http.get<IHotelImage[]>(
      `/image/select-image-by-typeroom?typeroom=${id}`,
    );
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 201) {
      return response.request;
    } else {
      throw new Error(`Error fetching rooms: Status ${response.status}`);
    }
  } catch (error: any) {
    throw new Error(`Error fetching rooms: Status ${error}`);
  }
};
