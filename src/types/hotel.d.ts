
interface ApiGetPageResponse {
  result: {
    current_page: number;
    data: Hotel[]; // Đây là một mảng các đối tượng, không thể biết trước cấu trúc của chúng từ mô tả.
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

interface Hotel {
  id: string;
  Name: string;
  Address: string;
  Telephone: string;
  Description?: string;
  LocationDetail?: string;
  IsActive: number;
  TimeCheckIn: string;
  TimeCheckOut: string;
  created_at?: string;
  updated_at?: string;
  Type: string;
  StarRate?: number | null;
  images?: HotelImage[];
}


interface IResponeCardHotel {
  hotels: ICardHotel[]
}

interface ICardHotel {
  id: string;
  Name: string;
  Address: string;
  FileName: string;
  IsActive: number
  min_price: string;
  total_reviews: number;
  average_rating?: number | undefined;
}


interface IOneHotel extends Hotel {
  Convenient_s: Convenient_[];
  policies: Policy[];
  type_rooms: Room[];
  rates: Rate[];
}

interface Convenient_ {
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
  id?: string;
  TypeRoomId?: string;
  State?: number;
  TimeRecive?: string;
  TimeLeave?: string;
  Gift?: string;
  Discount?: number;
  Breakfast?: number;
  Wifi?: number;
  NoSmoking?: number;
  Cancel?: number;
  ChangeTimeRecive?: number;
  created_at?: string;
  updated_at?: string;
  Hinh_Thuc_Thanh_Toan?: number;
  RoomName?: string;
  Bao_Gom_Thue_Va_Phi?: number;
  quannity?: number
  typeroom?: ITypeRoom;
}

interface HotelImage {
  id: string;
  HotelId: string;
  TypeRoom: string;
  FileName: string;
  created_at: string | null;
  updated_at: string | null;
}


type TypeRoom = {
  id: string,
  HotelId: string,
  Name: string,
  ConvenientRoom?: [],
  ConvenientBathRoom?: [],
  FloorArea?: number,
  MaxQuantityMember: number,
  Price: string,
  Voi_Tam_Dung: number,
  Ban_Cong_San_Hien: number,
  Khu_Vuc_Cho: number,
  May_Lanh: number,
  Nuoc_Nong: number,
  Bon_Tam: number,
  created_at?: string,
  updated_at?: string,
  TenLoaiGiuong: string,
  SoLuongGiuong: number,
  Lo_Vi_Song: number,
  Tu_Lanh: number,
  May_Giat: number,
  No_Moking: number,
  hotel?: IHotel;
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
  HotelId?: string;
  Ban_Cong_San_Hien: number;
  Bon_Tam: number;
  ConvenientBathRoom: string;
  ConvenientRoom: string;
  FloorArea: number;
  Khu_Vuc_Cho: number;
  MaxQuantityMember: number;
  May_Lanh: number;
  Name: string;
  Nuoc_Nong: number;
  Price: number;
  Voi_Tam_Dung: number;
  TenLoaiGiuong: string;
  SoLuongGiuong: number;
  Lo_Vi_Song: number;
  Tu_Lanh: number;
  May_Giat: number;
  No_Moking: number;
  created_at: string | null;
  updated_at: string | null;

  hotel?: IHotel;
  room?: IRoom[];
}

interface InsertTyperoomAndImage extends ITypeRoom {
  file: File[];
  region: string[];
}

interface IMutilpleImageUpload {
  file: File[];
  region: string[];
  typeroom: string,
  hotel: string,
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

  typeroom?: ITypeRoom;
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

interface IMemberBooking {
  id: string,
  BookHotelId: string,
  FullName: string,
  DateOfBirth: Date | null,
  Sex: boolean,
  created_at: Date | null,
  updated_at: Date | null

}
interface IBooking {
  id: string,
  GuestId: string,
  RoomId: string,
  ConfirmBy: string | null,
  CreateDate: Date,
  Price: number,
  Gift: string,
  Discount: number,
  State: boolean,
  Notes: string,
  TimeRecive: Date,
  TimeLeave: Date,
  ConfirmAt: Date | null,
  created_at: Date | null,
  updated_at: Date | null,
  GiftCode: string,
  GiftCodePrice: number,
  VAT: number,
  TypePay: string,
  members: IMemberBooking[],
  room: IRoom | null
}

interface IHotelImage {
  id: string;
  HotelId: string;
  TypeRoom: string;
  FileName: string;
  created_at: string | null;
  updated_at: string | null;
}


interface HotelResponse {
  id: string;
  Name: string;
  Address: string;
  Telephone: number;
  Description: string;
  LocationDetail: string;
  IsActive: number;
  TimeCheckIn: string;
  TimeCheckOut: string;
  created_at?: string | null;
  updated_at?: string | null;
  interface?: string;
  StarRate?: number;
  Province_Id?: string | null;
  number_of_room_interfaces?: string;
  total_rooms_state_0?: string,
  hotel_image: string,
  idImage: string
};

interface IUploadCoverImagePayload {
  file: File | null,
  idImage: string | undefined,
  nameFileOld: string | undefined,
  hotelId: string | undefined
}

interface IUploadCoverImageResult {
  success: boolean,
  mga: string
}

interface SelectRoomsResult {
  type_name: string;
  type_price: string;
  hotel_name: string;
  id: string;
  TypeRoomId: string;
  State: string;
  TimeRecive: string | null;
  TimeLeave: string | null;
  Gift: string;
  Discount: number;
  Breakfast: number;
  Wifi: number;
  NoSmoking: number;
  Cancel: number;
  ChangeTimeRecive: number;
  created_at: string | null;
  updated_at: string | null;
  RoomName: string;
  Hinh_Thuc_Thanh_Toan: number;
  Bao_Gom_Thue_Va_Phi: number;
}

interface SelectTypeRoom {
  id: string;
  HotelId: string;
  Name: string;
  ConvenientRoom: string;
  ConvenientBathRoom: string;
  FloorArea: string;
  MaxQuantityMember: string;
  Price: string;
  Voi_Tam_Dung: number;
  Ban_Cong_San_Hien: number;
  Khu_Vuc_Cho: number;
  May_Lanh: number;
  Nuoc_Nong: number;
  Bon_Tam: number;
  created_at: string | null;
  updated_at: string | null;
  TenLoaiGiuong: string;
  SoLuongGiuong: string;
  Lo_Vi_Song: number;
  Tu_Lanh: number;
  May_Giat: number;
  No_Moking: number;
  total_rooms: string;
  state_room: string;
  RoomName: string,
}


interface RoomsTableResult {
  data: SelectRoomsResult
}

interface TypeRoomsTableResult {
  data: SelectTypeRoom
}





