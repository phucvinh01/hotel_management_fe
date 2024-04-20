import axios from '../axios/http'


export const checkExistEmail = async (email:string) : Promise<ICheckEmailExist | undefined> =>  {
 try {
    const data = await axios.get(`/check-email-exists?email=${email}`);
    if (data.status === 200) {
      const res = data.data
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

