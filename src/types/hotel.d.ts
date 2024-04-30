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
  Description?: string;
  LocationDetail?: string;
  IsActive: number;
  TimeCheckIn: string;
  TimeCheckOut: string;
  created_at?: string;
  updated_at?: string;
  Type: string;
  StarRate?: number | null;
  images?: IHotelImage[];
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

interface IRoom {
  id?: string;
  TypeRoomId?	: string;
  State?: string;
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
}

interface IHotelImage {
  id: string;
  HotelId: string;
  TypeRoom: string;
  FileName: string;
  created_at: string | null;
  updated_at: string | null;
}


type ITypeRoom = {
  id:string,
  HotelId:string,
  Name:string,
  ConvenientRoom?:[],
  ConvenientBathRoom?:[],
  FloorArea?:number,
  MaxQuantityMember:number,
  Price:string,
  Voi_Tam_Dung:number,
  Ban_Cong_San_Hien:number,
  Khu_Vuc_Cho:number,
	May_Lanh:number,
  Nuoc_Nong:number,
  Bon_Tam:number,
  created_at?:string,
  updated_at?:string,
  TenLoaiGiuong:string,
  SoLuongGiuong:number,
  Lo_Vi_Song:number,
  Tu_Lanh:number,
  May_Giat:number,
  No_Moking:number,	
}
