"use client"
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, SetStateAction, useContext, useState, Dispatch, useEffect } from "react";

type authContextType = {
    user: IUser | null | undefined;
    setUser: Dispatch<SetStateAction<IUser | null | undefined>>;
};

const authContextDefaultValues: authContextType = {
    user: null,
    setUser: () => {}, 
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<IUser | null>();

    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if(user) {
            localStorage.setItem("logined",user.email)
        }
        if(pathname === "/me") {
            if(!user) {
                router.replace("/")
            }
        }

    },[pathname, user, router])
   
    const value:any= {
        user,
        setUser
    }
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}


const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}