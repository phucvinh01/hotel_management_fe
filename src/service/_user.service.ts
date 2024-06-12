import http from "@/axios/http"

export type IInfoUserAdmin = {
    account_id: string,
    account_update_at?: string,
    info_update_at?: string,
    user_email: string,
    user_phone: string,
    user_name: string,
    user_gender: string,
    user_dob?: Date ,
    user_role: string,
    account_email:string
}

export type IPasswordChange = {
    new_password:string,
    current_password:string,
    idUser:string
}

export type IPasswordChangeResutl = {
   success: boolean,
   mess:string
}

export const getFullInfoUserAdmin = async (isUser: string):Promise<IInfoUserAdmin> => {
    try {
        const res = await http.get<IInfoUserAdmin>(`/get-full-info-user-staff?idUser=${isUser}`)
        return res.data
    } catch (error) {
        throw(error)
    }
}

export const updateFullInfoUserAdmin = async (user: IInfoUserAdmin):Promise<string> => {
    try {
        const res = await http.post<string>(`/update-full-info-user-staff`, user)
        return res.data
    } catch (error) {
        throw(error)
    }
}


export const updatePasswordfoUserAdmin = async (body: IPasswordChange):Promise<IPasswordChangeResutl> => {
    try {
        const res = await http.post<IPasswordChangeResutl>(`/changePassword`, body)
        return res.data
    } catch (error) {
        throw(error)
    }
}