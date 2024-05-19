'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import React from 'react';
import URL_Enum from '@/axios/URL_Enum';
import Link from 'next/link';
import { GetListProvinceDefault } from '@/service/province.service';
import Star from '@/components/shared/Star';
import { useRouter } from 'next/navigation';
import LocalStoreEnum from '@/axios/LocalStoreEnum';
import SectionHero from '@/components/shared/sectionHero';
import SectionOurFeatures from '@/components/shared/SectionOurFeatures';
import SectionBecomeAnAuthor from '@/components/shared/SectionBecomeAnAuthor';
import Hero from '@/components/Hero';
import { MapPin } from 'lucide-react';
import { isArray } from 'lodash';
import Badge from '@/components/shared/Badge';
import CarouselStatic from '@/components/CarouselStatic';
import { policyImage } from '@/constant/_policy';
import { CarouselCountry } from '@/components/shared/CarouselCountry';
import TabsCarouselHotel from '@/components/shared/TabsCarouselHotel';
import { dataLocationList } from '@/constant';

const dateNow = (): string => {
  var currentDate_ = new Date();
  return (
    currentDate_.getFullYear() +
    '-' +
    String(currentDate_.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(currentDate_.getDate()).padStart(2, '0')
  );
};
const formatYMD = (
  valueDMY: string,
  charSplit: string,
  currentFormat: string,
): string => {
  const arrValue = valueDMY.split(charSplit);
  if (currentFormat == 'DMY') {
    return arrValue[2] + '-' + arrValue[1] + '-' + arrValue[0];
  } else {
    return arrValue[2] + '-' + arrValue[0] + '-' + arrValue[1];
  }
};

interface OverNightStay {
  overNight: string;
  numberOfDays: string;
}
export default function Home() {
  const route = useRouter();
  const [isShowProvice, setIsShowProvice] = useState<'block' | 'hidden'>(
    'hidden',
  );
  const [listOverStay, setListOverStay] = useState<'block' | 'hidden'>(
    'hidden',
  );
  const [listMember, setListMember] = useState<'block' | 'hidden'>('hidden');
  const [allowShowHide, setAllowShowHide] = useState<boolean>(true);
  const [valueProvince, setValueProvince] = useState<string>('');
  const [overNights, setOverNights] = useState<string>('1 Đêm');
  const [numberOfAdults, setNumberOfAdults] = useState<number>(2);
  const [numberOfChildrens, setNumberOfChildrens] = useState<number>(0);
  const [numberOfRooms, setnumberOfRooms] = useState<number>(1);
  const [totalAdultsChildrensRooms, setTotalAdultsChildrensRooms] =
    useState<string>(
      numberOfAdults +
        ' Người lớn' +
        numberOfChildrens +
        ' Trẻ em' +
        numberOfRooms +
        ' Phòng',
    );
  const [listDate, setListDate] = useState<OverNightStay[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(dateNow());
  const [startDate, setStartDate] = useState<string>(dateNow());

  useEffect(() => {
    const generateListDate = () => {
      let listDate: OverNightStay[] = [];
      for (var i = 0; i < 29; i++) {
        const currentDate = new Date(
          Number.parseInt(startDate.split('-')[0]),
          Number.parseInt(startDate.split('-')[1]),
          Number.parseInt(startDate.split('-')[2]),
        );

        currentDate.setDate(currentDate.getDate() + i);
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth()).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const night = i + 1;
        const objectDate = {
          overNight: night + ' Đêm',
          numberOfDays: formattedDate,
        };
        listDate.push(objectDate);
      }
      setListDate(listDate);
      setSelectedDate(listDate[0].numberOfDays);
    };
    generateListDate();
  }, [startDate]);
  const handleShowListProvices = (): void => {
    if (allowShowHide === true) {
      setIsShowProvice('block');
      setAllowShowHide(false);
    }
  };
  const handleShowNightList = (): void => {
    if (allowShowHide === true) {
      setListOverStay('block');
      setAllowShowHide(false);
    }
  };
  const handleShowHideChosenMember = (): void => {
    if (allowShowHide === true) {
      setListMember('block');
      setAllowShowHide(false);
    }
  };
  const handleSelectedProvice = (tenTinh: string): void => {
    setValueProvince(tenTinh);
    setIsShowProvice('hidden');
    setAllowShowHide(true);
  };
  const handleSelectedDem = (soDem: string): void => {
    setOverNights(soDem);
    setListOverStay('hidden');
    setAllowShowHide(true);
  };
  const handleCompliteMember = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    setTotalAdultsChildrensRooms(
      numberOfAdults +
        ' Người lớn, ' +
        numberOfChildrens +
        ' Trẻ em, ' +
        numberOfRooms +
        ' Phòng',
    );
    setListMember('hidden');
    setAllowShowHide(true);
  };
  const handleAddAdults = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (numberOfAdults > 0 && numberOfAdults < 20) {
      setNumberOfAdults(numberOfAdults + 1);
    }
  };
  const handleSubstractAdults = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (numberOfAdults > 1) {
      setNumberOfAdults(numberOfAdults - 1);
    }
  };

  const handleAddChildren = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (numberOfChildrens < numberOfAdults * 3) {
      setNumberOfChildrens(numberOfChildrens + 1);
    }
  };
  const handleSubstractChildren = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (numberOfChildrens > 0) {
      setNumberOfChildrens(numberOfChildrens - 1);
    }
  };

  const handleAddRooms = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (numberOfRooms < numberOfAdults && numberOfRooms < 8) {
      setnumberOfRooms(numberOfRooms + 1);
    }
  };
  const handleSubstractRooms = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (numberOfRooms > 1) {
      setnumberOfRooms(numberOfRooms - 1);
    }
  };
  const [provinces, setProvinces] = useState<IProvince[] | undefined>([]);
  const [selectedProvinceOption, setSelectedProvinceOption] =
    useState<string>('');
  useEffect(() => {
    const getProvices = async () => {
      const res = await GetListProvinceDefault();
      if (res && isArray(res?.result)) {
        setProvinces(res.result);
      } else {
        setProvinces([]);
      }
    };
    getProvices();
  }, []);

  const handleProvinceOptionChange = (id_province: string): void => {
    setSelectedProvinceOption(id_province); // Cập nhật giá trị của radio button được chọn
  };

  return (
    <main className='px-6'>
      <div className='container mx-auto flex flex-col gap-6'>
        <SectionHero className='pt-10 lg:pt-16 lg:pb-16' />

        <div className='bg-white p-6  mx-auto rounded-2xl shadow-md shadow-gray-400'>
            <form className='!text-base'>
              <div className='mb-4 relative'>
                <label className='lable-input'>
                  Thành phố, địa điểm hoặc tên khách sạn:
                </label>
                <div
                  className='relative flex flex-row items-center'
                  onClick={() => handleShowListProvices}>
                  <span className='icon-input bg-cyan-500'>
                    <MapPin />
                  </span>
                  <input
                    type='text'
                    placeholder='Chọn địa điểm của bạn'
                    className='text-input'
                    value={valueProvince}
                  />
                </div>
                {/* modal hien thi danh sach tinh thanh */}
                <div
                  id='dsTinh'
                  className={`${isShowProvice} bg-white rounded-3xl w-full absolute z-10 shadow-md shadow-cyan-700`}>
                  {/* lich su tim kiem */}
                  <div className='bg-gray-100 w-full flex flex-row rounded-t-xl h-16 items-center'>
                    <p className='pl-3 text-blue-500 text-lg font-semibold'>
                      <b>Kết quả tìm kiếm cuối cùng</b>
                    </p>
                  </div>

                  {provinces &&
                    provinces.length > 0 &&
                    provinces.map((item, index) => (
                      <div
                        key={index}
                        className='row-modal-ds-tinh'
                        onClick={() => handleSelectedProvice(item.DisplayName)}>
                        <div className='flex flex-col w-3/5 justify-center items-start'>
                          <p className='pl-3 text-gray-500 text-lg font-semibold'>
                            <b>{item.DisplayName}</b>
                          </p>
                          <p className='pl-3 text-gray-500 font-semibold'>
                            Việt nam
                          </p>
                        </div>
                        <div className='flex flex-col w-2/5 justify-center items-end'>
                          <button className=' pr-3 rounded-2xl w-2/5 border border-cyan-400'>
                            Vùng
                          </button>
                          <p className='pr-3 text-gray-500'>
                            <b>{item.totalHotel} khách sạn</b>
                          </p>
                        </div>
                      </div>
                    ))}

                  {/* tinh thanh pho bien */}
                  <div className='bg-gray-100 w-full flex flex-row h-16 items-center'>
                    <p className='pl-3 text-blue-500 text-lg font-semibold'>
                      <b>Điểm đến phổ biến</b>
                    </p>
                  </div>
                  {/* do du lieuj vao day */}
                  {provinces &&
                    provinces.length > 0 &&
                    provinces
                      .filter((fitem) => {
                        return fitem.PopularRate > 0;
                      })
                      .map((item, index) => (
                        <div
                          key={index}
                          className='row-modal-ds-tinh'
                          onClick={() =>
                            handleSelectedProvice(item.DisplayName)
                          }>
                          <div className='flex flex-col w-3/5 justify-center items-start'>
                            <p className='pl-3 text-gray-500 text-lg font-semibold'>
                              <b>{item.DisplayName}</b>
                            </p>
                            <p className='pl-3 text-gray-500 font-semibold'>
                              Việt nam
                            </p>
                          </div>
                          <div className='flex flex-col w-2/5 justify-center items-end'>
                            <button className=' pr-3 rounded-2xl w-2/5 border border-cyan-400'>
                              Vùng
                            </button>
                            <p className='pr-3 text-gray-500'>
                              <b>{item.totalHotel} khách sạn</b>
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
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
                      value={dateNow()}
                      onChange={(event) => {
                        console.log('datechang', startDate);
                        setStartDate(event.target.value);
                      }}
                    />
                  </div>
                </div>
                {/* chon so dem thue Rooms */}
                <div className='w-4/12 relative pr-6'>
                  <label className='lable-input'>Số đêm:</label>
                  <div
                    className='relative flex flex-row items-center'
                    onClick={handleShowNightList}>
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
                      value={overNights}
                      className='text-input'
                    />
                  </div>
                  {/* modal hien thi danh sach so dem thue Rooms */}
                  <div
                    id='dsSoDem'
                    className={`${listOverStay} bg-white rounded-lg w-11/12 mx-auto absolute z-10 shadow-md shadow-cyan-700
                h-[360px] overflow-hidden overflow-y-auto`}>
                    {listDate.map((item, index) => (
                      <div
                        key={index}
                        className='row-modal-ds-tinh'
                        onClick={() => {
                          handleSelectedDem(item.overNight);
                          setSelectedDate(item.numberOfDays);
                        }}>
                        <div className='flex flex-col w-3/5 justify-center items-start'>
                          <p className='pl-3 text-gray-500 text-lg font-semibold'>
                            <b>{item.overNight}</b>
                          </p>
                          <p className='pl-3 text-gray-500 font-semibold'>
                            {item.numberOfDays}
                          </p>
                        </div>
                      </div>
                    ))}
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
                      value={formatYMD(selectedDate, '/', 'DMY')}
                      className='text-input cursor-not-allowed'
                    />
                  </div>
                </div>
              </div>
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
                      value={totalAdultsChildrensRooms}
                      className='text-input'
                    />
                  </div>
                  <div
                    id='soThanhVien'
                    className={`${listMember} bg-white rounded-3xl w-11/12 mx-auto absolute z-10 shadow-md shadow-cyan-700`}>
                    <div className='bg-white w-full flex flex-row h-16 rounded-3xl items-center'>
                      <div className='flex flex-row w-full justify-center items-center'>
                        <p className='pl-3 text-gray-500 text-lg font-semibold'>
                          <b>Người lớn</b>
                        </p>
                        <button
                          className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                          onClick={() => handleSubstractAdults(event)}>
                          -
                        </button>
                        <input
                          className='border-2 border-gray-400 bg-white h-12 w-12 rounded-3xl mx-1 
                                            text-center focus:outline-gray-400'
                          readOnly
                          type='text'
                          value={numberOfAdults}
                        />
                        <button
                          className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                          onClick={() => handleAddAdults(event)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className='bg-white w-full flex flex-row h-16 rounded-3xl items-center'>
                      <div className='flex flex-row w-full justify-center items-center'>
                        <p className='pl-3 text-gray-500 text-lg font-semibold'>
                          <b>Trẻ em</b>
                        </p>
                        <button
                          className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                          onClick={() => handleSubstractChildren(event)}>
                          -
                        </button>
                        <input
                          className='border-2 border-gray-400 bg-white h-12 w-12 rounded-3xl mx-1 
                                            text-center focus:outline-gray-400'
                          readOnly
                          type='text'
                          value={numberOfChildrens}
                        />
                        <button
                          className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                          onClick={() => handleAddChildren(event)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className='bg-white w-full flex flex-row h-16 rounded-3xl items-center'>
                      <div className='flex flex-row w-full justify-center items-center'>
                        <p className='pl-3 text-gray-500 text-lg font-semibold'>
                          <b>Số phòng</b>
                        </p>
                        <button
                          className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                          onClick={() => handleSubstractRooms(event)}>
                          -
                        </button>
                        <input
                          className='border-2 border-gray-400 bg-white h-12 w-12 rounded-3xl mx-1 
                                            text-center focus:outline-gray-400'
                          readOnly
                          type='text'
                          value={numberOfRooms}
                        />
                        <button
                          className='border-2 border-gray-400 bg-cyan-50 h-12 w-12 rounded-3xl mx-1'
                          onClick={() => handleAddRooms(event)}>
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
                  <Link
                    href={`app/hotel/search?province=${valueProvince}&totalnight=${
                      overNights.split(' ')[0]
                    }&totalmember=${numberOfAdults}&totalmemberchild=${numberOfChildrens}&timereceive=${startDate}&totalroom=${numberOfRooms}`}
                    className='w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-600 
                flex justify-center items-center h-12 rounded-lg'
                    onClick={() => {
                      localStorage.setItem(
                        LocalStoreEnum.CURRENT_PROVINCE_SEARCH,
                        valueProvince,
                      );
                      localStorage.setItem(
                        LocalStoreEnum.TOTAL_OLD_MEMBER,
                        numberOfAdults.toString(),
                      );
                      localStorage.setItem(
                        LocalStoreEnum.TOTAL_CHILD_MEMBER,
                        numberOfChildrens.toString(),
                      );
                      localStorage.setItem(
                        LocalStoreEnum.START_DATE,
                        startDate,
                      );
                      localStorage.setItem(
                        LocalStoreEnum.TOTAL_ROOM,
                        numberOfRooms.toString(),
                      );
                    }}>
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
                  </Link>
                </div>
              </div>
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

        <TabsCarouselHotel title='Nơi lưu trú nổi bật'
          data={dataLocationList}
        />

          <h5 className='my-4'>
            <Badge
              name='Khách sạn gần đây'
              className='!text-base'
            />
          </h5>
          <div className=' flex flex-row my-4'>
            {provinces &&
              provinces.length > 0 &&
              provinces.map((item) => (
                <span
                  key={item.id}
                  className={`${
                    selectedProvinceOption === item.id
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-700 bg-gray-200'
                  } p-3 rounded-xl font-bold mx-1 cursor-pointer`}
                  onClick={() => handleProvinceOptionChange(item.id)}>
                  {item.DisplayName}
                </span>
              ))}
          </div>
        <CarouselCountry />

          <Image
            height={100}
            width={1200}
            src={`${URL_Enum.BaseURL_Poster}/poster1.jpg`}
            className='my-6'
            alt='poster-page-hotel'
          />

        <SectionOurFeatures />

        <div className='flex h-3/4 w-full justify-center items-center bg-slate-200 p-2 rounded-lg'>
          <Carousel
            className='w-full '
            id='slider'>
            <CarouselContent className=''>
              {provinces &&
                provinces.length > 0 &&
                provinces
                  .filter((fitem) => {
                    return fitem.id == selectedProvinceOption;
                  })
                  .map((item) =>
                    item.hotels?.map((hitem) => (
                      <CarouselItem
                        key={hitem.id}
                        className='basis-1/5'>
                        <div
                          className='w-full h-[240px] flex flex-col bg-white shadow-1 shadow-gray-500 
                    rounded-lg overflow-hidden hover:shadow-blue-500 hover:shadow-3'>
                          <Link href={`app/hotel/hotel_detail/?id=${hitem.id}`}>
                            <Image
                              height={125}
                              width={150}
                              src={`${URL_Enum.BaseURL_Image}/${hitem.images[0].FileName}`}
                              className='w-full h-[125px] rounded-lg hover:scale-105'
                              alt={`${hitem.images[0].FileName}`}
                            />
                            <p className='text-left w-full text-gray-700 font-semibold px-2 h-10'>
                              {hitem.Name.length > 50
                                ? hitem.Name.slice(0, 40) + '...'
                                : hitem.Name}
                            </p>
                            <span className='w-full px-2'>
                              <Star
                                color='text-yellow-400'
                                size='4'
                                star={hitem.StarRate}
                              />
                            </span>
                            <span className='w-full px-2 text-danger font-semibold'>
                              {hitem.type_rooms &&
                                hitem.type_rooms[0].Price.toLocaleString(
                                  'vi-VN',
                                  { style: 'currency', currency: 'VND' },
                                )}
                            </span>
                          </Link>
                        </div>
                      </CarouselItem>
                    )),
                  )}
            </CarouselContent>
            <CarouselPrevious
              className={`${
                provinces && provinces.length > 0 && provinces.length > 5
                  ? 'block'
                  : 'hidden'
              } ml-10 `}
            />
            <CarouselNext
              className={`${
                provinces && provinces.length > 0 && provinces.length > 5
                  ? 'block'
                  : 'hidden'
              } mr-10 `}
            />
          </Carousel>
        </div>

          <SectionBecomeAnAuthor />
          <h5 className='my-4'>
            <Badge
              name='Chính sách đặt phòng'
              className='!text-base'
            />
          </h5>
            <CarouselStatic data={policyImage} />
      </div>
    </main>
  );
}
