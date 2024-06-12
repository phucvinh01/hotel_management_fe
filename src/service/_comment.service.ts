import http from '../axios/http';

export type IListComment = {
        "id": string,
        "id_hotel": string,
        "rate": number,
        "description": string,
        "rate_clean": number,
        "rate_comfortable": number,
        "rate_service": number,
        "images": string,
        "created_at": string,
        "customer_email": string,
        "customer_name": string
    }


export const getComments = async (
  idHotel: string,
): Promise<IListComment[] | undefined> => {
  try {
    const data = await http.get<IListComment[]>(
      `/get-comments-hotel?idHotel=${idHotel}`,
    );
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};