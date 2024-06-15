'use client'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { UserNav } from "./_components/user-nav"
import { MainNav } from "./_components/main-nav"
import {  CalendarMonthPicker } from "./_components/date-range-picker"
import { useEffect, useState } from "react"
import { useGetStatistics } from "@/service/query.service"
import { format } from "date-fns"
import Loader from "@/components/admin/common/Loader"
import TabOverview from "./_components/tab-overview"
import { Download } from "lucide-react"
import ExportToExcel from "./_components/export-excel"




export default function DashboardPage() {


  const [month, setMonth] = useState(new Date)

  const {data , isLoading} = useGetStatistics(format(month,"yyyy-MM"))

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Tổng quan</h2>
            <div className="flex items-center space-x-2">
              <CalendarMonthPicker month={month} setMonth={setMonth}/>
             <ExportToExcel month={format(month,"yyyy-MM")}/>
            </div>
          </div>
          {
            isLoading && <Loader/>
          }
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Phân tích
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Báo cáo
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Thông báo
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              {
                data &&  <TabOverview data={data}/>
              }
             
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}