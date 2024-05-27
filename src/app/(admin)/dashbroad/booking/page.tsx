'use client'


import Loader from '@/components/admin/common/Loader'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import { DataTable } from '@/components/table/data-table'
import { useAuth } from '@/hooks/useAuthContext'
import { useGetBooking } from '@/service/query.service'
import React from 'react'
import { columns } from './_components/columns'

const PageBooking = () => {

  const {admin} = useAuth();
  const {data, isLoading} = useGetBooking(admin?.id_hotel as string)


  if(isLoading) {
    return <Loader/>
  }

  return (
    <DefaultLayout>
    <div>PageBooking</div>
 {
        data &&  <DataTable
        columns={columns}
        data={data}
      />
      }
    </DefaultLayout>
  )
}

export default PageBooking