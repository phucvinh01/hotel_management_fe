import http from "@/axios/http";

export const getListMessageByGusetId = async (guestId: string): Promise<any> => {
    try {
        const response = await http.get<string>(`/message/get-all-by-user-id?id=${guestId}`);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 201) {
            return response;
        } else {
            throw new Error(`Error fetching rooms: Status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return false;
    }
};
