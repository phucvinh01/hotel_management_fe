interface IMessage {
    id: string,
    FromUserId: string,
    ToHotelOrGuestId: string,
    Information: string,
    Url: string | null,
    State: boolean,
    Type: string,
    created_at: Date | null,
    updated_at: Date | null
}