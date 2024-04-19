import axios from '../axios/http'
export const getHotelPage = async (page: number) => {
     try {
    const data = await axios.get(`hotel/get-page?page=${page}`)
    console.log(data)
  } catch (error) {
    console.log(error);
    return false;
  }
}