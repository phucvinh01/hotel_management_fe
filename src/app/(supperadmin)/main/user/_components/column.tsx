'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AVAILABLE, EMPTY, INAVAILABLE, NOT_EMPTY } from '@/constant';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import Badge from '@/components/shared/Badge';
import { labels } from '@/components/table/data/data';
import { DataTableRowActions } from './table-data-row-action';
import { AllHotel, UserData, UserDataManagement } from '@/service/_superadmin.service';
import { timeAgo } from '@/lib/timeAgo';

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: 'user_name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Tên'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.user_name,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.user_name}
              color='indigo'
            />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'user_phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Phone'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.user_phone,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.user_phone}
              color='indigo'
            />
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'user_type',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Type'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.user_type,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.user_type}
              color='indigo'
            />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'user_email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Email'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.user_email,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={row.original.user_email}
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
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Created At'
      />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.created_at,
      );

      return (
        <div className='flex space-x-2'>
          {label && label.label}
          <span className='max-w-[500px] truncate font-medium'>
            <Badge
              name={timeAgo(row.original.created_at)}
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
];
