'use client';
import Loader from "@/components/admin/common/Loader"
import { DataTable } from "@/components/table/data-table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuthContext"
import { useGetPeople } from "@/service/query.service"
import { columns } from "./columns"
import { FlatMember, FrequentGuests } from "@/service/_booking.service"
import {columnsFrequentGuests} from './columns-frequent-guests';
export function TabsManagement() {

  const {admin} = useAuth()
 const [getPeopleQuery, getFrequentGuestsQuery] = useGetPeople(admin?.id_hotel as string)

  if(getPeopleQuery.isLoading) return <Loader/>
  if(getFrequentGuestsQuery.isLoading) return <Loader/>

 if (getPeopleQuery.isError || getFrequentGuestsQuery.isError) {
    return <div>Error!!!</div>;
  }
  return (
    <Tabs defaultValue="staying" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger className="data-[state=active]:bg-cyan-500 shadow-sm"  value="staying">🏪 Đang lưu trú</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-cyan-500 shadow-sm" value="loyal">🥰 Khách hàng thân thiết</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-cyan-500 shadow-sm" value="all">📄 Tất cả</TabsTrigger>
      </TabsList>
      <TabsContent value="staying">
        { getPeopleQuery.data && getPeopleQuery.data.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={getPeopleQuery.data as FlatMember[]}
                  />
                ): <p>Hiện chưa cho có đơn nào trong hôm nay 😥</p>}
      </TabsContent>
      <TabsContent value="loyal">
      { getPeopleQuery.data && getPeopleQuery.data.length > 0 ? (
                  <DataTable
                    columns={columnsFrequentGuests}
                    data={getFrequentGuestsQuery.data as FrequentGuests[]}
                  />
                ): <p>Hiện chưa cho có đơn nào trong hôm nay 😥</p>}
      </TabsContent>

      <TabsContent value="all">
      
      </TabsContent>
    </Tabs>
  )
}
