import http from "@/axios/http";
import BookingHotel_Model from "@/types/booking.class";

export const createBookingHotel = async (body: BookingHotel_Model): Promise<any> => {
    try {
        const response = await http.post<string>(`/booking-hotel/add-new-booking`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                },
            },
        );

        //return response;
        if (response.status === 200) {
            return response;
        } else if (response.status === 201) {
            return response;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return false;
    }
};

export const getListBookingByGusetId = async (guestId: string): Promise<any> => {
    try {
        const response = await http.get<string>(`/booking-hotel/get-list-booking-by-guest-id?id=${guestId}`
        );
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

