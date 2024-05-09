'use client'
import { dateNow } from '@/lib/dateNow';
import React, { useState } from 'react'

const SearchFormPageHotel = () => {
    const [dsTinhState, setDsTinhState] = useState<'block' | 'hidden'>('hidden');
  const [dsDemState, setDsDemState] = useState<'block' | 'hidden'>('hidden');
  const [dsThanhVienState, setDsThanhVienState] = useState<'block' | 'hidden'>(
    'hidden'
  );
  const [allowShowHide, setAllowShowHide] = useState<boolean>(true);
  const [valueTinh, setValueTinh] = useState<string>('');
  const [valueSoDem, setValueSoDem] = useState<string>('1 Đêm');
  const [valueSoNguoiLon, setValueSoNguoiLon] = useState<number>(2);
  const [valueSoTreEm, setValueSoTreEm] = useState<number>(0);
  const [valueSoPhong, setValueSoPhong] = useState<number>(1);
  const [valueNguoiLonTreEmPhong, setValueNguoiLonTreEmPhong] =
    useState<string>(
      valueSoNguoiLon +
        ' Người lớn' +
        valueSoTreEm +
        ' Trẻ em' +
        valueSoPhong +
        ' Phòng'
    );
  const handleShowHideDsTinh = (): void => {
    if (allowShowHide === true) {
      setDsTinhState('block');
      setAllowShowHide(false);
    }
  };
  const handleShowHideDsDem = (): void => {
    if (allowShowHide === true) {
      setDsDemState('block');
      setAllowShowHide(false);
    }
  };
  const handleShowHideChosenMember = (): void => {
    if (allowShowHide === true) {
      setDsThanhVienState('block');
      setAllowShowHide(false);
    }
  };
  const handleSelectedTinh = (tenTinh: string): void => {
    setValueTinh(tenTinh);
    setDsTinhState('hidden');
    setAllowShowHide(true);
  };
  const handleSelectedDem = (soDem: string): void => {
    setValueSoDem(soDem);
    setDsDemState('hidden');
    setAllowShowHide(true);
  };
  const handleCompliteMember = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    setValueNguoiLonTreEmPhong(
      valueSoNguoiLon +
        ' Người lớn, ' +
        valueSoTreEm +
        ' Trẻ em, ' +
        valueSoPhong +
        ' Phòng'
    );
    setDsThanhVienState('hidden');
    setAllowShowHide(true);
  };
  const handleAddNguoiLon = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (valueSoNguoiLon > 0 && valueSoNguoiLon < 20) {
      setValueSoNguoiLon(valueSoNguoiLon + 1);
    }
  };
  const handleSubstractNguoiLon = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (valueSoNguoiLon > 1) {
      setValueSoNguoiLon(valueSoNguoiLon - 1);
    }
  };

  const handleAddTreEm = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (valueSoTreEm < valueSoNguoiLon * 3) {
      setValueSoTreEm(valueSoTreEm + 1);
    }
  };
  const handleSubstractTreEm = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (valueSoTreEm > 0) {
      setValueSoTreEm(valueSoTreEm - 1);
    }
  };

  const handleAddPhong = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (valueSoPhong < valueSoNguoiLon && valueSoPhong < 8) {
      setValueSoPhong(valueSoPhong + 1);
    }
  };
  const handleSubstractPhong = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (valueSoPhong > 1) {
      setValueSoPhong(valueSoPhong - 1);
    }
  };
  return (
    <div className='w-9/12 bg-white -mt-16 mx-auto rounded-2xl shadow-md shadow-gray-400'>
        <div className='bg-gray-100 w-full flex flex-row rounded-t-xl h-16 items-center'>
          <p className='pl-3 text-blue-500 text-lg font-semibold'>
            <b>Khách sạn xem gần đây</b>
          </p>
        </div>
        <div className='p-3'>
          <form>
            {/* Chon tinh thanh */}
            <div className='mb-4 relative'>
              <label className='lable-input'>
                Thành phố, địa điểm hoặc tên khách sạn:
              </label>
              <div
                className='relative flex flex-row items-center'
                onClick={handleShowHideDsTinh}>
                <span className='icon-input'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                    />
                  </svg>
                </span>
                <input
                  type='text'
                  placeholder='Chọn địa điểm của bạn'
                  className='text-input'
                  defaultValue={valueTinh}
                />
              </div>
              {/* modal hien thi danh sach tinh thanh */}
              <div
                id='dsTinh'
                className={`${dsTinhState} bg-white rounded-3xl w-full absolute z-10 shadow-md shadow-cyan-700`}>
                {/* lich su tim kiem */}
                <div className='bg-gray-100 w-full flex flex-row rounded-t-xl h-16 items-center'>
                  <p className='pl-3 text-blue-500 text-lg font-semibold'>
                    <b>Kết quả tìm kiếm cuối cùng</b>
                  </p>
                </div>

                {/* do du lieuj vao day */}
                <div
                  className='row-modal-ds-tinh'
                  onClick={() => handleSelectedTinh('Thành phố Hồ Chí Minh')}>
                  <div className='flex flex-col w-3/5 justify-center items-start'>
                    <p className='pl-3 text-gray-500 text-lg font-semibold'>
                      <b>Thành phố Hồ Chí Minh</b>
                    </p>
                    <p className='pl-3 text-gray-500 font-semibold'>Việt nam</p>
                  </div>
                  <div className='flex flex-col w-2/5 justify-center items-end'>
                    <button className=' pr-3 rounded-2xl w-2/5 border border-cyan-400'>
                      Vùng
                    </button>
                    <p className='pr-3 text-gray-500'>
                      <b>1222 khách sạn</b>
                    </p>
                  </div>
                </div>
                {/* tinh thanh pho bien */}
                <div className='bg-gray-100 w-full flex flex-row h-16 items-center'>
                  <p className='pl-3 text-blue-500 text-lg font-semibold'>
                    <b>Điểm đến phổ biến</b>
                  </p>
                </div>
                {/* do du lieuj vao day */}
                <div
                  className='row-modal-ds-tinh'
                  onClick={() => handleSelectedTinh('Thành phố Đà Nẵng')}>
                  <div className='flex flex-col w-3/5 justify-center items-start'>
                    <p className='pl-3 text-gray-500 text-lg font-semibold'>
                      <b>Thành phố Đà Nẵng</b>
                    </p>
                    <p className='pl-3 text-gray-500 font-semibold'>Việt nam</p>
                  </div>
                  <div className='flex flex-col w-2/5 justify-center items-end'>
                    <button className=' pr-3 rounded-2xl w-2/5 border border-cyan-400'>
                      Vùng
                    </button>
                    <p className='pr-3 text-gray-500'>
                      <b>1222 khách sạn</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Chon ngay nhan phong*/}
            <div className='flex flex-row my-5 justify-between'>
              <div className='w-4/12 pr-6 relative'>
                <label className='lable-input'>Nhận phòng:</label>
                <div className='relative flex flex-row items-center'>
                  <span className='icon-input'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                      />
                    </svg>
                  </span>
                  <input
                    type='date'
                    className='text-input'
                  />
                </div>
              </div>
              {/* chon so dem thue phong */}
              <div className='w-4/12 relative pr-6'>
                <label className='lable-input'>Số đêm:</label>
                <div
                  className='relative flex flex-row items-center'
                  onClick={handleShowHideDsDem}>
                  <span className='icon-input'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
                      />
                    </svg>
                  </span>
                  <input
                    type='text'
                    placeholder='Chọn số đếm bạn thuê'
                    defaultValue={valueSoDem}
                    className='text-input'
                  />
                </div>
                {/* modal hien thi danh sach so dem thue phong */}
                <div
                  id='dsSoDem'
                  className={`${dsDemState} bg-white rounded-3xl w-11/12 mx-auto absolute z-10 shadow-md shadow-cyan-700`}>
                  {/* chonj dem - do du lieu vao day*/}
                  <div
                    className='row-modal-ds-tinh'
                    onClick={() => handleSelectedDem('1 Đêm')}>
                    <div className='flex flex-col w-3/5 justify-center items-start'>
                      <p className='pl-3 text-gray-500 text-lg font-semibold'>
                        <b>1 Đêm</b>
                      </p>
                      <p className='pl-3 text-gray-500 font-semibold'>
                        14/04/2024
                      </p>
                    </div>
                  </div>

                  <div
                    className='row-modal-ds-tinh'
                    onClick={() => handleSelectedDem('2 Đêm')}>
                    <div className='flex flex-col w-3/5 justify-center items-start'>
                      <p className='pl-3 text-gray-500 text-lg font-semibold'>
                        <b>2 Đêm</b>
                      </p>
                      <p className='pl-3 text-gray-500 font-semibold'>
                        15/04/2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-4/12 pr-6'>
                <label className='lable-input'>Trả phòng:</label>
                <div className='relative flex flex-row items-center'>
                  <span className='icon-input'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                      />
                    </svg>
                  </span>
                  <input
                    type='date'
                    readOnly
                    placeholder='Chọn địa điểm của bạn'
                    defaultValue={dateNow()}
                    className='text-input cursor-not-allowed'
                  />
                </div>
              </div>
            </div>
            {/* chon so luong khac va phong */}
            <div className='flex flex-row my-5 justify-between'>
              <div className='w-8/12 pr-6 relative'>
                <label className='lable-input'>Khách và Phòng:</label>
                <div
                  className='relative flex flex-row items-center'
                  onClick={handleShowHideChosenMember}>
                  <span className='icon-input'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
                      />
                    </svg>
                  </span>
                  <input
                    type='text'
                    placeholder='Chọn số đếm bạn thuê'
                    defaultValue={valueNguoiLonTreEmPhong}
                    className='text-input'
                  />
                </div>
                {/* modal hien thi chon so luong thanh vien */}
                <div
                  id='soThanhVien'
                  className={`${dsThanhVienState} bg-white rounded-3xl w-11/12 mx-auto absolute z-10 shadow-md shadow-cyan-700`}>
                  {/* chonj dem - do du lieu vao day*/}
                  <div className='bg-white w-full flex flex-row h-16 rounded-3xl items-center'>
                    <div className='flex flex-row w-full justify-center items-center'>
                      <p className='pl-3 w-9/12 text-gray-500 text-lg font-semibold'>
                        <b>Người lớn</b>
                      </p>
                      <button
                        className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                        onClick={() => handleSubstractNguoiLon(event)}>
                        -
                      </button>
                      <input
                        className='border-2 border-gray-400 bg-white h-12 w-12 rounded-3xl mx-1 
                                            text-center focus:outline-gray-400'
                        readOnly
                        type='text'
                        defaultValue={valueSoNguoiLon}
                      />
                      <button
                        className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                        onClick={() => handleAddNguoiLon(event)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className='bg-white w-full flex flex-row h-16 rounded-3xl items-center'>
                    <div className='flex flex-row w-full justify-center items-center'>
                      <p className='pl-3 w-9/12 text-gray-500 text-lg font-semibold'>
                        <b>Trẻ em</b>
                      </p>
                      <button
                        className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                        onClick={() => handleSubstractTreEm(event)}>
                        -
                      </button>
                      <input
                        className='border-2 border-gray-400 bg-white h-12 w-12 rounded-3xl mx-1 
                                            text-center focus:outline-gray-400'
                        readOnly
                        type='text'
                        defaultValue={valueSoTreEm}
                      />
                      <button
                        className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                        onClick={() => handleAddTreEm(event)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className='bg-white w-full flex flex-row h-16 rounded-3xl items-center'>
                    <div className='flex flex-row w-full justify-center items-center'>
                      <p className='pl-3 w-9/12 text-gray-500 text-lg font-semibold'>
                        <b>Số phòng</b>
                      </p>
                      <button
                        className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                        onClick={() => handleSubstractPhong(event)}>
                        -
                      </button>
                      <input
                        className='border-2 border-gray-400 bg-white h-12 w-12 rounded-3xl mx-1 
                                            text-center focus:outline-gray-400'
                        readOnly
                        type='text'
                        defaultValue={valueSoPhong}
                      />
                      <button
                        className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                        onClick={() => handleAddPhong(event)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className='bg-white w-full flex flex-row h-16 rounded-3xl justify-end items-center
                                    pr-6'>
                    <button
                      className='font-bold text-cyan-500 text-lg'
                      onClick={() => handleCompliteMember(event)}>
                      Xong
                    </button>
                  </div>
                </div>
              </div>
              <div className='w-4/12 pr-6  items-end'>
                <h1
                  className='lable-input'
                  style={{ color: 'transparent' }}>
                  *
                </h1>
                <button
                  className='w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-600 
                                flex justify-center items-center h-12 rounded-3xl'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 text-white font-medium'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                    />
                  </svg>
                  <span className='text-center font-medium text-white'>
                    Tìm khách sạn
                  </span>
                </button>
              </div>
            </div>
            {/* footer */}
            <div className='flex mt-3 mb-4  text-blue-500 text-lg font-semibold'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z'
                />
              </svg>
              <b>Thanh toán tại khách sạn</b>
            </div>
          </form>
        </div>
      </div>
  )
}

export default SearchFormPageHotel