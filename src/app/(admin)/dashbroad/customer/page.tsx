import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { TabsManagement } from './_components/tab-managenment';

export default function CalendarAvailabilityPage() {
  return (
    <DefaultLayout>
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Quản lý lưu trú của khách hàng🌃</h2>
            <p className='text-muted-foreground'>
              Nơi cung cấp thông tin các khách hàng đang lưu trú ở khách sạn của bạn 🤝
            </p>
          </div>
        </div>
        <TabsManagement/>
      </div>
    </DefaultLayout>
  );
}


