'use client'
import { Separator } from "@/components/ui/separator";
import { ProfileHotelForm } from "./profile-hotel-form";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import SettingsLayout from "./setting-layout";
import { useGetHotel } from "@/service/query.service";
import { useAuth } from "@/hooks/useAuthContext";

export default function SettingsProfilePage() {

  const {admin} = useAuth()

  const { data, isLoading } = useGetHotel(admin?.id_hotel as string);

  return (
    <DefaultLayout>
    <SettingsLayout>
      <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông tin khách sạn của bạn</h3>
        <p className="text-sm text-muted-foreground">
          Bạn có thể thay đổi
        </p>
      </div>
      <Separator />
      <ProfileHotelForm data={data} isLoading={isLoading}/>
      </div>
    </SettingsLayout>
    </DefaultLayout>
  )
}