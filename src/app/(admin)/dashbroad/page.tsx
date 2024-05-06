import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import { getHotel } from "@/service/hotel.service";
import { useAuth } from "@/hooks/useAuthContext";

export const metadata: Metadata = {
  title:
    "TERA Partner",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};



export default async function Home() {

  return (
    <div>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </div>
  );
}
