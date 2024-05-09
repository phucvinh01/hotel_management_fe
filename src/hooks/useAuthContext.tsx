'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getAdmin,
  getMe,
  loginWithAdministrator,
  login as SignIn,
} from '@/service/auth.service';
import { useToast } from '@/components/ui/use-toast';
import { ERORR_SERVER } from '@/constant';

interface IAuthContext {
  user: IUser | null;
  admin: IAdministratorHotel | undefined;
  login: (username: string, password: string, type: string) => void;
  loginAdministrator: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  admin: undefined,
  login: () => {},
  logout: () => {},
  loginAdministrator: () => {},
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

  const getAdminInfo = async (id: string) => {
    const res = await getAdmin(id);
    return res;
  };

  useEffect(() => {
    const isUser = localStorage.getItem('isUser');
    const isAdmin = localStorage.getItem('isAdmin');
    const fetchUserInfo = async () => {
      if (isUser) {
        const res = await getMeInfo(isUser as string);
        if (res) {
          console.log('setItem');
          localStorage.setItem('isUser', res.id);
          setUser(res);
        }
      } else {
        setUser(null);
        console.log('removeItem');
        localStorage.removeItem('isUser');
      }

      if (isAdmin) {
        const res = await getAdminInfo(isAdmin as string);
        if (res) {
          console.log('setItem');
          localStorage.setItem('isAdmin', res.id);
          setAdmin(res);
        }
      } else {
        setAdmin(undefined);
        localStorage.removeItem('isAdmin');
      }
    };

    if (!user && pathname === '/me') {
      router.replace('/');
    }

    fetchUserInfo();
  }, []);

  const loginAdministrator = async (email: string, password: string) => {
    const respone = await loginWithAdministrator({
      email: email,
      password: password,
    });

    if (respone?.user?.id_hotel === 'underfine') {
      setAdmin(respone.user);
      router.push('/app/partner/register-hotel');
      localStorage.setItem('isAdmin', respone.user.id as string);
    } else {
      if (respone?.user) {
        setAdmin(respone?.user);
        router.push('/dashbroad');
        localStorage.setItem('isAdmin', respone.user.id as string);
      }
    }
  };

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
      if (respone.success) {
        toast({
          title: respone.message,
        });
        setUser(respone.user);
        localStorage.setItem('isUser', respone.user?.id as string);
      } else {
        toast({
          title: respone.message,
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: ERORR_SERVER,
      });
    }
  };

  const logout = () => {
    const isUser = localStorage.getItem('isUser');
    const isAdmin = localStorage.getItem('isAdmin');
    if (isUser) {
      router.replace('/');
      localStorage.removeItem('isUser');
      setUser(null);
    }
    if (isAdmin) {
      router.replace('/app/partner');
      localStorage.removeItem('isAdmin');
      setAdmin(undefined);
    }
  };

  const authContextValue: IAuthContext = {
    user,
    admin,
    login,
    logout,
    loginAdministrator,
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
