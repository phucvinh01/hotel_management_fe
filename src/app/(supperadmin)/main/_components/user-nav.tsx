import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export function UserNav() {
  const router = useRouter()
  return (
    <Button className="bg-black text-white" onClick={() => router.push('/main')}>Đăng xuất</Button>
  )
}