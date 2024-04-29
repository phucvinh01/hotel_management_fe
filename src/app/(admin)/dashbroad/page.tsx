import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import { RegisterNewHotelForm } from "./register-new-hotel-form";

export const metadata: Metadata = {
  title:
    "Partner - page",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const style = {
    backgroundImage: "url('/background/register-new-hotel-bg.jpg')",
    backgroundSize: 'cover',
  }

export default function Home() {
  return (
    <div>
      <div style={style} className="min-h-screen flex justify-center items-center px-10">
      <RegisterNewHotelForm/>

      </div>
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
    </div>
  );
}
