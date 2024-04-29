import axios from '../axios/http';

export const checkExistEmail = async (
  email: string
): Promise<ICheckEmailExist | undefined> => {
  try {
    const data = await axios.get(`/check-email-exists?email=${email}`);
    if (data.status === 200) {
      const res = data.data;
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkExistPhone = async (
  phone: string
): Promise<ICheckEmailExist | undefined> => {
  try {
    const data = await axios.get(`/check-phone-exists?phone=${phone}`);
    if (data.status === 200) {
      const res = data.data;
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (
  dataForm: IRegister
): Promise<boolean | undefined> => {
  try {
    const data = await axios.post(`/register`, dataForm);
    if (data.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const login = async (
  loginEmail?: ILoginEmail,
  loginPhone?: ILoginPhone,
  type?: string
): Promise<IUser | undefined> => {
  try {
    if (type === 'Email') {
      const data = await axios.post(`/login-email`, loginEmail);
      if (data.status === 200) {
        return data.data;
      }
    }
    if (type === 'Phone') {
      const data = await axios.post(`/login-phone`, loginPhone);
      if (data.status === 200) {
        return data.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginWithAdministrator = async (formData:ILoginEmail ): Promise<IAdministratorHotel | undefined> => {
   try {
    const data = await axios.post(`/login-administrator`, formData);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }

}

export const getMe = async (id: string): Promise<IUser | undefined> => {
  try {
    const data = await axios.get(`/me?id=${id}`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (id: string ): Promise<InfoUser | undefined | null> =>{
try {
    const data = await axios.get(`/get-user-info?id=${id}`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateUserInfo = async (body: any) => {
  try {
    const data = await axios.post(`/update-user-info`, body);
    if (data.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
