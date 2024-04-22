type ICheckEmailExist = {
    exists : true | false
}
type IResponeRegister = {
    message : string
}


type IRegister = {
    email: string,
    password: string,
    Type: string,
    name: string,
    Telephone:string
}

type IUser = Pick<IRegister, 'email' | 'name' | 'Telephone'> & { id: string };


type authContextType = {
    user: IUser | null;
    login: () => void;
    logout: () => void;
};

type ILoginRespone = Pick<IRegister, 'email' | 'name' | 'Telephone'>;

type ILoginEmail = Pick<IRegister, 'email'| 'password' >

type ILoginPhone = Pick<IRegister, 'Telephone'| 'password' >

type ILogin = {
    formData: ILoginEmail | ILoginPhone
}