import axios from '../axios/http'


export type IStaffToListResult = {
        id_hotel:string,
        id_staff:string
}


export const insertStaffToList = async (id_hotel:string , id_staff:string):Promise<string | IStaffToListResult> => {
    try {
        const res = await axios.post<IStaffToListResult>('/staff/insert', {
            id_hotel,id_staff
        })
        if(res.status === 200) {
            return res.data
        }
        else {
            return res.statusText
        }
    } catch (error) {
        throw(error)
    }
}