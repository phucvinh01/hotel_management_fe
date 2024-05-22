import http from "@/axios/http";
import { InsertResult } from "./hotel.service";

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