"use client";
import Loader from "@/components/admin/common/Loader";
import { DataTable } from "@/components/table/data-table";
import { useGetAllHotel, useGetAllUseData } from "@/service/query.service";
import React from "react";
import { columns } from "./_components/column";
import { MainNav } from "../_components/main-nav";
import { UserNav } from "../_components/user-nav";
import { Card, CardHeader } from "@/components/ui/card";
import { columns_not_type } from "./_components/column_not_type";
import ExportToExcel from "./_components/export_data";

const HotelPage = () => {
  const { isLoading, error, data } = useGetAllUseData();

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="p-10 space-y-10">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Quản lý tất cả user trong hệ thống🌃
          </h2>
        </div>
      </div>
      {data && (
        <div className="grid grid-cols-12 gap-4">
          <Card className="p-3 col-span-6">
            <CardHeader className="flex flex-row justify-between items-center">
            <span>New customer register in this month</span>
              <ExportToExcel users={data.current_month.guest} />
            </CardHeader>
            <DataTable
              columns={columns_not_type}
              data={data.current_month.guest}
            />
          </Card>
          <Card className="p-3 col-span-6">
            <CardHeader className="flex flex-row justify-between items-center">
              <span>New partner register in this month</span>
              <ExportToExcel users={data.current_month.staff} />
            </CardHeader>
            <DataTable
              columns={columns_not_type}
              data={data.current_month.staff}
            />
          </Card>
          <Card className="p-3 col-span-12">
            <CardHeader className="flex flex-row justify-between items-center">
              <span>All user in system</span>
              <ExportToExcel users={data.all_users} />
            </CardHeader>
            <DataTable columns={columns} data={data.all_users} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default HotelPage;
