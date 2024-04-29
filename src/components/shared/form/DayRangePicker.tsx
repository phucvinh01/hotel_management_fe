'use client';
import * as React from 'react';
import { addDays, format, isAfter } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type PropsDatePickerWithRange = {
  className?: React.HTMLAttributes<HTMLDivElement>,
  setRangeDay:React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function DatePickerWithRange({
  className, setRangeDay
}: PropsDatePickerWithRange) {

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: currentDate,
    to: addDays(currentDate, 1),
  });

const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 2);

const [disabledDate, setDisabledDate] = React.useState<DateRange | undefined>({
  from: firstDayOfMonth,
  to: yesterday,
});

  React.useEffect(() => {
    if (date !== undefined) {
        setRangeDay(date);
    }
}, [date, setRangeDay]);




  return (
    <div className={cn('grid gap-2 bg-gray-50 border border-gray-300', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              ' justify-start text-left font-normal rounded-none',
              !date && 'text-muted-foreground'
            )}>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <div>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </div>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'>
          <Calendar
          disabled={disabledDate}
            fromMonth={date?.from}
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
