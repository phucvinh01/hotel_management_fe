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

export const checkExistPhone = async (phone:string) : Promise<ICheckEmailExist | undefined> =>  {
 try {
    const data = await axios.get(`/check-phone-exists?phone=${phone}`);
    if (data.status === 200) {
      const res = data.data
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

export const register = async (dataForm:IRegister):Promise<boolean | undefined> => {
  try {
    const data = await axios.post(`/register`, dataForm);
    if (data.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}


export const login = async (loginEmail?:ILoginEmail, loginPhone?:ILoginPhone , type?:string): Promise<ILoginRespone | undefined> => {
 try {
    if(type === 'Email') {
    const data = await axios.post(`/login-email`, loginEmail);
        if (data.status === 200) {
          return data.data;
        }
    }
     if(type === 'Phone') {
    const data = await axios.post(`/login-phone`, loginPhone);
        if (data.status === 200) {
          return data.data;
        }
    }
   
  } catch (error) {
    console.log(error);
  }
}
