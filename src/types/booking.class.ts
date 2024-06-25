
class BookingHotel_Model implements IBooking {
    id: string;
    GuestId: string;
    RoomId: string;
    ConfirmBy: string | null;
    CreateDate: Date;
    Price: number;
    Gift: string;
    Discount: number;
    State: boolean;
    Notes: string;
    TypePay: string;
    TimeRecive: Date;
    TimeLeave: Date;
    ConfirmAt: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    GiftCode: string;
    GiftCodePrice: number;
    VAT: number;

    totalRoom: number;
    members: IMemberBooking[];
    room: IRoom | null;

    constructor(bookingHotel: BookingHotel_Model) {
        this.id = bookingHotel.id
        this.GuestId = bookingHotel.GuestId
        this.RoomId = bookingHotel.RoomId
        this.ConfirmBy = bookingHotel.ConfirmBy
        this.CreateDate = bookingHotel.CreateDate
        this.Price = bookingHotel.Price
        this.Gift = bookingHotel.Gift
        this.Discount = bookingHotel.Discount
        this.State = bookingHotel.State
        this.Notes = bookingHotel.Notes
        this.TypePay = bookingHotel.TypePay
        this.TimeRecive = bookingHotel.TimeRecive
        this.TimeLeave = bookingHotel.TimeLeave
        this.ConfirmAt = bookingHotel.ConfirmAt
        this.created_at = bookingHotel.created_at
        this.updated_at = bookingHotel.updated_at
        this.GiftCode = bookingHotel.GiftCode
        this.GiftCodePrice = bookingHotel.GiftCodePrice
        this.VAT = bookingHotel.VAT
        this.totalRoom = bookingHotel.totalRoom;
        this.members = bookingHotel.members;
        this.room = bookingHotel.room;
    }

    // Add any other methods or functionality here
}

export default BookingHotel_Model;