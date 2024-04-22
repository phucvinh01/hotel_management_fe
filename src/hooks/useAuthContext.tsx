'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getMe, login as SignIn } from '@/service/auth.service';
import { useToast } from '@/components/ui/use-toast';

interface IAuthContext {
  user: IUser | null;
  login: (username: string, password: string, type: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUser | null>(null);
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

    if (!token || !user && pathname === '/me') {
      router.replace('/');
    }

    fetchUserInfo();
  }, []);

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
    login,
    logout,
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
