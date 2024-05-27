import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Dashbroad from "./_components/Dashbroad";


export const metadata: Metadata = {
  title:
    "Dashbroad for Administrator",
};



export default async function Home() {

  return (
    <div>
      <DefaultLayout>
        <Dashbroad />
      </DefaultLayout>
    </div>
  );
}
