"use client";
import Loader from "@/components/admin/common/Loader";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuthContext";
import { useGetInfoUserAdmin, useUpdateInfoUserAdminl } from "@/service/query.service";
import { Calendar as CalendarIcon, Edit3, Lock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FEMALE, MALE } from "@/constant";
import { useEffect, useState } from "react";
import { IInfoUserAdmin } from "@/service/_user.service";
import { toast } from "@/components/ui/use-toast";
import { ModalChangePassword } from "./modal-change-password";


export function AccountForm() {
  const {admin} = useAuth()
  const [userInfo, setUserInfo] = useState<IInfoUserAdmin>()

  const {data, isLoading, isError} = useGetInfoUserAdmin(admin?.id as string)

  const useUpdate = useUpdateInfoUserAdminl();

  useEffect(() => {
      if (data) {
        setUserInfo(data);
      }
    }, [data]);

  if(isLoading) return <Loader/>

  const handleUpdateClick = async () => {
        if (!userInfo?.user_name || !userInfo?.user_dob || !userInfo?.user_gender || !userInfo?.user_phone || !userInfo?.user_email) {
            toast({
              title:"Các thông tin không được rỗng",
              variant:"destructive",

            });
            return;
        }
        const res = await useUpdate.mutateAsync(userInfo)
        if(res) {
          toast({
            title: res
          })
        }
    };
 

  return (
    <div>
   <div className="grid grid-cols-12 gap-10">
      <div className="col-span-6 space-y-2">
        <div className="">
             <Label
            htmlFor='name'
            className='text-start'>
            Tên
          </Label>
          <Input
            required
            id='name'
            value={userInfo?.user_name}
            onChange={(e) =>
                setUserInfo((prev) => ({ ...prev!, user_name: e.target.value }))
              }
          />
        </div>
        <div>
           <Label
            className='text-start'>
            Ngày sinh
          </Label>
         <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !userInfo?.user_dob && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {userInfo?.user_dob ? format(userInfo?.user_dob, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white dark:bg-black dark:text-white">
        <Calendar
          mode="single"
          initialFocus
          onSelect={(e) => setUserInfo((prev) => ({ ...prev!, user_dob: e}))}
        />
      </PopoverContent>
    </Popover>
        </div>

         <div className="">
            <Label>Giới tính: </Label>
           <Select
           defaultValue={userInfo?.user_gender}
            onValueChange={(e) =>
                    setUserInfo((prev) => ({ ...prev!, user_gender: e }))
              }
           >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn giới tính" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-black dark:text-white">
            <SelectGroup>
              <SelectLabel>Giới tính</SelectLabel>
              <SelectItem value={MALE}>Nam</SelectItem>
              <SelectItem value={FEMALE}>Nữ</SelectItem>
            </SelectGroup>
          </SelectContent>
    </Select>
        </div>
         <div className="">
            <Label>Số điẹn thoại: </Label>
            <Input type="text" 
              value={userInfo?.user_phone}
               onChange={(e) =>
                setUserInfo((prev) => ({ ...prev!, user_phone: e.target.value }))
              }
            />
        </div>
      </div>
      <div className="col-span-6 space-y-2">
          <div className="">
            <Label>Email: </Label>
            <Input type="text" 
              value={userInfo?.user_email}
               onChange={(e) =>
                setUserInfo((prev) => ({ ...prev!, user_email: e.target.value }))
              }
            />
        </div>
         <div className="">
            <Label>Chức vụ: </Label>
            <Input disabled type="text" 
              value={userInfo?.user_role}
            />
        </div>
       
         <div className="">
            <Label>Tài khoản: </Label>
            <Input disabled type="text" 
              value={userInfo?.account_email}
            />
        </div>
        <div className="flex gap-1">
          <div className="">
            <Label>Thay đổi lần cuối: </Label>
            <Input disabled type="text"  className="border-none"
             value={userInfo?.info_update_at}
            />
        </div>
        <div className="">
            <Label>Đã đổi mật khẩu vào: </Label>
            <Input disabled type="text"  className="border-none"
             value={userInfo?.account_update_at}
            />
        </div>
        </div>
        
        
        
      </div>
      <div className="flex gap-5 items-end justify-items-end">
          <ModalChangePassword/>
          <Button onClick={() => handleUpdateClick()} className="bg-cyan-400 space-x-3">
            <Edit3/> <span>Cập nhật</span>
          </Button>
      </div>
    </div>
   </div>
  )
}