
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import React from 'react'
import { cookies } from "next/headers"
import { Comments } from './_components/comments'
import { useGetListComment } from '@/service/query.service'
import { useAuth } from '@/hooks/useAuthContext'
import Loader from '@/components/admin/common/Loader'

const CommentsManagementPage = () => {
const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <DefaultLayout>
      <div className='h-full space-y-8 p-8'>
        <div className='flex flex-col justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Quản lý đánh giá và nhận xét 🔊</h2>
            <p className='text-muted-foreground'>
              Nơi cung cấp thông tin về các đánh giá của khách hàng đối với khách sạn của bạn
            </p>
            
          </div>
          {
          <Comments
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}/>
          }
        </div>
      </div>
    </DefaultLayout>
  )
}

export default CommentsManagementPage