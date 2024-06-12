'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuthContext"
import { IPasswordChange, updatePasswordfoUserAdmin } from "@/service/_user.service"
import { Lock, X } from "lucide-react"
import { useState } from "react"

export function ModalChangePassword() {
  const {admin} = useAuth()
    const [password, setPassword] = useState<IPasswordChange>({
      current_password: "",
      new_password: "",
      idUser:admin?.id as string
    })

    const [passwordComfrim, setPasswordComfrim] = useState<string>()
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const handleSubmit = async () => {
      if(password.new_password !== passwordComfrim) {
        toast({
          title:"❌❌❌ Mật khẩu không khớp ❌❌❌"
        })
      }else {
        password.idUser = admin?.id as string
        const res = await updatePasswordfoUserAdmin(password)
        if(res.success) {
          toast({
          title:`😍😍😍 ${res.mess} 😍😍😍`
        })
        setIsOpen(false)
        }
        else {
           toast({
          title:`🥲🥲🥲 ${res.mess} 🥲🥲🥲`
        })
        }
      }
    }
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="bg-slate-300 space-x-3">
            <Lock /> <span>Thay đổi mật khẩu</span>
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black dark:text-white">
        <DialogHeader className="flex flex-row justify-between ">
         <div>
          <DialogTitle>Thay đổi mật khẩu</DialogTitle>
          <DialogDescription>
            Để đảm bảo bảo mật, chúng tôi yêu cầu bạn nhập mật khẩu hiện tại của mình
          </DialogDescription>
          </div>
          <DialogClose onClick={() => setIsOpen(false)} asChild><X size={30}/></DialogClose>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Mật khẩu hiện tại
            </Label>
            <Input
              id="name"
              type="password"
              className="col-span-3"
              onChange={(e) =>
                setPassword((prev) => ({ ...prev!, current_password: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newpassword" className="text-right">
              Mật khẩu mới
            </Label>
            <Input
              id="newpassword"
              type="password"
              className="col-span-3"
              onChange={(e) =>
                setPassword((prev) => ({ ...prev!, new_password: e.target.value }))
              }
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="re-newpassword" className="text-right">
              Nhập lại mật khẩu mới
            </Label>
            <Input
              id="re-newpassword"
              type="password"
              className="col-span-3"
              onChange={(e) => setPasswordComfrim(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleSubmit()} className="bg-cyan-400">Thay đổi mật khẩu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
