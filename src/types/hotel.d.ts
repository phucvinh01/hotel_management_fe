interface ApiGetPageResponse {
  result: {
    current_page: number;
    data: IHotel[]; // Đây là một mảng các đối tượng, không thể biết trước cấu trúc của chúng từ mô tả.
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
  };
  total: number;
}


interface ApiGetOneHotelRespone {

}

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
  Province_Id: string;
  StarRate: number;// | null;
  province: IProvince;

  images: IHotelImage[];
  convenients?: IConvenient[];
  policies?: IPolicy[];
  rates?: IRate[];
  type_rooms?: ITypeRoom[];
}


interface IResponeCardHotel {
  hotels:ICardHotel[]
}

interface ICardHotel {
    id: string;
    Name: string;
    Address: string;
    FileName: string;
    IsActive:number
    min_price: number;
    total_reviews: number;
    average_rating?: number | undefined;
}


interface IOneHotel extends IHotel {
  convenients: Convenient[];
  policies: Policy[];
  type_rooms: Room[];
  rates: Rate[];
}

interface Convenient {
  id: string;
  HotelId: string;
  Title: string;
  ImageIcon: string;
  Description: string[];
  created_at: string;
  updated_at: string;
}

interface Policy {
  // Define your policy properties here
}

interface Rate {
  // Define your rate properties here
}

interface Room {
  id: string;
  HotelId: string;
  Name: string;
  ConvenientRoom: string;
  ConvenientBathRoom: string;
  FloorArea: number;
  MaxQuantityMember: number;
  Price: number;
  Voi_Tam_Dung: number;
  Ban_Cong_San_Hien: number;
  Khu_Vuc_Cho: number;
  May_Lanh: number;
  Nuoc_Nong: number;
  Bon_Tam: number;
  created_at: string;
  updated_at: string;
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
  HinhAnh?: string;
  guest: IGuest;
  created_at: Date;
  updated_at: Date;
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
  TenLoaiGiuong: string;
  SoLuongGiuong: number;
  Lo_Vi_Song: boolean;
  Tu_Lanh: boolean;
  May_Giat: boolean;
  No_Moking: boolean;
  created_at: string | null;
  updated_at: string | null;
}
interface IRoom {
  id: string;
  TypeRoomId: string;
  State: boolean;
  TimeRecive: Date;
  TimeLeave: Date;
  Gift: string;
  Discount: number;
  Breakfast: boolean;
  Wifi: boolean;
  NoMoking: boolean;
  Cancel: boolean;
  ChangeTimeRecive: boolean;
  RoomName: string;
  Hinh_Thuc_Thanh_Toan: string;
  Bao_Gom_Thue_Va_Phi: string;
  created_at: string | null;
  updated_at: string | null;
}

interface IDiaDiemLanCan {
  id: string;
  HotelId: string;
  Name: string;
  Category: string;
  IsPopular: boolean;
  ImageIcon: string;
  Distance: string;
  created_at?: string;
  updated_at?: string;
}

interface IGuest {
  id: string;
  UserAccountId: string;
  Email: string;
  Telephone: string;
  Name: string;
  CCCD: string;
  Sex: boolean;
  Type: string;
  Avarta: string;
  DateOfBirth: string;
  IsActive: number;
  created_at?: string;
  updated_at?: string;
}

interface TypeImage {
  TypeName: string;
  Total: number;
  FirstImage: string | null | undefined;
}