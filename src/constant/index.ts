export const SUCCESS = 200
export const FAILED = 404
export const EMAIL = 202
export const PHONE = 201
export const ERORR_SERVER = 'Lỗi server vui lòng kiểm tra lại'

export const dataLocationList = [
  {
    id: 1,
    name: 'Hồ Chí Minh',
  },
  {
    id: 2,
    name: 'Hà Nội',
  },
  {
    id: 3,
    name: 'Vũng Tàu',
  },
  {
    id: 4,
    name: 'Đà Lạt',
  },
  {
    id: 5,
    name: 'Nha Trang',
  },
  {
    id: 6,
    name: 'Phú Quốc',
  },
  {
    id: 7,
    name: 'Đà Nẵng',
  },
];



//STATE BOOKING
export const WATTING_COMFRIM = 0
export const COMFRIMED = 1
export const STAYING = 2
export const CHECKED_OUT = 3
export const REQUIED_CANCEL = 4
export const CANCELED = 5


//STATE ROOM
export const AVAILABLE = 0
export const INAVAILABLE = 1
export const EMPTY = "Trống"
export const NOT_EMPTY = "Đang được thuê"

//TYPE USER

export const STAFF = "Staff"
export const GUEST = "Guest"
export const SUPERADMIN = "SUPERADMIN"

// GENDER

export const MALE = "1"
export const FEMALE = "0"




