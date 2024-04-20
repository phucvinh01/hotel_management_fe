
import axios from '../axios/http'


export const getHotelPage = async (page: number): Promise<ApiGetPageResponse | false> => {
  try {
    const data = await axios.get(`hotel/get-page?page=${page}`);
    if (data.status === 200) {
      const res: ApiGetPageResponse = data.data;
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false
}


export const getOneHotelById = async (id: string): Promise<IOneHotel | false | undefined> => {
  try {
    const response = await axios.get<IOneHotel>(`hotel/get-one-by-id?id=${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getHotelsByProvince = async (province: string): Promise<IResponeCardHotel | false | undefined> => {
  try {
    const response = await axios.get<IResponeCardHotel>(`hotel/hotels-by-province?province=${province}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};