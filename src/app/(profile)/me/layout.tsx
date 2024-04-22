import AsideNav from "@/components/shared/AsideNav"
import { SidebarNav } from "@/components/shared/SideBarNav"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuthContext"
import { Metadata } from "next"
import Image from "next/image"


export const metadata: Metadata = {
  title: "Profile",
  description: "Advanced form example using react-hook-form and Zod.",
}


interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {



  return (
    <main className="container">
      <div className="space-y-6 p-10 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Cài đặt</h2>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân, tài khoản của bạn và lịch sử đặt chổ
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <AsideNav/>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </main>
  )
}