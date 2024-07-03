'use client';

import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Download, Loader } from 'lucide-react';
type ExportToExcelProps = {
    users: any;
};
const ExportToExcel = ({ users }: ExportToExcelProps) => {

  const headers = [
    { label: 'User Email', key: 'user_email' },
    { label: 'User Name', key: 'user_name' },
    { label: 'User Phone', key: 'user_phone' },
    { label: 'User Created', key: 'created_at' },
  ];


  return (
    <CSVLink
      headers={headers}
      data={users}
      asyncOnClick={true}
      className='px-3 py-3 border rounded-3xl bg-black text-white'
       >
       <span className='space-x-3 flex'><Download /> <span>Export to execl</span></span>
    </CSVLink>
  );
};

export default ExportToExcel;
