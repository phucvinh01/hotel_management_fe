"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

const account_supper_admin = {
  username: "Administrator",
  password: "Administrator"
};


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();       
   async function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);
    console.log(email, password);
    setTimeout(() => {
      setIsLoading(false);
      if (email === account_supper_admin.username && password === account_supper_admin.password) {
        toast(
            {
                title:"Đăng nhập thành công"
            }
        )
        router.push('/main/overview');
      } else {
        toast(
            {
                title:"Tên tài khoản hoặc mật khẩu không đúng"
            }
        )
      }
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="">
            <Label className=" text-black" htmlFor="email">
              Tài khoản
            </Label>
            <Input
              id="email"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="">
            <Label className=" text-black" htmlFor="password">
              Mật khẩu
            </Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>
          <Button disabled={isLoading} className="bg-black text-white">
            {isLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Đăng nhập
          </Button>
        </div>
      </form>      
    </div>
  )
}