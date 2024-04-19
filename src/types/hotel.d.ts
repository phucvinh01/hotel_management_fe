interface IHotel {
  id: string;
  Name: string;
  Address: string;
  Telephone: string;
  Description: string;
  LocationDetail: string;
  IsActive: number;
  TimeCheckIn: string;
  TimeCheckOut: string;
  created_at: string;
  updated_at: string;
  Type: string;
  StarRate: number | null;
  images: IHotelImage[];
}

interface IHotelImage {
  id: string;
  HotelId: string;
  TypeRoom: string;
  FileName: string;
  created_at: string | null;
  updated_at: string | null;
}
