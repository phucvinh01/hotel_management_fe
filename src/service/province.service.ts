import http from "@/axios/http"

export const GetListProvinceDefault = async (): Promise<IResultGetProvice | undefined > => {
    try {
        const response = await http.get<IResultGetProvice>('/province/get-all');
        if (response.status == 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }

}