'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CrossIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const pathName = usePathname();
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        {pathName === '/dashbroad/booking' || pathName === '/dashbroad/customer' ? (
          <Input
            placeholder='Lọc theo tên khách hàng'
            value={
              (table.getColumn('guest_name')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('guest_name')?.setFilterValue(event.target.value)
            }
            className='h-8 w-[150px] lg:w-[250px]'
          />
        ) : pathName === '/main/hotel' ? ( <Input
            placeholder='Lọc theo tên...'
            value={
              (table.getColumn('hotel_name')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('hotel_name')?.setFilterValue(event.target.value)
            }
            className='h-8 w-[150px] lg:w-[250px]'
          />)  : pathName === '/main/user' ? (
            null
          ) :(
          <Input
            placeholder='Lọc theo tên...'
            value={
              (table.getColumn('RoomName')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('RoomName')?.setFilterValue(event.target.value)
            }
            className='h-8 w-[150px] lg:w-[250px]'
          />
        )}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'>
            Reset
            <CrossIcon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
