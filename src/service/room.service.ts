import http from '@/axios/http';
import { InsertResult } from './hotel.service';

export const insertRooms = async (
  body: Room | undefined,
  id: string,
  index: number,
): Promise<InsertResult | false | undefined> => {
  try {
    const response = await http.post<InsertResult>(`/room/insert-room`, {
      ...body,
      TypeRoomId: id,
      RoomName: `${body?.RoomName} ${index} `,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return false;
    throw error;
  }
};

export const insertRoom = async (
  body: Room,
): Promise<InsertResult | false | undefined> => {
  try {
    const response = await http.post<InsertResult>(`/room/insert-room`, body);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    console.log(Response);
  }
};

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

export type IgetRoomAvailability = {
  hotelId: string;
  start_date: string;
  end_date: string;
};

export type IAvailability = {
  date: string;
  status: number;
  booking_id: string;
  guest_id: string;
  check_in_date: string;
  check_out_date: string;
  booking_status: string;

};
export type IgetRoomAvailabilityResult = {
  room_id: string;
  room_name: string;
  type_name: string;
  type_price: number;
  hotel_name: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  availability: IAvailability[];
};

export const getRoomAvailability = async (
  body: IgetRoomAvailability,
): Promise<IgetRoomAvailabilityResult[] | undefined> => {
  try {
    const response = await http.get<IgetRoomAvailabilityResult[]>(
      `/room/room-availability?hotelId=${body.hotelId}&start_date=${body.start_date}&end_date=${body.end_date}`,
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

export type IStateRoomUpdate = {
  idRoom: string,
  state: number
}

export const updateStateRoom = async (body: IStateRoomUpdate): Promise<boolean> => {
  try {
    const response = await http.put<boolean>(`/room/update-state-room`, body);
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
