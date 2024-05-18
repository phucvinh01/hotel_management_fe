interface IProvince {
    id: string,
    DisplayName: string,
    ProvinceNear: string,
    PopularRate: number,
    Address: string,
    Image: string,
    created_at: Date | null,
    updated_at: Date | null,
    hotels: IHotel[] | null;
    totalHotel?: number;
}