import {
  useQuery,
  useQueries,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

import { getRooms, getTypeRooms, insertRoom, insertTyperoom, updateRoom, updateTyperoom } from "./hotel.service";



// export function useRooms(ids: (string | undefined)) {
//   return useQuery({
//     queryKey: ["rooms"],
//     queryFn: () => getRooms(ids as string),
//     placeholderData: keepPreviousData,
//   });
// }

// export function useProjects(page: number) {
//   return useQuery({
//     queryKey: ["projects", { page }],
//     queryFn: () => getProjects(page),
//     placeholderData: keepPreviousData,
//   });
// }

// export function useProducts() {
//   return useInfiniteQuery({
//     queryKey: ["products"],
//     queryFn: getProducts,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, _, lastPageParam) => {
//       if (lastPage.length === 0) {
//         return undefined;
//       }
//       return lastPageParam + 1;
//     },
//     getPreviousPageParam: (_, __, firstPageParam) => {
//       if (firstPageParam <= 1) {
//         return undefined;
//       }
//       return firstPageParam - 1;
//     },
//   });
// }

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