import { use, useState } from 'react';
import Error from 'next/error';
import axios from '../axios/http';
import { EMAIL, PHONE, SUCCESS } from '@/constant';
import { getUserByEmail } from './guest.service';
import { json } from 'stream/consumers';

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


type RegisterResult = {
  success: boolean,
  message: string,
}

type LoginResult = {
  user: IUser | null,
  success: boolean,
  message: string,
}
type LoginAdminResult = {
  user: IAdministratorHotel | null,
  success: boolean,
  message: string,
}

export const register = async (
  dataForm: IRegister
): Promise<RegisterResult | undefined> => {
  try {
    const data = await axios.post(`/register`, dataForm);
    if (data.status === SUCCESS) {
      return {
        success: true,
        message: "Đăng ký thành công"
      };
    }
    if (data.status === PHONE) {
      return {
        success: false,
        message: "Số điện thoại đã được đăng ký"
      };
    }
    if (data.status === EMAIL) {
      return {
        success: false,
        message: "Email đã được đăng ký"
      };
    }
  } catch (error: any) {
    return error;
  }
};

export const login = async (
  loginEmail?: ILoginEmail,
  loginPhone?: ILoginPhone,
  type?: string
): Promise<LoginResult | undefined> => {
  try {
    if (type === 'Email') {
      const data = await axios.post(`/login-email`, loginEmail);
      if (data.status === 200) {
        if (loginEmail?.email != undefined) {
          const responseGuest = await getUserByEmail(loginEmail.email);
          localStorage.setItem('IGuest', JSON.stringify(responseGuest))
          sessionStorage.setItem('IGuest', JSON.stringify(responseGuest))
        }

        return {
          user: data.data,
          success: true,
          message: "Đăng nhập thành công"
        };
      }
      else if (data.status = EMAIL) {
        return {
          user: null,
          success: false,
          message: "Email không tồn tại, bạn cần đăng ký"
        };
      }
      else if (data.status == PHONE) {
        return {
          user: null,
          success: false,
          message: "Mật khẩu không đúng, vui lòng nhập lại"
        };
      }
      else {
        return {
          user: null,
          success: false,
          message: "Lỗi sever vui lòng kiểm tra kết nối"
        };
      }
    }
    if (type === 'Phone') {
      const data = await axios.post(`/login-phone`, loginPhone);
      if (data.status === 200) {
        return {
          user: data.data,
          success: true,
          message: "Đăng nhập thành công"
        };
      }
      else if (data.status = EMAIL) {
        return {
          user: null,
          success: false,
          message: "Email không tồn tại, bạn cần đăng ký"
        };
      }
      else if (data.status == PHONE) {
        return {
          user: null,
          success: false,
          message: "Mật khẩu không đúng, vui lòng nhập lại"
        };
      }
      else {
        return {
          user: null,
          success: false,
          message: "Lỗi sever vui lòng kiểm tra kết nối"
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginWithAdministrator = async (
  formData: ILoginEmail
): Promise<LoginAdminResult | undefined> => {
  try {
    const data = await axios.post(`/login-administrator`, formData);
    if (data.status === 200) {
      return {
        user: data.data,
        success: true,
        message: "Đăng nhập thành công"
      };
    }
    else if (data.status = EMAIL) {
      return {
        user: null,
        success: false,
        message: "Email không tồn tại, bạn cần đăng ký"
      };
    }
    else if (data.status == PHONE) {
      return {
        user: null,
        success: false,
        message: "Mật khẩu không đúng, vui lòng nhập lại"
      };
    }
    else {
      return {
        user: null,
        success: false,
        message: "Lỗi sever vui lòng kiểm tra kết nối"
      };
    }
  } catch (error) {
    console.log(error);
  }
};

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
export const getAdmin = async (
  id: string
): Promise<IAdministratorHotel | undefined> => {
  try {
    const data = await axios.get(`/me?id=${id}`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (
  id: string
): Promise<InfoUser | undefined | null> => {
  try {
    const data = await axios.get(`/get-user-info?id=${id}`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

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
