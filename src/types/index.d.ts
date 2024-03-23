type SuggestLocationSearch = {
    city: string,
    country: string,
    tag: string,
    num_of_hotel: number
}

type SearchForm = {
    address: string,
    check_in?: Date ,
    check_out?: Date ,
    amount_room: number,
    amount_children: number,
    amount_adult: number
}
