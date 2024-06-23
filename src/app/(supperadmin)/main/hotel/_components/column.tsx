'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AVAILABLE, EMPTY, INAVAILABLE, NOT_EMPTY } from '@/constant';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import Badge from '@/components/shared/Badge';
import { labels } from '@/components/table/data/data';
import { DataTableRowActions } from './table-data-row-action';
import { AllHotel } from '@/service/_superadmin.service';

export const columns: ColumnDef<AllHotel>[] = [
  {
    accessorKey: 'hotel_name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Tên Khách sạn'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.hotel.name,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.hotel.name}
              color='indigo'
            />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'User',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Người đại diện'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.user.name,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.user.name}
              color='indigo'
            />
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'Address',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Địa chỉ'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.hotel.address,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.hotel.address}
              color='indigo'
            />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'Telephone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Hot Line'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.hotel.phone,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.hotel.phone}
              color='purple'
            />
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
   {
    accessorKey: 'rooms',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Tổng số phòng'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.hotel.total_rooms,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.hotel.total_rooms}
              color='purple'
            />
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
   {
    accessorKey: 'typerooms',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Tổng loại phòng'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.hotel.total_room_types,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.hotel.total_room_types}
              color='purple'
            />
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'IsActive',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Trạng thái'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.hotel.is_active.toString(),
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.hotel.is_active.toString() === "1" ? "Đang hoạt động" : "Ngưng hoạt động"}
              color='indigo'
            />
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
