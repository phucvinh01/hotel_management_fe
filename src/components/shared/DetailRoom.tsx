import URL_Enum from '@/axios/URL_Enum';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Badge from './Badge';

const todoGetPriceDiscoun = (price: number, discount: number): number => {
  return price - (price * discount) / 100;
};
interface IProps {
  typeRoom: ITypeRoom;
  listImage: IHotelImage[];
  listConvenient: IConvenient[] | undefined;
}
const DetailRoom = (props: IProps) => {
  const route = useRouter();
  const { typeRoom, listImage, listConvenient } = props;
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const convenientBathRoom = typeRoom.ConvenientBathRoom.split(';');
  const convenientRoom = typeRoom.ConvenientRoom.split(';');
  useEffect(() => {
    const fetchData = (url: string) => {
      axios
        .get(url)
        .then((response) => {
          setRooms(response.data.result);
          var ngay = new Date();
          console.log('room', ngay);
          console.log('room_', response.data.result);
          // if (response.data.result) {
          //     if (response.data.result.lenght > 0) {

          //     }

          // }
        })
        .catch((error) => {
          console.log('Loi load room', error);
        });
    };
    fetchData(
      `${URL_Enum.BaseURL_Api}room/get-list-by-type-room-id?typeRoomID=${typeRoom.id}`,
    );
  }, []);
  const [modalState, setModalState] = useState<boolean>(false);
  const handleShowModal = () => {
    setModalState(!modalState);
  };
  const [indexImageModal, setIndexImageModal] = useState<number>(0);
  const [imageModalCurrent, setImageModalCurrent] = useState<string>(
    listImage[0].FileName,
  );
  const handleNextImage = () => {
    if (indexImageModal >= listImage.length - 1) {
      setIndexImageModal(0);
      setImageModalCurrent(listImage[0].FileName);
    } else {
      setIndexImageModal(indexImageModal + 1);
      setImageModalCurrent(
        listImage[indexImageModal + 1].FileName,
      );
    }
  };
  const handlePreviousImage = () => {
    if (indexImageModal == 0) {
      setIndexImageModal(listImage.length - 1);
      setImageModalCurrent(
        listImage[listImage.length - 1].FileName,
      );
    } else {
      setIndexImageModal(indexImageModal - 1);
      setImageModalCurrent(
        listImage[indexImageModal - 1].FileName,
      );
    }
  };
  return (
    <div className='w-full rounded-3xl my-3 relative'>
      {/* // chi tiet phong */}
      <div className='w-full bg-gray-100 rounded-3xl flex  flex-col lg:flex-col p-3'>
        <p className='font-bold text-2xl text-gray-900 my-2'>{typeRoom.Name}</p>
        <div className='w-full bg-gray-100 rounded-3xl flex flex-col lg:flex-row p-3'>
          <div
            id='cardleft_phieudat'
            className='w-full lg:w-4/12 bg-white rounded-3xl'>
            <div className='w-full relative flex items-end justify-end'>
              <Image
                alt={listImage[0].FileName}
                height={240}
                width={240}
                src={`${listImage[0].FileName}`}
                className=' w-full rounded-t-lg h-60 cursor-pointer'
                onClick={() => handleShowModal()}
              />
              <p
                className='bg-gray-900 opacity-85 font-bold text-lg
                        absolute text-white px-2 py-1 rounded-3xl m-2'>
                1/{listImage.length}
              </p>
            </div>
            <div className='flex flex-row'>
              {listImage.slice(1, 4).map((item, index) => (
                <Image
                  alt={item.FileName}
                  key={index}
                  width={80}
                  height={80}
                  src={`${item.FileName}`}
                  onClick={() => handleShowModal()}
                  className={`w-4/12 h-20 ${
                    index == 1 ? 'mx-2' : ''
                  } my-2 cursor-pointer`}
                />
              ))}
            </div>
            <p className='flex pl-3 text-gray-900 font-bold text-lg my-2'>
              <span>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='mx-2'
                  xmlns='http://www.w3.org/2000/svg'
                  data-id='IcHotelRoomMeasure'>
                  <path
                    d='M12 21H7L21 7V21H18M12 21V20M12 21H15M15 21V20M15 21H18M18 21V20M15 17H17V15'
                    stroke='#0194F3'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'></path>
                  <path
                    d='M8 8L9 9M8 8L5 11M8 8L11 5M5 11L6 12M5 11L2 14L5 17L17 5L14 2L11 5M11 5L12 6'
                    stroke='#03121A'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'></path>
                </svg>
              </span>
              {typeRoom.FloorArea.toFixed(1)} m²
            </p>
            {typeRoom.No_Moking ? (
              <p className='flex pl-3 text-gray-900 font-bold text-lg my-2'>
                <span>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    className='mx-2'
                    xmlns='http://www.w3.org/2000/svg'
                    data-id='IcHotelRoomNoSmokingArea16'>
                    <g clip-path='url(#clip0_10944_6443)'>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M3.77925 10H2C1.44772 10 1 10.4477 1 11V12.8363L3.77925 10ZM3.08001 15H11H13C14.1046 15 15 14.1046 15 13V12C15 10.8954 14.1046 10 13 10H11H7.97945L6.01967 12H10V13H5.03978L3.08001 15ZM12 13V12H13V13H12Z'
                        fill='#687176'></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M11.5504 2.06932C11.0985 1.42284 10.3486 1 9.5 1H8C7.44772 1 7 1.44772 7 2C7 2.55228 7.44772 3 8 3H9.5C9.77614 3 10 3.22386 10 3.5C10 3.54942 10.0014 3.59851 10.0043 3.64722L11.5504 2.06932ZM13.6064 4.25754L11.957 5.94086C12.1318 5.97958 12.3135 6 12.5 6C12.7761 6 13 6.22386 13 6.5V8.5C13 9.05228 13.4477 9.5 14 9.5C14.5523 9.5 15 9.05228 15 8.5V6.5C15 5.51654 14.4321 4.66572 13.6064 4.25754ZM7.89932 5.79537C7.59509 4.75774 6.63603 4 5.5 4H4C3.44772 4 3 3.55228 3 3V2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2V3C1 4.65685 2.34315 6 4 6H5.5C5.77614 6 6 6.22386 6 6.5C6 6.86127 6.07663 7.20464 6.21452 7.51475L7.89932 5.79537ZM8.95933 9L10.9191 7H11C11.5523 7 12 7.44772 12 8V8.5C12 9.05228 11.5523 9.5 11 9.5C10.6299 9.5 10.3067 9.2989 10.1338 9H8.95933Z'
                        fill='#0194f3'></path>
                      <path
                        d='M1.17932 14.7965L14.4989 1.20355'
                        stroke='#687176'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'></path>
                    </g>
                    <defs>
                      <clipPath id='clip0_10944_6443'>
                        <rect
                          width='16'
                          height='16'
                          fill='white'></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Không hút thuốc
              </p>
            ) : null}

            <div className='flex flex-row gap-2 justify-between px-4'>
              <div className='flex flex-col gap-2'>
                {typeRoom.Bon_Tam ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2 '>
                        <span>Bồ Tắm</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/bontam.webp'
                        />
                      </p>
                    }
                  />
                ) : null}

                {typeRoom.May_Lanh ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2'>
                        <span>Máy lạnh</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/maylanh.webp'
                        />
                      </p>
                    }
                  />
                ) : null}

                {typeRoom.Khu_Vuc_Cho ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2'>
                        <span>Khu vực chờ</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/khuvucho.webp'
                        />
                      </p>
                    }
                  />
                ) : null}

                {typeRoom.Nuoc_Nong ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2'>
                        <span>Nước nóng</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/nuocnong.webp'
                        />
                      </p>
                    }
                  />
                ) : null}

                {typeRoom.Voi_Tam_Dung ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2'>
                        <span>Vòi tắm đứng</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/voisen.webp'
                        />
                      </p>
                    }
                  />
                ) : null}
              </div>
              <div className='flex flex-col gap-2'>
                {typeRoom.Ban_Cong_San_Hien ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2 '>
                        <span>Ban công</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/bancong.webp'
                        />
                      </p>
                    }
                  />
                ) : null}

                {typeRoom.Lo_Vi_Song ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2'>
                        <span>Lò vi sóng</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/lovisong.webp'
                        />
                      </p>
                    }
                  />
                ) : null}

                {typeRoom.Tu_Lanh ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2 '>
                        <span>Tủ lạnh</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/tulanh.webp'
                        />
                      </p>
                    }
                  />
                ) : null}
                {typeRoom.May_Giat ? (
                  <Badge
                    name={
                      <p className='flex justify-center items-center gap-2'>
                        <span>Máy Giặt</span>
                        <Image
                          width={20}
                          height={20}
                          alt='#'
                          src='/icon/maygiat.webp'
                        />
                      </p>
                    }
                  />
                ) : null}
              </div>
            </div>
            <div className='w-full p-3'>
              <button
                className='text-center w-full font-bold text-cyan-500 cursor-pointer 
                    py-2 rounded-3xl bg-gray-200 flex flex-row justify-center items-center'
                onClick={() => handleShowModal()}>
                <span>
                  <svg
                    className='w-6 h-6 text-cyan-500 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      fill-rule='evenodd'
                      d='M11.403 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.403a3.01 3.01 0 0 1-1.743-1.612l-3.025 3.025A3 3 0 1 1 9.99 9.768l3.025-3.025A3.01 3.01 0 0 1 11.403 5Z'
                      clip-rule='evenodd'
                    />
                    <path
                      fill-rule='evenodd'
                      d='M13.232 4a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1v5.768a1 1 0 1 1-2 0V6.414l-6.182 6.182a1 1 0 0 1-1.414-1.414L17.586 5h-3.354a1 1 0 0 1-1-1Z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </span>
                Xem chi tiết phòng
              </button>
            </div>
          </div>

          {/* phieu dat phong */}
          <div className={`w-full flex flex-col lg:w-8/12 max-h-[450px]`}>
            <div className=' w-full flex flex-col bg-white my-2 lg:my-0 lg:ml-3 rounded-3xl  p-3 mb-3'>
              <p className='font-bold text-xl text-gray-900 my-2'>
                {typeRoom.Name}
              </p>
              <div className='flex flex-row my-3'>
                <div className='w-4/12 flex justify-start items-center'>
                  <span>
                    <Image
                      width={20}
                      height={20}
                      alt='#'
                      src='/icon/giuong.webp'
                      className='w-6 h-6'
                    />
                  </span>
                  <p className='text-gray-900 font-semibold ml-2 text-lg'>
                    {`${typeRoom.SoLuongGiuong}-${typeRoom.TenLoaiGiuong}`}
                  </p>
                </div>

                <div className='w-4/12 flex justify-start items-center'>
                  <span>
                    <Image
                      width={20}
                      height={20}
                      alt='#'
                      src='/icon/khach.webp'
                      className='w-6 h-6'
                    />
                  </span>
                  <p className='text-gray-900 font-semibold ml-2 text-lg'>
                    {typeRoom.MaxQuantityMember} người
                  </p>
                </div>
                <div className='w-4/12 flex justify-start items-end'>
                  <p className='text-red-500 w-full font-semibold ml-2 text-lg text-right'>
                    (còn trống {rooms ? rooms.length : 0} phòng)
                  </p>
                </div>
              </div>
              <hr />
              {rooms ? (
                rooms.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-row flex-wrap my-3 border-b'>
                    <div className='w-1/2 lg:w-4/12  flex flex-col gap-2 justify-start items-start'>
                      <Badge
                        color='green'
                        name={
                          <div className='flex flex-row gap-2 justify-center items-center'>
                            <Image
                              width={12}
                              height={12}
                              alt='buasang'
                              src={`/icon/buaansang.webp`}
                              className={`${
                                item.NoMoking ? 'opacity-100' : 'opacity-50'
                              } w-6 h-6 text-gray-300`}
                            />
                            <p
                              className={`${
                                item.Breakfast
                                  ? 'text-cyan-500'
                                  : 'text-gray-300'
                              } `}>
                              Breakfast included for 1 pax
                            </p>
                          </div>
                        }></Badge>

                      <Badge
                        name={
                          <div className='flex flex-row justify-center items-center gap-2'>
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className={`w-6 h-6 
                                            ${
                                              item.Wifi
                                                ? 'text-cyan-500'
                                                : 'text-gray-300'
                                            }`}>
                                <path
                                  fillRule='evenodd'
                                  d='M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </span>
                            <p
                              className={`${
                                item.Wifi ? 'text-cyan-500' : 'text-gray-300'
                              }`}>
                              WiFi miễn phí
                            </p>
                          </div>
                        }
                        color='green'></Badge>

                      <Badge
                        name={
                          <div className='flex flex-row justify-center items-center gap-2'>
                            <span>
                              <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                                className={`${
                                  item.NoMoking ? 'opacity-100' : 'opacity-50'
                                }`}
                                xmlns='http://www.w3.org/2000/svg'
                                data-id='IcHotelRoomNoSmokingArea16'>
                                <g clip-path='url(#clip0_10944_6443)'>
                                  <path
                                    fill-rule='evenodd'
                                    clip-rule='evenodd'
                                    d='M3.77925 10H2C1.44772 10 1 10.4477 1 11V12.8363L3.77925 10ZM3.08001 15H11H13C14.1046 15 15 14.1046 15 13V12C15 10.8954 14.1046 10 13 10H11H7.97945L6.01967 12H10V13H5.03978L3.08001 15ZM12 13V12H13V13H12Z'
                                    fill='#687176'></path>
                                  <path
                                    fill-rule='evenodd'
                                    clip-rule='evenodd'
                                    d='M11.5504 2.06932C11.0985 1.42284 10.3486 1 9.5 1H8C7.44772 1 7 1.44772 7 2C7 2.55228 7.44772 3 8 3H9.5C9.77614 3 10 3.22386 10 3.5C10 3.54942 10.0014 3.59851 10.0043 3.64722L11.5504 2.06932ZM13.6064 4.25754L11.957 5.94086C12.1318 5.97958 12.3135 6 12.5 6C12.7761 6 13 6.22386 13 6.5V8.5C13 9.05228 13.4477 9.5 14 9.5C14.5523 9.5 15 9.05228 15 8.5V6.5C15 5.51654 14.4321 4.66572 13.6064 4.25754ZM7.89932 5.79537C7.59509 4.75774 6.63603 4 5.5 4H4C3.44772 4 3 3.55228 3 3V2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2V3C1 4.65685 2.34315 6 4 6H5.5C5.77614 6 6 6.22386 6 6.5C6 6.86127 6.07663 7.20464 6.21452 7.51475L7.89932 5.79537ZM8.95933 9L10.9191 7H11C11.5523 7 12 7.44772 12 8V8.5C12 9.05228 11.5523 9.5 11 9.5C10.6299 9.5 10.3067 9.2989 10.1338 9H8.95933Z'
                                    fill='#0194f3'></path>
                                  <path
                                    d='M1.17932 14.7965L14.4989 1.20355'
                                    stroke='#687176'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'></path>
                                </g>
                                <defs>
                                  <clipPath id='clip0_10944_6443'>
                                    <rect
                                      width='16'
                                      height='16'
                                      fill='white'></rect>
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <p
                              className={`${
                                item.NoMoking
                                  ? 'text-gray-300'
                                  : 'text-cyan-500'
                              }`}>
                              Không hút thuốc
                            </p>
                          </div>
                        }
                        color='green'></Badge>
                    </div>

                    <div className='w-1/2 lg:w-4/12 flex flex-col justify-start items-start gap-2'>
                      <Badge
                        color='green'
                        name={
                          <div className='flex flex-row gap-2 justify-center items-center'>
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className={`${
                                  item.Cancel
                                    ? 'text-cyan-500'
                                    : 'text-gray-300'
                                } bi bi-receipt-cutoff`}
                                viewBox='0 0 16 16'>
                                <path d='M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5M11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z' />
                                <path d='M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118z' />
                              </svg>
                            </span>
                            <p
                              className={`${
                                item.Cancel
                                  ? 'text-cyan-500 cursor-pointer'
                                  : 'text-gray-300'
                              }`}>
                              Miễn phí hủy phòng
                            </p>
                            {item.Cancel ? (
                              <div
                                className='w-[350px] absolute top-10 ml-[-50%] rounded-3xl bg-slate-950 z-1 opacity-85
                                                text-white p-5 cursor-pointer invisible group-hover:visible'>
                                <div
                                  className='w-[10px] h-[10px] rotate-45  bg-slate-950
                                    ml-[30%] absolute top-[-5px]'></div>
                                <div className='flex flex-row justify-start items-center'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      className={`text-green-600 font-semibold bi bi-receipt-cutoff`}
                                      viewBox='0 0 16 16'>
                                      <path d='M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5M11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z' />
                                      <path d='M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118z' />
                                    </svg>
                                  </span>
                                  <p className='text-green-600 font-semibold my-2'>
                                    {/* ?.getHours().toString().padStart(2, '0') */}
                                    Miễn phí hủy trước{' '}
                                    {item.TimeRecive?.toString()}
                                  </p>
                                </div>
                                <hr className='bg-green-600' />
                                <div className='flex flex-row my-2 relative'>
                                  <span className='absolute left-[65%] top-[-15px]'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      className='text-red-600 bi bi-record-fill'
                                      viewBox='0 0 16 16'>
                                      <path
                                        fill-rule='evenodd'
                                        d='M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10'
                                      />
                                    </svg>
                                  </span>
                                  <p className='text-green-600 font-semibold w-8/12'>
                                    Miễn phí hủy trước{' '}
                                    {item.TimeRecive?.toString()}
                                  </p>
                                  <p className='text-red-500  font-semibold w-4/12'>
                                    Không thể hoàn tiền
                                  </p>
                                </div>
                                <p>
                                  Bạn có thể đổi ngày lưu trú hoặc hủy trước
                                  ngày
                                  {item.TimeRecive?.toString()}. Nếu bạn thay
                                  đổi hoặc hủy sau thời gian trên, bạn có thể
                                  chịu phí hủy.
                                </p>
                                <p>
                                  Thời gian hiển thị là giờ địa phương của khách
                                  sạn.
                                </p>
                              </div>
                            ) : null}
                          </div>
                        }></Badge>

                      <Badge
                        color='green'
                        name={
                          <div className='flex flex-row gap-2 justify-center items-center'>
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className={`w-6 h-6 
                                                 ${
                                                   item.ChangeTimeRecive
                                                     ? 'text-cyan-500'
                                                     : 'text-gray-300'
                                                 }`}>
                                <path
                                  fillRule='evenodd'
                                  d='M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 0 1 3.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 0 0-4.392-4.392 49.422 49.422 0 0 0-7.436 0A4.756 4.756 0 0 0 3.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 1 0 1.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 0 1 3.01-3.01c1.19-.09 2.392-.135 3.605-.135Zm-6.97 6.22a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 0 0 4.392 4.392 49.413 49.413 0 0 0 7.436 0 4.756 4.756 0 0 0 4.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 0 0-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 0 1-3.01 3.01 47.953 47.953 0 0 1-7.21 0 3.256 3.256 0 0 1-3.01-3.01 47.759 47.759 0 0 1-.1-1.759L6.97 15.53a.75.75 0 0 0 1.06-1.06l-3-3Z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </span>
                            <p
                              className={`${
                                item.ChangeTimeRecive
                                  ? 'text-cyan-500'
                                  : 'text-gray-300'
                              }`}>
                              Có thể đổi lịch
                            </p>
                          </div>
                        }></Badge>

                      <Badge
                        color='green'
                        name={
                          <div className='flex flex-row gap-2 justify-center items-center'>
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='w-6 h-6 text-cyan-500'>
                                <path d='M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z' />
                                <path
                                  fillRule='evenodd'
                                  d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </span>
                            <div className='flex flex-col relative group cursor-pointer'>
                              <p className={`text-cyan-500`}>
                                {item.Hinh_Thuc_Thanh_Toan
                                  ? 'Thanh toán online'
                                  : 'Thanh toán trực tiếp'}
                              </p>
                              {/* <p className={`text-cyan-500 ml-2 text-sm`}>
                            {item.Hinh_Thuc_Thanh_Toan
                              ? 'Thanh toán khi đặt phòng'
                              : 'Thanh toán khi bạn nhận phòng tại nơi ở'}
                          </p> */}
                              {/* <div
                            className='w-[350px] absolute top-15 ml-[-50%] rounded-lg z-9
                                                text-white p-5 cursor-pointer  invisible group-hover:visible'
                            style={{ background: 'rgb(0 0 0 / 85%)' }}>
                            <div
                              className='w-[10px] h-[10px] rotate-45
                                    ml-[30%] absolute top-[-5px]'></div>
                            <p>Áp dụng thanh toán tại khách sạn</p>
                            <p>
                              Cho chuyến đi thêm linh hoạt: KHÔNG CẦN THANH TOÁN
                              NGAY khi đặt phòng! Bạn có thể đặt ngay phòng có
                              giá tốt nhất hôm nay và thanh toán sau bằng tiền
                              mặt hoặc thẻ khi nhận phòng.
                            </p>
                          </div> */}
                            </div>
                          </div>
                        }></Badge>
                    </div>

                    <div className='w-full lg:w-4/12 flex flex-col justify-start items-end'>
                      <div className='flex flex-row'>
                        {item.Discount ? (
                          <p className='line-through font-semibold text-gray-700 mr-1'>
                            {typeRoom.Price.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </p>
                        ) : null}
                        <p className='text-2xl text-red-500'>
                          <b>
                            {todoGetPriceDiscoun(
                              typeRoom.Price,
                              item.Discount,
                            ).toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </b>
                        </p>
                      </div>
                      <Link
                        className='text-xl font-bold bg-red-500 text-white py-2 px-10 my-3 rounded-xl'
                        href={`/app/hotel/booking/?room_id=${item.id}`}
                        onClick={() => {
                          route.push(`/app/hotel/booking/?room_id=${item.id}`);
                        }}>
                        Chọn
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <svg
                    className='w-11/12 h-[120px] text-gray-500 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M12 17a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2Z'
                    />
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M13.815 9H16.5a2 2 0 1 0-1.03-3.707A1.87 1.87 0 0 0 15.5 5 1.992 1.992 0 0 0 12 3.69 1.992 1.992 0 0 0 8.5 5c.002.098.012.196.03.293A2 2 0 1 0 7.5 9h3.388m2.927-.985v3.604M10.228 9v2.574M15 16h.01M9 16h.01m11.962-4.426a1.805 1.805 0 0 1-1.74 1.326 1.893 1.893 0 0 1-1.811-1.326 1.9 1.9 0 0 1-3.621 0 1.8 1.8 0 0 1-1.749 1.326 1.98 1.98 0 0 1-1.87-1.326A1.763 1.763 0 0 1 8.46 12.9a2.035 2.035 0 0 1-1.905-1.326A1.9 1.9 0 0 1 4.74 12.9 1.805 1.805 0 0 1 3 11.574V12a9 9 0 0 0 18 0l-.028-.426Z'
                    />
                  </svg>
                  <p className='text-gray-500 font-bold text-2xl text-center'>
                    Loại phòng này hiện chưa hoạt động, hoặc đang bảo trì
                  </p>
                </div>
              )}
            </div>
            {/* //modal chi tiet phong */}

            <div className={`w-full ${modalState ? 'block' : 'hidden'} h-full flex z-[999999]
          fixed inset-0 justify-center items-center`} style={{ background: 'rgb(0 0 0 / 85%)' }}>
                <div className="w-9/12 h-[90%] flex flex-row rounded-2xl
                bg-black opacity-100">
                    {/* danh sach hinh anh */}
                    <div className="flex  flex-col w-8/12">
                        <div className="flex flex-row w-full relative">
                            <p className="font-bold text-2xl text-white my-2 p-3">{typeRoom.Name}</p>
                            <button className="absolute right-5 top-5" onClick={() => handleShowModal()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-white w-8 h-8">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>

                            </button>
                        </div>
                        {/* hinh anh dai dien  */}
                        <div className="flex flex-row relative items-center">
                            <img src={imageModalCurrent}
                                className="w-11/12 h-[390px] ml-4 rounded-3xl" />
                            <button className="bg-black opacity-50 w-9 h-9 absolute text-center
                            justify-center items-center flex text-white left-2 ml-3 rounded-full"
                                onClick={() => handlePreviousImage()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                                </svg>


            {/* coppy */}
          </div>
        </div>
      </div>
      {/* //modal chi tiet phong */}

      <div
        className={`w-full ${
          modalState ? 'block' : 'hidden'
        } h-full flex z-[999999]
          fixed inset-0 justify-center items-center`}
        style={{ background: 'rgb(0 0 0 / 85%)' }}>
        <div
          className='w-9/12 h-[90%] flex flex-row rounded-2xl
                bg-slate-500 opacity-100'>
          {/* danh sach hinh anh */}
          <div className='flex  flex-col w-8/12'>
            <div className='flex flex-row w-full relative'>
              <p className='font-bold text-2xl text-white my-2 p-3'>
                {typeRoom.Name}
              </p>
              <button
                className='absolute right-5 top-5'
                onClick={() => handleShowModal()}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='text-whiten w-8 h-8'>
                  <path
                    fillRule='evenodd'
                    d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {/* hinh anh dai dien  */}
            <div className='flex flex-row relative items-center'>
              <Image
                width={390}
                height={390}
                alt='#'
                src={imageModalCurrent}
                className='w-11/12 h-[390px] ml-4 rounded-3xl'
              />
              <button
                className='bg-black opacity-50 w-9 h-9 absolute text-center
                            justify-center items-center flex text-white left-2 ml-3 rounded-full'
                onClick={() => handlePreviousImage()}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-6 h-6'>
                  <path
                    fillRule='evenodd'
                    d='M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <button
                className='bg-black opacity-50 w-9 h-9 absolute text-center
                            justify-center items-center flex text-white right-12 mr-3 rounded-full'
                onClick={() => handleNextImage()}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-6 h-6'>
                  <path
                    fillRule='evenodd'
                    d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <p
                className='font-bold text-xl text-white absolute
                            left-0 bottom-0 m-5 p-2 rounded-3xl bg-black opacity-85'>
                {listImage[indexImageModal].TypeRoom.split(';')[1]}
              </p>
            </div>
            {/* list hinh anh */}
            <div className='flex flex-col ml-3 w-11/12 mt-4'>
              <Carousel
                className='w-full'
                id='slider'>
                <CarouselContent className=''>
                  {listImage.map((item, index) => (
                    <CarouselItem
                      key={item.id}
                      className='basis-1/5'>
                      <Image
                        width={60}
                        height={60}
                        alt='#'
                        src={`${item.FileName}`}
                        className={`w-full
                                                h-[70px] rounded-3xl object-cover cursor-pointer
                                                ${
                                                  indexImageModal === index
                                                    ? 'border border-b-2 border-blue-700'
                                                    : ''
                                                }`}
                        onClick={() => {
                          setIndexImageModal(index);
                          setImageModalCurrent(listImage[index].FileName);
                        }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <CarouselPrevious className="ml-10 " />
                                <CarouselNext className="mr-10" /> */}
              </Carousel>
            </div>
          </div>
          {/* chi tiet phong */}
          <div className='flex  flex-col w-4/12 bg-white rounded-3xl h-full'>
            <div className='flex flex-col h-[80%] overflow-y-scroll p-3'>
              {/* Thong tin phong */}
              <p>
                <b>Thông tin phòng</b>
              </p>
              <p className='flex pl-3 text-gray-900 font-bold text-lg my-2 items-center'>
                <span>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='mx-2'
                    xmlns='http://www.w3.org/2000/svg'
                    data-id='IcHotelRoomMeasure'>
                    <path
                      d='M12 21H7L21 7V21H18M12 21V20M12 21H15M15 21V20M15 21H18M18 21V20M15 17H17V15'
                      stroke='#0194F3'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'></path>
                    <path
                      d='M8 8L9 9M8 8L5 11M8 8L11 5M5 11L6 12M5 11L2 14L5 17L17 5L14 2L11 5M11 5L12 6'
                      stroke='#03121A'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'></path>
                  </svg>
                </span>
                {typeRoom.FloorArea.toFixed(1)} m²
              </p>
              <p className='flex pl-3 text-gray-900 font-bold text-lg my-2 items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  data-id='IcSystemGuestPassenger'
                  className='mx-2'>
                  <g
                    fill='none'
                    fill-rule='evenodd'>
                    <rect
                      width='24'
                      height='24'></rect>
                    <path
                      stroke='#03121A'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M2,21 L13,21 L13,19.5 C13,16.4624339 10.5375661,14 7.5,14 L7.5,14 C4.46243388,14 2,16.4624339 2,19.5 L2,21 Z M7,4 L8,4 C9.65685425,4 11,5.34314575 11,7 L11,8.5 C11,10.4329966 9.43299662,12 7.5,12 L7.5,12 C5.56700338,12 4,10.4329966 4,8.5 L4,7 C4,5.34314575 5.34314575,4 7,4 Z'></path>
                    <path
                      stroke='#0194F3'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M16,19 L22,19 L22,18 C22,14.4624339 19.5581561,12 17,12 C15.6264236,12 14.7600111,12.2294943 14,13 M16,2 L16.3162278,2.9486833 C16.7245699,4.17370972 17.8709864,5 19.1622777,5 L21,5'></path>
                    <path
                      stroke='#0194F3'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M16,2 L17,2 C18.6568542,2 20,3.34314575 20,5 L20,6.5 C20,8.43299662 18.4329966,10 16.5,10 L16.5,10 C14.5670034,10 13,8.43299662 13,6.5 L13,5 C13,3.34314575 14.3431458,2 16,2 Z'></path>
                  </g>
                </svg>
                {typeRoom.MaxQuantityMember} người
              </p>
              <hr />
              {/* Tinh nang phong */}
              <p>
                <b>Tính năng phòng</b>
              </p>

              <div className='flex flex-row'>
                <div className='w-1/2 flex flex-col gap-2'>
                  {typeRoom.Bon_Tam ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div
                            className='flex flex-row justify-center
                            items-center
                            gap-2'>
                            <span>Bồ Tắm</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/bontam.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}

                  {typeRoom.May_Lanh ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div
                            className='flex flex-row justify-center
                            items-center
                            gap-2'>
                            <span>Máy lạnh</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/maylanh.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}

                  {typeRoom.Khu_Vuc_Cho ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div
                            className='flex flex-row justify-center
                            items-center
                            gap-2'>
                            <span>Khu vực chờ</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/khuvucho.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}

                  {typeRoom.Nuoc_Nong ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div
                            className='flex flex-row justify-center
                            items-center
                            gap-2'>
                            <span>Nước nóng</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/nuocnong.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}

                  {typeRoom.Voi_Tam_Dung ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div className='flex flex-row justify-center items-center gap-2'>
                            <span>Vòi tắm đứng</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/voisen.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}
                </div>
                <div className='w-1/2 flex flex-col gap-2'>
                  {typeRoom.Ban_Cong_San_Hien ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div
                            className='flex flex-row justify-center
                            items-center
                            gap-2'>
                            <span>Ban công</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/bancong.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}

                  {typeRoom.Lo_Vi_Song ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div
                            className='flex flex-row justify-center
                            items-center
                            gap-2'>
                            <span>Lò vi sóng</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/lovisong.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}

                  {typeRoom.Tu_Lanh ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div
                            className='flex flex-row justify-center
                            items-center
                            gap-2'>
                            <span>Tủ lạnh</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/tulanh.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}
                  {typeRoom.May_Giat ? (
                    <div className='flex flex-row '>
                      <Badge
                        name={
                          <div
                            className='flex flex-row justify-center
                            items-center
                            gap-2'>
                            <span>Máy Giặt</span>
                            <Image
                              width={20}
                              height={20}
                              alt='#'
                              src='/icon/maygiat.webp'
                            />
                          </div>
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <hr />
              {/* Tien nghi phong */}
              <p className='my-3'>
                <b>Tiện nghi phòng tắm</b>
              </p>
              <ul
                className='text-lg font-semibold text-gray-900 ml-5
                            grid grid-cols-2 gap-1'>
                {convenientBathRoom.map((item) => (
                  <li
                    key={item}
                    className='list-disc'>
                    {item}
                  </li>
                ))}
              </ul>
              <hr />
              {/* tien nghi phong */}
              <p className='my-3'>
                <b>Tiện nghi phòng tắm</b>
              </p>
              <ul
                className='text-lg font-semibold text-gray-900 ml-5
                            grid grid-cols-2 gap-1'>
                {convenientRoom.map((item) => (
                  <li
                    key={item}
                    className='list-disc'>
                    {item}
                  </li>
                ))}
              </ul>
              <hr />
              {/* ve phong nay */}
              <p>
                <b>Về phòng này</b>
              </p>
              <p>
                <b>{typeRoom.SoLuongGiuong + ' ' + typeRoom.TenLoaiGiuong} </b>
              </p>
              <p className='text-red-700'>
                <b>{typeRoom.No_Moking ? 'Không được hút thuốc' : ''} </b>
              </p>
            </div>
            <div className='flex flex-col h-[20%] p-3'>
              <p className='text-gray-900 text-xl font-bold'>
                Giá khởi điểm từ:
              </p>
              <p className='text-red-500 text-2xl font-bold'>
                {typeRoom.Price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
                <span className='text-lg font-bold text-gray-900 ml-2'>
                  /Phòng /Đêm
                </span>
              </p>
              <button
                className='w-full bg-cyan-500 text-white
                            font-bold rounded-3xl py-2'
                onClick={() => handleShowModal()}>
                Thêm lựa chọn phòng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailRoom;
