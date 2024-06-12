import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import SettingsLayout from "../setting-layout";

export default function SettingsAccountPage() {
  return (
    <DefaultLayout>
    <SettingsLayout>
      <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông tin tài khoản 🤖</h3>
        <p className="text-sm text-muted-foreground">
          Bạn có thể xem thông tin tài khoản mình ở đây.
        </p>
      </div>
      <Separator />
      <AccountForm />
      </div>
    </SettingsLayout>
    </DefaultLayout>
  )
}