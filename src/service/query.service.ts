import {
  useQuery,
  useQueries,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

import { getTypeRooms, insertTyperoom, updateTyperoom, getImageTypeRoom, uploadMultipleImage, } from "./typeroom.service";
import { getRooms, insertRoom, IStateRoomUpdate, updateRoom, updateStateRoom } from "./room.service";
import { getHotel, getRenvenuByHotel, IHotel, updateHotel } from "./hotel.service";
import { getBookings, getFrequentGuests, getPeopleStayToday } from "./_booking.service";
import { getFullInfoUserAdmin, IInfoUserAdmin, updateFullInfoUserAdmin } from "./_user.service";
import { getComments } from "./_comment.service";
import { getAllHotel, getCurrentMonthBookings, getStatistics, getTopHotelsByRevenue, getTotalRegisterByType, getUserRegistrationsByMonth } from "./_superadmin.service";

// Query Typeroom

export function useGetTypeRooms(id: string) {
  return useQuery({
    queryKey: ["getTypeRooms",id],
    queryFn: () => getTypeRooms(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateTypeRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertTyperoomAndImage) => insertTyperoom(data),
    onSuccess: async () => {
      console.log("onSuccess");
        await queryClient.invalidateQueries({ queryKey: ['getTypeRooms'] }); 
        await queryClient.prefetchQuery({ queryKey: ['getTypeRooms'] });

    },
  });
}

export function useGetImagesTypeRoom(id: string) {
  return useQuery({
    queryKey: ["getImagesTypeRoom",id],
    queryFn: () => getImageTypeRoom(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateImagesTypeRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IMutilpleImageUpload) => uploadMultipleImage(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['getImagesTypeRoom'] }); 
        await queryClient.prefetchQuery({ queryKey: ['getImagesTypeRoom'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}

export function useUpdateTypeRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SelectTypeRoom) => updateTyperoom(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['getTypeRooms'] }); 
        await queryClient.prefetchQuery({ queryKey: ['getTypeRooms'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}


// Query room
export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Room) => insertRoom(data),
    onSuccess: async () => {
      console.log("success");
        await queryClient.invalidateQueries({ queryKey: ['rooms'] }); // Corrected line
        await queryClient.prefetchQuery({ queryKey: ['rooms'] }); // Manually refetch
    },
  });
}

export function useRooms(id: string) {
  return useQuery({
    queryKey: ["rooms",id],
    queryFn: () => getRooms(id),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

export function useUpdateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Room) => updateRoom(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['rooms'] }); 
        await queryClient.prefetchQuery({ queryKey: ['rooms'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}

export function useUpdateStateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IStateRoomUpdate) => updateStateRoom(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['rooms'] }); 
        await queryClient.prefetchQuery({ queryKey: ['rooms'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}


//Query hotel 

export function useGetRenvenuHotel(id: string | undefined) {
  return useQuery({
    queryKey: ["renvenuHotel",id],
    queryFn: () => getRenvenuByHotel(id),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}


export function useGetHotel(id: string) {
  return useQuery({
    queryKey: ["hotel",id],
    queryFn: () => getHotel(id),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

export function useUpdateHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HotelResponse) => updateHotel(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['hotel'] }); 
        await queryClient.prefetchQuery({ queryKey: ['hotel'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}


//Booking



export function useGetBooking(idHotel: string) {
  return useQuery({
    queryKey: ["useGetBooking",idHotel],
    queryFn: () => getBookings(idHotel),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

export function useGetPeople(idHotel: string) {
 const getPeopleQuery = useQuery({
    queryKey: ["useGetPeople", idHotel],
    queryFn: () => getPeopleStayToday(idHotel),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });

  const getFrequentGuestsQuery = useQuery({
    queryKey: ["getFrequentGuests", idHotel],
    queryFn: () => getFrequentGuests(idHotel),
    placeholderData: [],
    refetchOnWindowFocus: true,
  });

  return [getPeopleQuery, getFrequentGuestsQuery];
}


// UserAdmin managenment

export function useGetInfoUserAdmin(idUser: string) {
  return useQuery({
    queryKey: ["GetInfoUserAdmin",idUser],
    queryFn: () => getFullInfoUserAdmin(idUser),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

export function useUpdateInfoUserAdminl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IInfoUserAdmin) => updateFullInfoUserAdmin(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GetInfoUserAdmin'] }); 
        await queryClient.prefetchQuery({ queryKey: ['GetInfoUserAdmin'] }); 
    },
    onError: async (error) => {
      return "Cập nhật thất bại";
    },
  });
}



// Commenent Manager

export function useGetListComment(idHotel: string) {
  return useQuery({
    queryKey: ["useGetListComment",idHotel],
    queryFn: () => getComments(idHotel),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}



// Super Admin Management
export function useGetUserRegistrations() {
  return useQuery({
    queryKey: ["getUserRegistrationsByMonth"],
    queryFn: () => getUserRegistrationsByMonth(),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}


export function useGetTopHotelsByRevenue() {
  return useQuery({
    queryKey: ["useGetTopHotelsByRevenue"],
    queryFn: () => getTopHotelsByRevenue(),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}


 export function useCurrentMonthBookings() {
   return useQuery({
    queryKey: ["getCurrentMonthBookings"],
    queryFn: () => getCurrentMonthBookings(),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

 export function useGetTotalRegisterByType() {
   return useQuery({
    queryKey: ["getTotalRegisterByType"],
    queryFn: () => getTotalRegisterByType(),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

 export function useGetStatistics(month:string) {
   return useQuery({
    queryKey: ["getStatistics",month],
    queryFn: () => getStatistics(month),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

export function useGetAllHotel() {
   return useQuery({
    queryKey: ["getAllHotel"],
    queryFn: () => getAllHotel(),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}


