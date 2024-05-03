import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "TERA Partner",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};



export default function Home() {
  return (
    <div>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </div>
  );
}
