'use client';
import URL_Enum from '@/axios/URL_Enum';
import DetailRoom from '@/components/shared/DetailRoom';
import Loading from '@/components/shared/Loading';
import ModalListImagesHotel from '@/components/shared/ModalListImagesHotel';
import RateHotel from '@/components/shared/RateHotel';
import Star from '@/components/shared/Star';
import SearchForm2 from '@/components/shared/form/SearchForm2';
import axios from 'axios';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React, { lazy, useEffect, useRef, useState } from 'react';
import RateShortModal from '@/components/shared/RateShortModal';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MapPin, StarIcon } from 'lucide-react';

export default function HotelDetail() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [showDescript, setShowDescript] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>('TongQuan');
  const [rateShortModaState, setRateShortModaState] = useState<boolean>(false);
  const [rateItem, setRateItem] = useState<IRate>();
  const [hotel, setHotel] = useState<IHotel>();
  const [diadiemlancan, setDiadiemlancan] = useState<IDiaDiemLanCan[]>([]);
  const [avgRate, setAvgRate] = useState<number>(0);
  const [avgRateText, setAvgRateText] = useState<
    'Chưa có đánh giá' | 'Trung bình' | 'Tốt' | 'Ấn tượng'
  >('Chưa có đánh giá');
  const arrHienThiGia = [
    'Mỗi phòng mỗi đêm (bao gồm thuế và phí)',
    'Mỗi phòng mỗi đêm (chưa bao gồm thuế và phí)',
    'Tổng giá (bao gồm thuế và phí)',
    'Tổng giá (chưa bao gồm thuế và phí)',
  ];
  const [hienThiGia, setHienThiGia] = useState<string>(
    'Mỗi phòng mỗi đêm (bao gồm thuế và phí)',
  );
  const [dsHienThiGiaState, setDsHienThiGiaState] = useState<boolean>(false); //mac dinh an danh sach
  useEffect(() => {
    if (
      searchParams.get('id') == null ||
      searchParams.get('id') == '' ||
      searchParams.get('id') == undefined
    )
      route.push('/app/hotel');
    const fecthData = (url: string) => {
      setLoadingState(true);
      axios
        .get(url)
        .then((response) => {
          setHotel(response.data.result);

          if (response.data.result.rates) {
            var sumRate = 0;

            response.data.result.rates.map((item: IRate) => {
              sumRate += item.Rating;
            });
            setAvgRate(
              Number((sumRate / response.data.result.rates.length).toFixed(1)),
            );
            if (sumRate / response.data.result.rates.length < 7)
              setAvgRateText('Trung bình');
            else if (sumRate / response.data.result.rates.length < 8)
              setAvgRateText('Tốt');
            else setAvgRateText('Ấn tượng');
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoadingState(false);
        });
    };
    fecthData(
      URL_Enum.BaseURL_Api + 'hotel/get-one-by-id?id=' + searchParams.get('id'),
    );
  }, []);
  useEffect(() => {
    setLoadingState(true);
    const fetchData = (url: string) => {
      axios
        .get(url)
        .then((response) => {
          setDiadiemlancan(response.data.result);
          console.log('diadiemlancan', response.data.result);
        })
        .catch((error) => console.log('loi load diadiemlancan', error))
        .finally(() => {
          setLoadingState(false);
        });
    };
    fetchData(
      URL_Enum.BaseURL_Api +
        'diadiemlancan/get-list-by-id?id=' +
        searchParams.get('id'),
    );
  }, []);
  // const getListConvenientByTypeRoomId = (typeRoomId: string): IConvenient[] => {
  //     var listConvenient: IConvenient[] = []
  //     hotel?.convenients?.map((item) => {
  //         if (item.id === typeRoomId) {
  //             listConvenient.push(item);
  //         }
  //     });
  //     return listConvenient;
  // }
  console.log(hotel);
  const getListImageByTypeRoomId = (typeRoomId: string): IHotelImage[] => {
    var listImage: IHotelImage[] = [];
    hotel?.images.map((item) => {
      //listImage.push(item);
      if (item.TypeRoom?.split(';')[0] === typeRoomId) {
        listImage.push(item);
      }
    });
    return listImage;
  };
  const [modalListImagesState, setModalListImagesState] =
    useState<boolean>(false);
  const [currentImageModal, setCurrentImageModal] = useState<number>(0);

  const handleStateModalListImagesChange = (
    state: boolean,
    idImageCurrent: number,
  ) => {
    setModalListImagesState(state);
    setCurrentImageModal(idImageCurrent);
  };
  const getListTypeImage = (): TypeImage[] => {
    var listTypes: TypeImage[] = [];
    hotel?.images &&
      hotel?.images.map((item) => {
        var listType = {
          TypeName: item.TypeRoom?.split(';')[1],
          Total: 0,
          FirstImage: '',
        };
        hotel.images.map((jItem) => {
          if (jItem.TypeRoom?.split(';')[1] === listType.TypeName) {
            listType.Total += 1;
            if (listType.FirstImage === '') {
              listType.FirstImage = jItem.FileName;
            }
          }
        });
        if (
          !listTypes.find((item) => {
            return item.TypeName === listType.TypeName;
          })
        ) {
          listTypes.push(listType);
        }
      });
    return listTypes;
  };

  function isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    const elementInView =
      rect.top <= windowHeight &&
      rect.bottom >= 0 &&
      rect.left <= windowWidth &&
      rect.right >= 0;

    return elementInView;
  }
  const targetElementRefs = {
    TongQuan: useRef<HTMLDivElement>(null),
    Phong: useRef<HTMLDivElement>(null),
    ViTri: useRef<HTMLDivElement>(null),
    TienIch: useRef<HTMLDivElement>(null),
    ChinhSach: useRef<HTMLDivElement>(null),
    DanhGia: useRef<HTMLDivElement>(null),
  };

  const handleGoToElement = (elementKey: string) => {
    const targetElementRef = targetElementRefs[elementKey];
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      var eTongQuan = document.getElementById('TongQuan');
      var ePhong = document.getElementById('ePhong');
      var eViTri = document.getElementById('eViTri');
      var eTienIch = document.getElementById('TienIch');
      var eChinhSach = document.getElementById('ChinhSach');
      var eDanhGia = document.getElementById('DanhGia');
      if (eTongQuan && isElementVisible(eTongQuan)) {
        setCurrentScreen('TongQuan');
      } else if (ePhong && isElementVisible(ePhong)) {
        setCurrentScreen('Phong');
      } else if (eChinhSach && isElementVisible(eChinhSach)) {
        setCurrentScreen('ChinhSach');
      } else if (eViTri && isElementVisible(eViTri)) {
        setCurrentScreen('ViTri');
      } else if (eTienIch && isElementVisible(eTienIch)) {
        setCurrentScreen('TienIch');
      } else if (eDanhGia && isElementVisible(eDanhGia)) {
        setCurrentScreen('DanhGia');
      } else {
        setCurrentScreen('TongQuan');
      }
      console.log('roooo');
    };
    window.addEventListener('scroll', handleScroll);
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Loading modalState={loadingState} />
      {hotel !== undefined ? (
        <main className='mb-20 flex flex-col items-center justify-center'>
          <SearchForm2
            currentScreen={currentScreen}
            handleGoToElement={handleGoToElement}
          />
          {/* tieu de */}
          <div className='w-10/12'>
            <div className='w-full flex'>
              <div className='w-9/12 flex flex-col gap-3'>
                <p className='text-xl lg:text-[32px]'>
                  <b>{hotel?.Name}</b>
                </p>
                <div className='flex w-full flex-row justify-start items-center gap-4'>
                  <b className='text-base'>Khách sạn:</b>
                  <span>{hotel.StarRate}</span>
                  <StarIcon
                    fill='yellow'
                    color='yellow'
                  />
                </div>
                <div className='flex flex-row gap-2'>
                  <MapPin
                    color='blue'
                  />
                  <p
                    className='pl-1
                                    '>
                    {hotel?.Address}
                    
                  </p>
                  <span className='text-base font-semibold text-blue-500 cursor-pointer'>
                      Xem bản đồ
                    </span>
                </div>
              </div>
              <div className='w-3/12 flex flex-col justify-end gap-4'>
                <p className='text-right'>
                  <b>Giá/phòng/đêm từ</b>
                </p>
                <p className='text-right text-base text-red-600'>
                  <b>
                    {hotel.type_rooms &&
                      hotel.type_rooms[0].Price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                  </b>
                </p>
                <Button className='bg-cyan-500'>Chọn phòng</Button>
              </div>
            </div>
          </div>

          {/* hinh anh */}
          <div className='w-10/12 flex flex-col my-2 lg:flex-row'>
            <div className='w-full lg:w-7/12 relative'>
              <Image
                width={800}
                height={200}
                alt='img_hotel'
                loading='lazy'
                src={`${URL_Enum.BaseURL_Image}/${
                  hotel.images &&
                  hotel?.images.find((image) => {
                    return image.TypeRoom === 'None;Ảnh bìa';
                  })?.FileName
                }`}
                className='w-full rounded-xl lg:h-[410px]'
                onClick={() => handleStateModalListImagesChange(true, 0)}
              />
              <div
                className='absolute bottom-36 w-[12px] h-[12px] bg-gray-900 ml-[-5px] rotate-45
                    z-[-10] opacity-75 '></div>
              <div
                className='absolute bottom-16 w-[8px] h-22 bg-gray-900 ml-[-8px]
                    z-[-10] opacity-75 '></div>
              <div
                className='absolute bottom-16 w-5/12 h-22 bg-gray-900 flex justify-start items-center 
                    opacity-75  pl-3 rounded-e-full ml-[-8px]'>
                <div
                  className='rounded-full bg-gray-500 border-blue-400
                         w-15 h-15 flex justify-center items-center border-2 text-white'>
                  <div
                    className='rounded-full bg-blue-500 w-12 h-12 flex justify-center items-center
                        text-white '>
                    {avgRate}
                  </div>
                </div>
                <div className='ml-3 text-base'>
                  <p className='text-white font-semibold'>{avgRateText}</p>
                  <p className='text-white font-semibold'>
                    Đánh giá từ {hotel?.rates?.length} du khách →
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-5/12 flex  flex-1'>
              <div className='flex flex-wrap'>
                {hotel?.images?.length > 6
                  ? hotel?.images
                      ?.filter((fitem) => {
                        return fitem.TypeRoom !== 'None;Ảnh bìa';
                      })
                      .slice(0, 6)
                      .map((item, index) =>
                        index != 5 ? (
                          item.FileName && item.TypeRoom != 'None;Ảnh bìa' ? (
                            <Image
                              height={137}
                              width={200}
                              alt='ảnh bìa'
                              loading='lazy'
                              src={` ${item.FileName}`}
                              onClick={() =>
                                handleStateModalListImagesChange(true, index)
                              }
                              className='w-1/2 rounded-3xl h-[137px] p-1'
                            />
                          ) : null
                        ) : (
                          <div
                            key={item.id}
                            className='w-1/2 scale-[0.95] hover:scale-100 rounded-3xl h-[137px] relative'
                            onClick={() =>
                              handleStateModalListImagesChange(true, index)
                            }>
                            <div
                              className='w-full rounded-3xl h-[137px] absolute z-1
                                     bg-black opacity-70 flex justify-center items-center'>
                              <button className='font-bold text-white text-center'>
                                Xem tất cả hình ảnh
                              </button>
                            </div>
                            <Image
                              height={137}
                              width={200}
                              alt={item.FileName}
                              loading='lazy'
                              src={`${item.FileName}`}
                              onClick={() =>
                                handleStateModalListImagesChange(true, 5)
                              }
                              className='w-full rounded-3xl  h-[137px]'
                            />
                          </div>
                        ),
                      )
                  : hotel?.images?.map((item, index) =>
                      item.FileName && item.TypeRoom != 'None;Ảnh bìa' ? (
                        <Image
                          alt={item.FileName}
                          key={index}
                          loading='lazy'
                          width={100}
                          height={137}
                          src={`${item.FileName}`}
                          onClick={() =>
                            handleStateModalListImagesChange(true, index)
                          }
                          className='w-1/2 rounded-3xl h-[137px] p-1'
                        />
                      ) : null,
                    )}
              </div>
            </div>
          </div>
          {/* modal danh sach hinh */}
          <div></div>

          {/* gioi thieu khach san */}
          <div
            className='w-10/12 flex flex-col lg:flex-row'
            id='TongQuan'
            ref={targetElementRefs.TongQuan}>
            <div className='w-full  my-5 lg:my-3 lg:w-4/12 flex bg-slate-100 rounded-3xl p-3 flex-wrap'>
              <p className='w-8/12 text-gray-950 font-bold'>
                Giới thiệu cơ sở lưu trú
              </p>
              <span
                className='w-4/12  text-right font-bold text-blue-500 underline
                    cursor-pointer'>
                Xem thêm ⟩
              </span>
              <p>{hotel.Description && hotel?.Description.slice(0, 304)}</p>
            </div>
            <div
              className='w-full my-5 lg:my-3 lg:w-8/12 flex flex-col lg:flex-row lg:ml-2 rounded-3xl p-3'
              style={{ backgroundImage: "url('/background/bg-map.jpg')" }}>
              <div className='w-full h-30 flex flex-col'>
                <div className='w-full  my-5 lg:my-0 flex rounded-3xl flex-wrap'>
                  <p className='w-8/12 text-gray-950 font-bold'>
                    Địa điểm lân cận
                  </p>
                  <span
                    className='w-4/12  text-right font-bold text-blue-500 underline
                    cursor-pointer'>
                    Xem thêm ⟩
                  </span>
                </div>
                {/* them dia chi lan can */}
                <ul className='w-full grid lg:grid-cols-2'>
                  {diadiemlancan.slice(0, 6).map((item) => (
                    <li
                      key={item.id}
                      className='w-full flex flex-row items-center p-1 overflow-hidden text-gray-900
                                        font-semibold'>
                      <div className='w-9/12 flex flex-row items-center justify-start'>
                        <img
                          src={`/icon/${item.ImageIcon}`}
                          className='w-7 h-7 mr-2'
                        />
                        <span>{item.Name}</span>
                      </div>
                      <p className='w-3/12 text-end'>{item.Distance}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* tien ich va danh gia */}
          <div className='w-10/12 flex flex-col lg:flex-row'>
            <div className='w-full  my-5 lg:my-3 lg:w-4/12 flex bg-slate-100 rounded-3xl p-3 flex-wrap'>
              <p className='w-8/12 text-gray-950 font-bold'>Tiện ích chính</p>
              <span
                className='w-4/12  text-right font-bold text-blue-500 underline
                    cursor-pointer'>
                Xem thêm ⟩
              </span>
              <ul>
                {hotel?.convenients?.slice(0, 6).map((item) => (
                  <li
                    key={item.id}
                    className='font-semibold text-gray-900 my-2'>
                    <p
                      className='flex 
                            justify-start items-center'>
                      <span>
                        <img
                          loading='lazy'
                          className='w-5 h-5 rounded-3xl mr-3'
                          src={`/icon/${item.ImageIcon}`}
                        />
                      </span>
                      {item.Description[0]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className='w-full flex-wrap my-5 lg:my-3 lg:w-8/12 flex flex-col lg:flex-row lg:ml-2 
                rounded-3xl  bg-slate-100 p-3 '>
              <p className='w-8/12 text-gray-950 font-bold'>
                Khách nói gì về kỳ nghỉ của họ
              </p>
              <span
                className='w-4/12  text-right font-bold text-blue-500 underline
                    cursor-pointer'>
                Xem thêm ⟩
              </span>
              <div className='w-full h-[140px]'>
                <Carousel
                  className='w-full min-w-[280px] h-full'
                  id='slider'>
                  <CarouselContent className='w-full h-full'>
                    {hotel.rates?.map((item, index) => (
                      <CarouselItem
                        key={item.id}
                        className='basis-1/2'>
                        <div
                          className='w-full p-3 rounded-3xl border border-gray-200
                                    shadow-1 shadow-gray-400 flex flex-col cursor-pointer h-[140px] bg-white'
                          onClick={() => {
                            setRateItem(item);
                            setRateShortModaState(!rateShortModaState);
                          }}>
                          <div className='w-full flex flex-row'>
                            <div className='flex flex-row w-3/12'>
                              <img
                                src='/icon/5285ed4483dbe0a200497d4c3de31128.webp'
                                className='w-8 h-8'
                              />
                              <p>{item.Rating}/10</p>
                            </div>
                            <p
                              className='w-9/12 flex justify-end items-center
                                                        font-semibold'>
                              {item.guest.Name}
                            </p>
                          </div>
                          <p>
                            {item.Description.length > 200
                              ? item.Description.slice(0, 199) + '...'
                              : item.Description}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className='ml-10 bg-cyan-300' />
                  <CarouselNext className='mr-10  bg-cyan-300' />
                </Carousel>
              </div>
            </div>
          </div>

          {/* danh muc phong */}
          <div
            id='ePhong'
            className='w-10/12 flex flex-col bg-cyan-200 p-3 rounded-3xl'
            ref={targetElementRefs.Phong}>
            <p className='font-semibold text-xl'>
              Những phòng còn trống tại {hotel?.Name}
            </p>
            <div
              className=' flex flex-row bg-blue-800 rounded-3xl justify-start items-center pl-4
                py-4 my-3'>
              <img
                src='/policy/TagPolicy.webp'
                className='w-12 h-12'
              />
              <p className='text-lg text-white font-bold ml-2'>
                Phải đặt phòng trong thời điểm không chắc chắn này? Hãy chọn
                phòng có thể hủy miễn phí!
              </p>
            </div>
            {/* filter */}
            <div
              className=' flex flex-col bg-white rounded-3xl justify-start items-start pl-4
                py-4 my-3'>
              <p className='text-lg text-left text-gray-900 font-bold my-3'>
                Tìm kiếm nhanh hơn bằng cách chọn những tiện nghi bạn cần
              </p>
              <div className='w-full flex flex-col lg:flex-row '>
                <div className='w-full lg:w-3/12 my-2 flex justify-start items-center'>
                  <input
                    id='MienPhiHuyPhong'
                    type='checkbox'
                    className='w-7 h-7'
                  />
                  <label
                    htmlFor='MienPhiHuyPhong'
                    className='text-lg font-medium text-gray-900
                        cursor-pointer select-none ml-1'>
                    Miễn phí hủy phòng
                  </label>
                </div>

                <div className='w-full lg:w-3/12 my-2 flex justify-start items-center'>
                  <input
                    id='MienPhiHuyPhong'
                    type='checkbox'
                    className='w-7 h-7'
                  />
                  <label
                    htmlFor='MienPhiHuyPhong'
                    className='text-lg font-medium text-gray-900
                        cursor-pointer select-none ml-1'>
                    Miễn phí hủy phòng
                  </label>
                </div>

                <div className='w-full lg:w-3/12 my-2 flex justify-start items-center relative '>
                  <input
                    id='GiuongLon'
                    type='checkbox'
                    className='w-7 h-7'
                  />
                  <label
                    htmlFor='GiuongLon'
                    className='text-lg font-medium text-gray-900
                        cursor-pointer select-none ml-1 inline-block'>
                    Giường lớn
                  </label>
                  <div className='group flex flex-row'>
                    <span className='hover:scale-105 cursor-pointer '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6 text-blue-700'>
                        <path
                          fillRule='evenodd'
                          d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                    <div
                      className='w-11/12 rounded-3xl bg-slate-900 opacity-80
                            text-white font-medium p-1 absolute mt-[-70px] ml-[-50%] invisible 
                            group-hover:visible'>
                      <p>
                        Giướng lớn có thể bao gồm: giường đôi/queen/king. Phù
                        hợp cho 2 người lớn.
                      </p>
                      <div
                        className='w-[6px] h-[6px] rotate-45  bg-slate-900 opacity-85
                                    ml-[55%] absolute'></div>
                    </div>
                  </div>
                </div>

                <div className='w-full lg:w-3/12 my-2 flex flex-col justify-start items-start relative'>
                  <p className='text-lg font-medium text-gray-900'>
                    Hiển thị giá
                  </p>
                  <p
                    className='text-lg font-bold text-cyan-600 flex flex-row cursor-pointer select-none'
                    onClick={() => {
                      setDsHienThiGiaState(!dsHienThiGiaState);
                    }}>
                    {hienThiGia.length > 25
                      ? hienThiGia.slice(0, 25) + '...'
                      : hienThiGia}
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6'>
                        <path
                          fillRule='evenodd'
                          d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  </p>
                  <div
                    className={`bg-white shadow-1 shadow-gray-500 p-3 rounded-3xl absolute z-10
                            top-[50px] ${
                              dsHienThiGiaState ? 'block' : 'hidden'
                            }`}>
                    {arrHienThiGia.map((item) => (
                      <p
                        key={item}
                        className={`text-lg font-bold ${
                          item === hienThiGia
                            ? 'text-cyan-600'
                            : 'text-gray-900'
                        } my-2 cursor-pointer select-none`}
                        onClick={() => {
                          setHienThiGia(item);
                          setDsHienThiGiaState(!dsHienThiGiaState);
                        }}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* typeroom danh sach phong */}
            {hotel?.type_rooms?.map((item) =>
              item.id !== undefined ? (
                <DetailRoom
                  key={item.id}
                  typeRoom={item}
                  listImage={getListImageByTypeRoomId(item.id)}
                  listConvenient={hotel.convenients}
                />
              ) : null,
            )}
          </div>
          <div className='w-10/12 flex justify-end items-end'>
            <div
              className='flex relative justify-start items-center h-26 bg-blue-400 w-11/12
             my-10 rounded-3xl'>
              <img
                src='/background/taiappbg.webp'
                className='h-full absolute  ml-16 left-[-90px]'
              />
              <img
                src='/background/taiapp.webp'
                className='h-full absolute scale-125 left-[-90px]'
              />
              <div className='z-9 flex flex-col pl-10'>
                <p className='text-white text-2xl'>
                  <b>Bạn có thể đặt được phòng với giá tốt hơn đấy!</b>
                </p>
                <p className='text-white text-lg font-semibold'>
                  Những người dùng khác luôn tìm được phòng với giá thấp hơn khi
                  đặt trên app của chúng tôi. Bạn cũng tải app ngay nhé!
                </p>
              </div>
              <button
                className='text-cyan-400 bg-white text-xl font-bold
                    p-2 rounded-3xl absolute right-4'>
                Tải app
              </button>
            </div>
          </div>

          {/* Khach san lan can */}
          <div></div>

          {/* thong tin khu vuc */}
          <div
            className='w-full lg:w-10/12 flex flex-col lg:flex-row flex-wrap bg-slate-100 rounded-3xl'
            id='eViTri'
            ref={targetElementRefs.ViTri}>
            <div className='w-full lg:w-4/12 p-3'>
              <p
                className='font-semibold text-lg text-gray-800 cursor-pointer
                            flex flex-row items-start'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-6 h-6'>
                    <path
                      fillRule='evenodd'
                      d='m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                {hotel.Address}
              </p>
            </div>

            <div className='w-full lg:w-4/12 p-3'>
              <p className='text-xl text-gray-900'>
                <b>Địa điểm lân cận</b>
              </p>
              <ul>
                {diadiemlancan
                  .filter((item) => {
                    return item.IsPopular == false;
                  })
                  .map((jitem) => (
                    <li
                      key={jitem.id}
                      className='py-2'>
                      <div className='flex felx-row justify-start items-center  cursor-pointer'>
                        <img
                          src={`/icon/${jitem.ImageIcon}`}
                          className='w-8 h-8 mr-2'
                        />
                        <p className='font-semibold'>{jitem.Name}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <div className='w-full lg:w-4/12 p-3'>
              <p className='text-xl text-gray-900'>
                <b>Phổ biến trong khu vực</b>
              </p>
              <ul>
                {diadiemlancan
                  .filter((item) => {
                    return item.IsPopular == true;
                  })
                  .map((jitem) => (
                    <li
                      key={jitem.id}
                      className='py-2'>
                      <div className='flex felx-row justify-start items-center  cursor-pointer'>
                        <img
                          src={`/icon/${jitem.ImageIcon}`}
                          className='w-8 h-8 mr-2'
                        />
                        <p className='font-semibold'>{jitem.Name}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className='w-4/12'></div>
            <div className='w-8/12 pb-2 flex flex-row'>
              <span>
                <svg
                  className='w-6 h-6 text-gray-800 dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
              </span>
              <span>
                Khoảng cách hiển thị dựa trên đường chim bay. Khoảng cách di
                chuyển thực tế có thể khác.
              </span>
            </div>
          </div>

          {/* thong tin khu vuc */}
          <div
            className='my-3 w-full lg:w-10/12 flex flex-col lg:flex-row flex-wrap
                     bg-slate-100 rounded-3xl'>
            <div className='w-full relative'>
              <Image
                alt='image'
                height={320}
                width={500}
                src={`${URL_Enum.BaseURL_Image}${
                  hotel.images &&
                  hotel.images.filter((item) => {
                    return item.TypeRoom == 'None;Ảnh bìa';
                  })[0]?.FileName
                }`}
                className='w-full h-[320px] rounded-3xl'
              />
              <div
                className='absolute bottom-0 w-full opacity-65 text-2xl font-bold text-white
                         bg-black py-5 pl-3 rounded-b-lg'>
                Khám phá thêm về {hotel.Name}
              </div>
            </div>

            <div
              className={`flex p-3 flex-col ${
                showDescript ? 'h-auto' : 'h-[180px] overflow-hidden'
              }`}>
              <p className='text-2xl text-gray-900'>
                <b>Vị trí</b>
              </p>
              <p className='text-lg'>{hotel.LocationDetail}</p>
              <p className='text-2xl text-gray-900'>
                <b>Thông tin về {hotel.Name}</b>
              </p>
              <p className='text-lg'>{hotel.Description}</p>
            </div>
            <button
              className='text-lg font-bold text-cyan-500
                        border border-1 border-cyan-500 round-sm px-1 flex flex-row m-3'
              onClick={() => {
                setShowDescript(!showDescript);
              }}>
              {showDescript ? 'Ẩn bớt' : 'Hiển thị thêm'}
              {showDescript ? (
                <span>
                  <svg
                    className='w-6 h-6 text-cyan-500 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m5 15 7-7 7 7'
                    />
                  </svg>
                </span>
              ) : (
                <span>
                  <svg
                    className='w-6 h-6 text-cyan-500 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m19 9-7 7-7-7'
                    />
                  </svg>
                </span>
              )}
            </button>
          </div>

          {/* tat ca tien ich*/}
          <div
            className='my-3 w-full lg:w-10/12 flex flex-col lg:flex-row flex-wrap
                     bg-slate-100 rounded-3xl p-3'
            id='TienIch'
            ref={targetElementRefs.TienIch}>
            <p className='text-xl text-gray-900'>
              <b>Tất cả tiện ích</b>
            </p>
            <div className='w-full flex flex-row flex-wrap'>
              {getListTypeImage()
                .slice(0, 5)
                .map((item) => (
                  <div
                    key={item.FirstImage}
                    className='w-1/2 lg:w-1/5 rounded-3xl p-2'>
                    <div
                      className='w-full relative cursor-pointer'
                      onClick={() => handleStateModalListImagesChange(true, 0)}>
                      <img
                        src={`${URL_Enum.BaseURL_Image}${item.FirstImage}`}
                        className='w-full h-[150px] rounded-3xl '
                      />
                      <p
                        className='z-1 absolute bottom-0 w-full opacity-80 text-white
                                bg-black p-2 text-center text-xl rounded-b-md'>
                        {item.TypeName}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            <div className='w-full flex flex-row flex-wrap'>
              <ul
                className='text-lg font-semibold text-gray-900 ml-5
                            grid grid-cols-2 gap-1 lg:grid-cols-3 w-full'>
                {hotel.convenients?.map((item) => (
                  <li key={item.id}>
                    <div className='w-full flex flex-col'>
                      <div className='flex flex-row w-full justify-start items-center'>
                        <img
                          src={`/icon/${item.ImageIcon}`}
                          className='w-8 h-8'
                        />
                        <p className='text-lg text-gray-900 font-bold'>
                          {item.Title}
                        </p>
                      </div>
                      <ul className='list-disc pl-5 font-normal'>
                        {item.Description?.map((jitem) => (
                          <li key={jitem}>{jitem}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* chinh sach thong tin */}
          <div
            className='my-3 w-full lg:w-10/12 flex flex-col lg:flex-row flex-wrap
                     bg-slate-100 rounded-3xl p-3'
            id='ChinhSach'
            ref={targetElementRefs.ChinhSach}>
            <div className='w-full lg:w-4/12 flex flex-row relative'>
              <p className='text-2xl text-gray-900 absolute m-3'>
                <b>Chính sách & Thông tin chung</b>
              </p>
              <img
                src='/background/ChinhSachVaThongTinChung.jpg'
                className='w-full h-[360px]'
              />
            </div>
            <div className='flex flex-row p-2 w-full lg:w-8/12'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  className='bi bi-clock-history'
                  viewBox='0 0 16 16'>
                  <path d='M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z' />
                  <path d='M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z' />
                  <path d='M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5' />
                </svg>
              </span>
              <div className='w-full'>
                <p className='text-2xl'>
                  <b>Thời gian nhận phòng/trả phòng</b>
                </p>
                <div className='flex flex-row w-full'>
                  <p className='text-xl text-gray-900 font-semibold'>
                    Giờ nhận phòng:
                    <b> Từ {hotel.TimeCheckIn}</b>
                  </p>
                  <p className='text-xl text-gray-900 font-semibold ml-5'>
                    Giờ trả phòng:
                    <b> Trước {hotel.TimeCheckOut}</b>
                  </p>
                </div>
                <hr />
                {hotel.policies && hotel.policies.length > 0 ? (
                  <ul>
                    {hotel.policies.map((item: any, index: number) => (
                      <li key={index}>
                        <div className='flex flex-row justify-start items-center'>
                          <img
                            src={`/icon/${item.ImageIcon}`}
                            className='w-8 h-8'
                          />
                          <p className='text-gray-900 text-lg font-bold'>
                            <b>{item.Name}</b>
                          </p>
                        </div>
                        <p className='text-gray-900 text-lg'>
                          {item.Description}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-gray-900 text-lg'>
                    Chính sách của khách sạn không có sẵn
                  </p>
                )}
                <p className='text-xl font-bold text-gray-900 mt-5'>
                  <b>Thông tin chung</b>
                </p>
                <div className='flex flex-row bg-slate-50 py-1 font-semibold overflow-hidden'>
                  <p className='w-4/12'>Tiện ích chung:</p>
                  <p className='w-8/12'>
                    {hotel.convenients
                      ?.slice(0, 4)
                      .map((item: any, index: number) => (
                        <span key={index}>{item.Description[0]}, </span>
                      ))}
                  </p>
                </div>

                <div className='flex flex-rowpy-1 font-semibold overflow-hidden py-1'>
                  <p className='w-4/12'>Thời gian nhận/trả phòng:</p>
                  <p className='w-8/12'>
                    {' '}
                    Từ {hotel.TimeCheckIn} - Trước {hotel.TimeCheckOut}
                  </p>
                </div>

                <div className='flex flex-rowpy-1 font-semibold bg-slate-50 overflow-hidden py-1'>
                  <p className='w-4/12'>Điểm đến phổ biến:</p>
                  <p className='w-8/12'>
                    {diadiemlancan
                      ?.filter((item) => {
                        return item.IsPopular == true;
                      })
                      .map((jitem) => (
                        <span key={jitem.id}>{jitem.Name}</span>
                      ))}
                  </p>
                </div>

                <div className='flex flex-rowpy-1 font-semibold  overflow-hidden py-1'>
                  <p className='w-4/12'>Bữa ăn sáng</p>
                  <p className='w-8/12'>Phụ thuộc vào phòng bạn chọn</p>
                </div>
              </div>
            </div>
          </div>
          {/* danh gia cua khach */}
          <RateHotel
            listRate={hotel.rates}
            avgRate={avgRate}
            avgRateText={avgRateText}
            targetElementRefTongQuan={targetElementRefs.DanhGia}
          />

          {/* final bay  */}
          <div className='my-3 w-full lg:w-10/12 flex flex-col lg:flex-row flex-wrap rounded-3xl h-[320px] items-end'>
            <div className='my-3 w-full flex flex-col lg:flex-row flex-wrap rounded-3xl relative h-[210px]'>
              <div className='w-full rounded-3xl bg-gradient-to-b from-sky-700 via-sky-500 to-blue-500 px-12 py-15'>
                <p className='text-4xl font-bold text-white'>
                  Bạn đã sẵn sàng quyết định chưa?
                </p>
                <button
                  className='px-3 py-4 text-2xl font-bold text-white
                            bg-orange-400 rounded-3xl my-3'
                  onClick={() => {
                    handleGoToElement('Phong');
                  }}>
                  Đặt phòng ngay thôi
                </button>
                <img
                  src={`${URL_Enum.BaseURL_Image}${
                    hotel.images.find((item) => {
                      return item.TypeRoom == 'None;Ảnh bìa';
                    })?.FileName
                  }`}
                  className='w-5/12 h-[290px] absolute bottom-3 right-8 rounded-3xl'
                />

                <img />
              </div>
            </div>
          </div>
          <div className='w-10/12 flex flex-col justify-center items-start bg-cyan-100 p-3 border-l-2 border-blue-400'>
            <div className='flex flex-row justify-center items-center mb-2'>
              <span>
                <svg
                  className='w-6 h-6 text-blue-500 dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    fill-rule='evenodd'
                    d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z'
                    clip-rule='evenodd'
                  />
                </svg>
              </span>
              <p className='text-2xl font-bold text-blue-500'>
                Miễn trừ trách nhiệm
              </p>
            </div>
            <p className='text-lg font-semibold text-gray-900'>
              <b>Miễn trừ trách nhiệm:</b>
              Khách sạn có trách nhiệm bảo đảm tính chính xác của tất cả các
              hình ảnh thể hiện. Hệ thống không chịu trách nhiệm đối với bất kỳ
              sai lệch nào về mặt hình ảnh.
            </p>
          </div>

          <div className='w-10/12 flex flex-col justify-center items-center my-12'>
            <p className='text-2xl font-semibold text-gray-900'>
              <b>Không tìm thấy những gì bạn cần?</b>
            </p>
            <button
              className='px-3 py-4 text-2xl font-bold text-white
                            bg-blue-400 rounded-3xl my-3'>
              Tìm cơ sở lưu trú khác tại {hotel.province?.DisplayName}
            </button>
          </div>

          {/* modal */}
          <ModalListImagesHotel
            listImages={hotel.images}
            modalState={modalListImagesState}
            currentImage={currentImageModal}
            setModalState={setModalListImagesState}
          />
          <RateShortModal
            rateItem={rateItem}
            rateShortModaState={rateShortModaState}
            setRateShortModaState={setRateShortModaState}
          />
        </main>
      ) : null}
    </>
  );
}
