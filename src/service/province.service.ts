import http from "@/axios/http"

export const GetListProvinceDefault = async (): Promise<IProvince | false | undefined> => {
    try {
        const response = await http.get('/province/get-all');
        if (response.status == 200) {
            return response.data.result;
        }
    } catch (error) {
        return false;
    }

}