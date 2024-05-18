import http from "@/axios/http";

export const getAvartaHotelByIdHotel = async (idHotel: string): Promise<IHotelImage | false | undefined> => {
    try {
        const response = await http.get(`image-hotel/get-avarta-by-hotel-id?id=${idHotel}`);
        if (response.status === 200) {
            return response.data.result;
        }
    }
    catch (error) {
        console.log('error', error);
        return false;
    }
}  