'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getMe, loginWithAdministrator, login as SignIn } from '@/service/auth.service';
import { useToast } from '@/components/ui/use-toast';

interface IAuthContext {
  user: IUser | null;
  admin:IAdministratorHotel | undefined;
  login: (username: string, password: string, type: string) => void;
  loginAdministrator: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  admin:undefined,
  login: () => {},
  logout: () => {},
  loginAdministrator: () => {}
});

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUser | null>(null);
  const [admin, setAdmin] = useState<IAdministratorHotel | undefined>();
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const getMeInfo = async (id: string) => {
    const res = await getMe(id);
    return res;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      if (token) {
        const res = await getMeInfo(token as string);
        if (res) {
          console.log('setItem');
          localStorage.setItem('token', res.id);
          setUser(res)
        }
      } else {
        setUser(null);
        console.log('removeItem');
        localStorage.removeItem('token');
      }
    };

    if (!user && pathname === '/me') {
      router.replace('/');
    }

    fetchUserInfo();
  }, []);

  const loginAdministrator = async(
    email:string,password:string
  ) => {
    const res = await loginWithAdministrator({email:email,password:password})

    if(res?.id_hotel === 'underfine') {
      setAdmin(res)
      router.push("/app/partner/register-hotel")
    }
    else {
      setAdmin(res)
      router.push("/dashbroad")
    }
  }

  const login = async (
    emailOrPhone: string,
    password: string,
    type: string
  ) => {
    let respone = null;
    if (type === 'Email') {
      respone = await SignIn(
        {
          email: emailOrPhone,
          password: password,
        },
        undefined,
        'Email'
      );
    }

    if (type === 'Phone') {
      respone = await SignIn(
        undefined,
        {
          Telephone: emailOrPhone,
          password: password,
        },
        'Phone'
      );
    }
    if (respone) {
      if (respone.id) {
        toast({
          title: 'Đăng nhập thành công',
        });
        setUser(respone);
        localStorage.setItem('token', respone.id);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
      });
    }
  };

  const logout = () => {
     router.replace("/")
    localStorage.removeItem('token');
    setUser(null)
  };

  const authContextValue: IAuthContext = {
    user,
    admin,
    login,
    logout,
    loginAdministrator
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
