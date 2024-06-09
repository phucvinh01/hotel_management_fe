import http from "@/axios/http";

export const getUserByEmail = async (
    email: string
): Promise<any> => {
    try {
        const data = await http.get(`guest/get-one-by-email?email=${email}`);
        if (data.status === 200) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};
