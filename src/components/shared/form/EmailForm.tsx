import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const EmailForm = () => {
  return (
   <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" className="bg-orange-500 ">Đăng ký</Button>
    </div>
  )
}

export default EmailForm