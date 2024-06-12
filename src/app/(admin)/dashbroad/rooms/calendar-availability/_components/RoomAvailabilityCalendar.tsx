'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { useAuth } from '@/hooks/useAuthContext';
import {
  getRoomAvailability,
  IgetRoomAvailabilityResult,
} from '@/service/room.service';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
type newEvents = {
  key: string;
  title: string;
  typeroom:string;
  start: Date;
  end: Date;
  resource: IgetRoomAvailabilityResult;
  status: number;
  color?: string;
  price: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
};
const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8',
  '#FF8C00', '#FF4500', '#FFD700', '#ADFF2F', '#7FFF00',
  '#00FF00', '#32CD32', '#00FA9A', '#00CED1', '#4682B4',
  '#1E90FF', '#4169E1', '#8A2BE2', '#DA70D6', '#FF69B4',
  '#FF1493', '#C71585', '#DB7093', '#FF6347', '#FFA07A',
  '#CD5C5C', '#F08080', '#E9967A', '#FA8072', '#FF7F50'
];

const RoomAvailabilityCalendar = () => {
  const [events, setEvents] = useState<newEvents[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<newEvents>();
  const { admin } = useAuth();
  const calendarRef = useRef<any>(null);

  console.log(events);

  const handleSelectEvent = (info: any) => {
    setSelectedEvent(info.event);
  };
  const fetchAvailabilityData = useCallback(
    async (startDate: string, endDate: string) => {
      try {
        const response = await getRoomAvailability({
          end_date: endDate,
          hotelId: admin?.id_hotel as string,
          start_date: startDate,
        });

        if (response) {
          const newEvents = response.flatMap((room) =>
            room.availability.map((avail,index) => ({
              key: `<span class="math-inline">\{avail\.check\_in\_date\}\-</span>{avail.check_out_date}`,
              title: room.room_name,
              start: new Date(avail.check_in_date),
              end: new Date(avail.check_out_date),
              resource: room,
              status: avail.status,
              typeroom: room.type_name,
              color: colors[index % colors.length],
              price: room.type_price,
              guest_name: room.guest_name,
              guest_phone:room.guest_phone,
              guest_email:room.guest_email

            })),
          );
          setEvents(newEvents);
        }
      } catch (error) {
        console.error('Error fetching room availability:', error);
      }
    },
    [admin?.id_hotel],
  );

  const handleNavigate = (dateInfo: any) => {
    const startDate = dateInfo.view.activeStart.toISOString().split('T')[0];
    const endDate = dateInfo.view.activeEnd.toISOString().split('T')[0];
    fetchAvailabilityData(startDate, endDate);
  };

  useEffect(() => {
    const currentDate = new Date();
    const startDate = currentDate.toISOString().split('T')[0];
    const endDate = startDate;
    fetchAvailabilityData(startDate, endDate);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const startDate = format(startOfMonth(currentDate), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(currentDate), 'yyyy-MM-dd');
    fetchAvailabilityData(startDate, endDate);
  }, [fetchAvailabilityData]);

  return (
    <div className='grid grid-cols-12 gap-3'>
      <div className='col-span-8'>
        <Calendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          eventClick={handleSelectEvent}
          datesSet={handleNavigate}
          ref={calendarRef}
        />
      </div>

      {selectedEvent && (
        <div className='col-span-4 p-4 border rounded-3xl'>
          <h3>🏫 Chi tiết</h3>
          <p>
            <strong>🪟 Tên phòng:</strong> {selectedEvent.title}
          </p>
          <p>
            <strong>🕐 Check in :</strong>{' '}
            <span>{selectedEvent.start.toLocaleDateString()}</span>
          </p>
          <p>
            <strong>🕧 Check out :</strong>{' '}
            {selectedEvent.end.toLocaleDateString()}
          </p>

          <Separator/>

         
          <Table>
      <TableHeader>
        <TableRow>
          <TableHead >Tên Khách hàng</TableHead >
          <TableHead >Email</TableHead >
          <TableHead >Số điện thoại</TableHead >
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow  >
            <TableCell>{selectedEvent.guest_name}</TableCell>
            <TableCell>{selectedEvent.guest_email}</TableCell>
            <TableCell>{selectedEvent.guest_phone}</TableCell>
          </TableRow>
      </TableBody>
    </Table>
        </div>
      )}
    </div>
  );
};

export default RoomAvailabilityCalendar;
