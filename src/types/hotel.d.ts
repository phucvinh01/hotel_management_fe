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

  images?: IHotelImage[];
  convenients?: IConvenient[];
  policies?: IPolicy[];
  rates?: IRate[];
  type_rooms?: ITypeRoom[];
}

interface IHotelImage {
  id: string;
  HotelId: string;
  TypeRoom: string;
  FileName: string;
  created_at: string | null;
  updated_at: string | null;
}
interface IConvenient {
  id: string;
  HotelId: string;
  ImageIcon: string;
  Title: string;
  Description: string[]
  created_at: string | null;
  updated_at: string | null;
}
interface IPolicy {
  id: string;
  HotelId: string;
  ImageIcon: string;
  Name: string;
  Description: string;
  created_at: string | null;
  updated_at: string | null;
}
interface IRate {
  id: string;
  HotelId: string;
  GuestId: string;
  Rating: number;
  Description: string;
  Sach_Se: number;
  Thoai_Mai: number;
  Dich_Vu: number;
  HinhAnh: string;
  created_at: string | null;
  updated_at: string | null;
}
interface ITypeRoom {
  id: string;
  HotelId: string;
  Ban_Cong_San_Hien: boolean;
  Bon_Tam: boolean;
  ConvenientBathRoom: string;
  ConvenientRoom: string;
  FloorArea: number;
  Khu_Vuc_Cho: boolean;
  MaxQuantityMember: number;
  May_Lanh: boolean;
  Name: string;
  Nuoc_Nong: boolean;
  Price: number;
  Voi_Tam_Dung: boolean;
  created_at: string | null;
  updated_at: string | null;
}
