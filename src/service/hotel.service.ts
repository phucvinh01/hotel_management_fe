
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