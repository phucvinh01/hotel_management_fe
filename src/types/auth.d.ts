type ICheckEmailExist = {
    exists: true | false
}
type IResponeRegister = {
    message: string
}


type IRegister = {
    email: string,
    password: string,
    Type: string,
    name: string,
    Telephone: string
}

type IUser = Pick<IRegister, 'email' | 'name' | 'Telephone'> & { id: string };


type authContextType = {
    user: IUser | null;
    login: () => void;
    logout: () => void;
};

type ILoginRespone = Pick<IRegister, 'email' | 'name' | 'Telephone'>;

type ILoginEmail = Pick<IRegister, 'email' | 'password'>

type ILoginPhone = Pick<IRegister, 'Telephone' | 'password'>

type ILogin = {
    formData: ILoginEmail | ILoginPhone
}



type InfoUser = {
    id: string;
    Email: string;
    Name: string;
    Telephone: string;
    CCCD: string;
    Sex: number;
    Type: string;
    Avatar: string;
    DateOfBirth: string;
};

type IAdministratorHotel = Pick<InfoUser, 'id' | 'Email' | 'Name' | 'Type'> & { id_hotel: string, id_staff: string };


type DateParts = {
    day: string;
    month: string;
    year: string;
};

interface IGuest {
    //TanVND
    id: string;
    UserAccountId: string;
    Email: string;
    Telephone: string;
    Name: string;
    Sex: number;
    Type: string;
    Avarta: string;
    DateOfBirth: string;
    IsActive: number;
    created_at: string;
    updated_at: string;
    EmailContact: string;
    TelephoneContact: string;
}