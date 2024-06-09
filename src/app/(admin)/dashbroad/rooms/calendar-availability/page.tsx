import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import RoomAvailabilityCalendar from './_components/RoomAvailabilityCalendar';
export default function CalendarAvailabilityPage() {
  return (
    <DefaultLayout>
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Lịch trình 🗓️</h2>
            <p className='text-muted-foreground'>
              Nơi thể hiện lịch trình của các phòng của bạn
            </p>
          </div>
        </div>
        <RoomAvailabilityCalendar />
      </div>
    </DefaultLayout>
  );
}


