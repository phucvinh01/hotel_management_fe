import http from "@/axios/http";

// export const getOnePosterById = async (idPoster: string): Promise<IPoster | false | undefined> => {
//     try {
//         const response = await http.get(`image-hotel/get-avarta-by-hotel-id?id=${idPoster}`);
//         if (response.status === 200) {
//             return response.data.result;
//         }
//     }
//     catch (error) {
//         console.log('error', error);
//         return false;
//     }
// }

export const getOnePosterByGiftCode = async (giftCode: string): Promise<any> => {
    try {
        const response = await http.get(`poster/get-one-by-giftcode?giftcode=${giftCode}`);
        if (response.status === 200) {
            return response.data.result;
        }
    }
    catch (error) {
        console.log('error', error);
        return false;
    }
}