'use client';

import React, { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CalendarCheck } from 'lucide-react';
import { useUpdateStateRoom } from '@/service/query.service';
import { IStateRoomUpdate } from '@/service/room.service';
import { STAYING } from '@/constant';
import { toast } from '@/components/ui/use-toast';
type AlertCheckInProp = {
  data: any;
  className?: string;
};
const AlertCheckIn = ({data}:AlertCheckInProp) => {
  const updateStateMutation = useUpdateStateRoom();
  const handleClick = async () => {
    const body:IStateRoomUpdate = {
        idRoom: data.id,
        state: STAYING
    }
    const res = await updateStateMutation.mutateAsync(body)
    if(res) {
        toast({
            title:"Đã cập nhật trạng thái phòng"
        })
    }else {
         toast({
            title:"Cập nhật trạng thái phòng thất bại"
        })
    }
  }
  return (
    <Fragment>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <CalendarCheck className='checkin' />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận khách hàng đã check in</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ cập nhật lại trạng thái của phòng
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleClick()}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Tooltip
        anchorSelect='.checkin'
        place='top'>
        Xác nhận khác đã check in ⛱️
      </Tooltip>
    </Fragment>
  );
};

export default AlertCheckIn;
