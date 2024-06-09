type Member = {
  id: string;
  BookHotelId: string;
  FullName: string;
  DateOfBirth: string;
  Sex: number;
  created_at: string;
  updated_at: string;
};

type Booking = {
  id: string;
  GuestId: string;
  RoomId: string;
  ConfirmBy: string;
  CreateDate: string;
  Price: string;
  Gift: string;
  Discount: number;
  State: number;
  Notes: string;
  TimeRecive: string;
  TimeLeave: string;
  ConfirmAt: string;
  created_at: string;
  updated_at: string;
  GiftCode: string;
  GiftCodePrice: string;
  VAT: 0;
  members: Member[]
};

type _RoomResult = {
  room_id: string;
  RoomName: string;
  type_name: string;
  type_price: string;
  hotel_name: string;
  booking: Booking[]
};
