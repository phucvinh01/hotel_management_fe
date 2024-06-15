import http from '@/axios/http';

export type INeighborhoob = {
  id?: string;
  id_hotel: string;
  name: string;
  category: string;
  is_popular: string;
  icon?: string;
  distance: string;
  created_at?: string;
  updated_at?: string;
};

export const insertNeighboob = async (body: INeighborhoob): Promise<boolean> => {
  try {
    const data = await http.post<boolean>(`/hotel/insert-neighborhook`, body);
    if (data.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
