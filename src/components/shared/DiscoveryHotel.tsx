import React from 'react';

const data = [
  {
    id: 1,
    title: 'Khách sạn Vũng tàu',
  },
  {
    id: 2,
    title: 'Khách sạn Nha Trang',
  },
  {
    id: 3,
    title: 'Khách sạn Phan Thiết',
  },
  {
    id: 4,
    title: 'Khách sạn Đà Lạt',
  },
  {
    id: 5,
    title: 'Khách sạn Hội An',
  },
  {
    id: 6,
    title: 'Khách sạn Phú Quốc',
  },
  {
    id: 7,
    title: 'Khách sạn Đà Nẳng',
  },
  {
    id: 8,
    title: 'Khách sạn SaPa',
  },
  {
    id: 9,
    title: 'Khách sạn Qui Nhơn',
  },
  {
    id: 10,
    title: 'Khách sạn Hồ Chí Minh',
  },
  {
    id: 11,
    title: 'Khách sạn Hà Nội',
  },
];

const DiscoveryHotel = () => {
  return (
    <section className='flex gap-4 flex-col'>
      <p className='font-extrabold text-2xl'>Bạn muốn khám phá điều gì?</p>
      <div>
        <p className='text-cyan-500 font-semibold text-lg mb-4 py-4 border-b'>
          Các khách sạn hàng đầu
        </p>
        <div className='grid grid-cols-3 gap-y-8'>
          {data.map((item) => (
            <div
              className='text-gray-600 text-sm font-semibold col-span-1 hover:text-cyan-500 hover:cursor-pointer transition-colors'
              key={item.id}>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoveryHotel;
