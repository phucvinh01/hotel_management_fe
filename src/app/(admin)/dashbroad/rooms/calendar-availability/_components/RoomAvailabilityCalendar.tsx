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
} from "@/components/ui/table"
type newEvents = {
  key: string;
  title: string;
  start: Date;
  end: Date;
  resource: IgetRoomAvailabilityResult;
  status: number;
};

const RoomAvailabilityCalendar = () => {
  const [events, setEvents] = useState<newEvents[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<newEvents>();
  const { admin } = useAuth();
  const calendarRef = useRef<any>(null);

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
            room.availability.map((avail) => ({
              key: `<span class="math-inline">\{avail\.check\_in\_date\}\-</span>{avail.check_out_date}`,
              title: room.room_name,
              start: new Date(avail.check_in_date),
              end: new Date(avail.check_out_date),
              resource: room,
              status: avail.status,
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
    const endDate = startDate; // Để bắt đầu, chúng ta sẽ lấy dữ liệu cho ngày hiện tại
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
        />
      </div>

      {selectedEvent && (
        <div className='col-span-4 p-4 border rounded-3xl'>
          <h3>🏫 Chi tiết</h3>
          <p>
            <strong>🪟 Tên phòng:</strong> {selectedEvent.title}
          </p>
           <p>
            <strong>🕐 Check in :</strong> <span>{selectedEvent.start.toLocaleDateString()}</span>
          </p>
           <p>
            <strong>🕧 Check out :</strong> {selectedEvent.end.toLocaleDateString()}
          </p>
          <Table>
      <TableHeader>
        <TableRow>
          <TableHead >Booking ID</TableHead >
          <TableHead >Guest ID</TableHead >
          <TableHead >Check-in Date</TableHead >
          <TableHead >Check-out Date</TableHead >
          <TableHead >Booking Status</TableHead >
          <TableHead >Status</TableHead >
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow  >
            <TableCell>{selectedEvent.resource?.room_name}</TableCell>
            <TableCell>{selectedEvent.resource?.type_name}</TableCell>
            <TableCell>{selectedEvent.resource?.type_price}</TableCell>
          </TableRow>
      </TableBody>
    </Table>
        </div>
      )}
    </div>
  );
};

export default RoomAvailabilityCalendar;
