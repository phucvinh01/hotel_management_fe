interface IPoster {
    id: string,
    PageName: string,
    LocationIndex: number,
    FileName: string,
    created_at: Date,
    updated_at: Date,
    HaveGitCode: boolean,
    GiftCode: string,
    SubstractWithPercent: boolean,
    GiftCodePrice: number,
    GiftCodePercent: number,
    EndDate: Date,
    PosterIsUse: boolean

}