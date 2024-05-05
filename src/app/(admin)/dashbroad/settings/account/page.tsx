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
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <AccountForm />
      </div>
    </SettingsLayout>
    </DefaultLayout>
  )
}