import URL_Enum from "@/axios/URL_Enum";
import http from "@/axios/http";
import axios from "axios";


export const addNewRate = async (fileList: FileList | null,
    id: string,
    HotelId: string,
    GuestId: string,
    Rating: number,
    Description: string,
    Sach_Se: number,
    Thoai_Mai: number,
    Dich_Vu: number,
): Promise<any | boolean> => {
    try {
        // Tạo FormData chứa dữ liệu cần uploadid_hotel
        const formData = new FormData();
        formData.append('id', id);
        formData.append('HotelId', HotelId);
        formData.append('GuestId', GuestId);
        formData.append('Rating', Rating.toString());
        formData.append('Description', Description);
        formData.append('Sach_Se', Sach_Se.toString());
        formData.append('Thoai_Mai', Thoai_Mai.toString());
        formData.append('Dich_Vu', Dich_Vu.toString());
        if (fileList != null) {
            formData.append('imageCount', fileList.length.toString());
            //formData.append('images', fileList[0]);
            for (let i = 0; i < fileList.length; i++) {
                formData.append('image' + i, fileList[i]);
            }
        }
        else { formData.append('imageCount', "0"); }
        console.log('data', formData);
        const response = await axios.post<boolean | string>
            (URL_Enum.BaseURL_Api + 'rate-hotel/add-new-rate', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                    },
                })
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error: any) {
        return false;
    }
}