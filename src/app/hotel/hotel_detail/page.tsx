'use client'
import URL_Enum from '@/axios/URL_Enum'
import DetailRoom from '@/components/shared/DetailRoom'
import SearchForm2 from '@/components/shared/form/SearchForm2'
import Star from '@/components/shared/star'
import axios from 'axios'
import React, { lazy, useEffect, useState } from 'react'

export default function HotelDetail() {
    const [hotel, setHotel] = useState<IHotel>();
    const [avgRate, setAvgRate] = useState<number>(0);
    const [avgRateText, setAvgRateText] = useState<'Chưa có đánh giá' | 'Trung bình' | 'Tốt' | 'Ấn tượng'>('Chưa có đánh giá');
    const arrHienThiGia = ['Mỗi phòng mỗi đêm (bao gồm thuế và phí)', 'Mỗi phòng mỗi đêm (chưa bao gồm thuế và phí)',
        'Tổng giá (bao gồm thuế và phí)', 'Tổng giá (chưa bao gồm thuế và phí)']
    const [hienThiGia, setHienThiGia] = useState<string>('Mỗi phòng mỗi đêm (bao gồm thuế và phí)');
    const [dsHienThiGiaState, setDsHienThiGiaState] = useState<boolean>(false);//mac dinh an danh sach 
    useEffect(() => {
        const fecthData = (url: string) => {
            axios.get(url).then((response) => {
                setHotel(response.data.result);
                console.log('hotel1', response.data.result);
                console.log('hotel', hotel);

                if (hotel != null && hotel.rates != null) {
                    var sumRate = 0;

                    hotel.rates?.map((item) => {
                        sumRate += item.Rating;
                    });
                    setAvgRate(sumRate / hotel.rates.length);
                    if (avgRate < 7)
                        setAvgRateText('Trung bình');
                    else if (avgRate < 8)
                        setAvgRateText('Tốt');
                    else
                        setAvgRateText('Ấn tượng');
                }

            }).catch((error) => { console.log(error) })
        }
        fecthData('http://127.0.0.1:8000/api/hotel/get-one-by-id?id=HT20240406094559');

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
    const getListImageByTypeRoomId = (typeRoomId: string): IHotelImage[] => {
        var listImage: IHotelImage[] = [];
        ;
        hotel?.images.map((item) => {
            console.log('id', item.TypeRoom);
            //listImage.push(item);
            if (item.TypeRoom?.split(';')[0] === typeRoomId) {
                listImage.push(item);
            }
        });
        return listImage;
    }
    return (
        hotel !== undefined ?
            <main className='mb-20 flex flex-col items-center justify-center'>
                <SearchForm2 />

                {/* tieu de */}
                <div className='w-10/12'>
                    <label className='text-start'>Hotel????</label>
                    <div className='w-full flex'>
                        <div className='w-9/12'>
                            <h1 className='text-3xl lg:text-[32px] text-gray-600'><b>{hotel?.Name}</b></h1>
                            <div className=' text-gray-600 flex w-full flex-row justify-start items-center'><b className=' text-[12px] w-[70px]'>Khách sạn:</b>
                                <span className=''><Star star={hotel.StarRate} color={'text-yellow-400'} size={'15px'} />
                                </span></div>
                            <div className='relative'>
                                <span className='absolute'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-700">
                                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <p className='pl-10 text-gray-600'>{hotel?.Address}
                                    <span className='text-lg font-semibold text-blue-700 mx-2 cursor-pointer'>Xem bản đồ</span></p>
                            </div>
                        </div>
                        <div className='w-3/12'>
                            <p className='text-right'><b>Giá/phòng/đêm từ</b></p>
                            <p className='text-right text-2xl lg:text-5xl text-red-600'><b>
                                {hotel.type_rooms[0]?.Price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </b></p>
                            <button className='rounded-lg bg-red-600 text-white font-bold
                        p-2 lg:p-5 w-full my-2'>Chọn phòng</button>
                        </div>
                    </div>
                </div>

                {/* hinh anh */}
                <div className='w-10/12 flex flex-col my-2 lg:flex-row'>
                    <div className='w-full lg:w-7/12 relative'>
                        <img loading='lazy' src={`${URL_Enum.BaseURL_Image}/${hotel?.images.find((image) => {
                            return image.TypeRoom === 'None;Ảnh bìa'
                        })?.FileName}`} className='w-full rounded-xl' />
                        <div className='absolute bottom-36 w-[12px] h-[12px] bg-gray-900 ml-[-5px] rotate-45
                    z-[-10] opacity-75 '></div>
                        <div className='absolute bottom-16 w-[8px] h-22 bg-gray-900 ml-[-8px]
                    z-[-10] opacity-75 '></div>
                        <div className='absolute bottom-16 w-5/12 h-22 bg-gray-900 flex justify-start items-center 
                    opacity-75  pl-3 rounded-e-full ml-[-8px]'>
                            <div className='rounded-full bg-gray-900 border-blue-700
                         w-15 h-15 flex justify-center items-center border-2 text-white'>
                                <div className='rounded-full bg-blue-700 w-12 h-12 flex justify-center items-center
                        text-white '>{avgRate}</div>
                            </div>
                            <div className='ml-3'>
                                <p className='text-white font-semibold'>{avgRateText}</p>
                                <p className='text-white font-semibold'>Đánh giá từ {hotel?.rates?.length} du khách →</p>
                            </div>

                        </div>
                    </div>
                    <div className='w-full lg:w-5/12 flex  flex-1'>

                        <div className='flex flex-wrap'>
                            {hotel?.images?.length > 6 ? hotel?.images?.slice(0, 6).map((item, index) => (
                                index != 5 ?
                                    item.FileName && item.TypeRoom != 'None;Ảnh bìa' ?
                                        <img loading='lazy' src={` ${URL_Enum.BaseURL_Image}/${item.FileName}`}
                                            className='w-1/2 rounded-lg h-[137px] p-1' />
                                        : null
                                    : <div className='w-1/2 scale-[0.95] hover:scale-100 rounded-lg h-[137px] relative'>
                                        <div className='w-full rounded-lg h-[137px] absolute z-1
                                     bg-black opacity-70 flex justify-center items-center'>
                                            <button className='font-bold text-white text-center'>Xem tất cả hình ảnh</button>
                                        </div>
                                        <img loading='lazy' src={` ${URL_Enum.BaseURL_Image}/${item.FileName}`}
                                            className='w-full rounded-lg  h-[137px]' />
                                    </div>
                            ))
                                : hotel?.images?.map((item, index) => (
                                    item.FileName && item.TypeRoom != 'None;Ảnh bìa' ?
                                        <img loading='lazy' src={` ${URL_Enum.BaseURL_Image}/${item.FileName}`}
                                            className='w-1/2 rounded-lg h-[137px] p-1' />
                                        : null))}
                        </div>
                    </div>
                </div>
                {/* modal danh sach hinh */}
                <div></div>

                {/* gioi thieu khach san */}
                <div className='w-10/12 flex flex-col lg:flex-row'>
                    <div className='w-full  my-5 lg:my-3 lg:w-4/12 flex bg-slate-100 rounded-lg p-3 flex-wrap'>
                        <p className='w-8/12 text-gray-950 font-bold'>Giới thiệu cơ sở lưu trú</p>
                        <span className='w-4/12  text-right font-bold text-blue-500 underline
                    cursor-pointer'>Xem thêm ⟩</span>
                        <p>{hotel?.Description.slice(0, 304)}</p>
                    </div>
                    <div className='w-full my-5 lg:my-3 lg:w-8/12 flex flex-col lg:flex-row lg:ml-2 rounded-lg'
                        style={{ backgroundImage: "url('/background/bg-map.jpg')" }}>
                        <div className='w-full lg:w-1/2 h-30'>
                            {/* them dia chi lan can */}
                        </div>
                    </div>
                </div>

                {/* tien ich va danh gia */}
                <div className='w-10/12 flex flex-col lg:flex-row'>
                    <div className='w-full  my-5 lg:my-3 lg:w-4/12 flex bg-slate-100 rounded-lg p-3 flex-wrap'>
                        <p className='w-8/12 text-gray-950 font-bold'>Tiện ích chính</p>
                        <span className='w-4/12  text-right font-bold text-blue-500 underline
                    cursor-pointer'>Xem thêm ⟩</span>
                        <ul>
                            {hotel?.convenients?.slice(0, 6).map((item) => (
                                <li className='font-semibold text-gray-900 my-2'><p className='flex 
                            justify-start items-center'>
                                    <span>
                                        <img loading='lazy' className='w-5 h-5 rounded-sm mr-3' src={`${URL_Enum.BaseURL_Image_Icon}${item.ImageIcon}`} />
                                    </span>{item.Description[0]}
                                </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='w-full flex-wrap my-5 lg:my-3 lg:w-8/12 flex flex-col lg:flex-row lg:ml-2 
                rounded-lg  bg-slate-100 p-3 '>
                        <p className='w-8/12 text-gray-950 font-bold'>Khách nói gì về kỳ nghỉ của họ</p>
                        <span className='w-4/12  text-right font-bold text-blue-500 underline
                    cursor-pointer'>Xem thêm ⟩</span>
                        <div className='w-full lg:w-1/2 h-30'>

                        </div>
                    </div>
                </div>

                {/* danh muc phong */}
                <div className='w-10/12 flex flex-col bg-cyan-200 p-3 rounded-lg'>
                    <p className='font-semibold text-xl'>Những phòng còn trống tại {hotel?.Name}</p>
                    <div className=' flex flex-row bg-blue-800 rounded-lg justify-start items-center pl-4
                py-4 my-3'>
                        <img src='/policy/TagPolicy.webp' className='w-12 h-12' />
                        <p className='text-lg text-white font-bold ml-2'>
                            Phải đặt phòng trong thời điểm không chắc chắn này?
                            Hãy chọn phòng có thể hủy miễn phí!</p>
                    </div>
                    {/* filter */}
                    <div className=' flex flex-col bg-white rounded-lg justify-start items-start pl-4
                py-4 my-3'>
                        <p className='text-lg text-left text-gray-900 font-bold my-3'>
                            Tìm kiếm nhanh hơn bằng cách chọn những tiện nghi bạn cần</p>
                        <div className='w-full flex flex-col lg:flex-row '>
                            <div className='w-full lg:w-3/12 my-2 flex justify-start items-center'>
                                <input id='MienPhiHuyPhong' type='checkbox' className='w-7 h-7' />
                                <label htmlFor='MienPhiHuyPhong' className='text-lg font-medium text-gray-900
                        cursor-pointer select-none ml-1'>
                                    Miễn phí hủy phòng</label>
                            </div>

                            <div className='w-full lg:w-3/12 my-2 flex justify-start items-center'>
                                <input id='MienPhiHuyPhong' type='checkbox' className='w-7 h-7' />
                                <label htmlFor='MienPhiHuyPhong' className='text-lg font-medium text-gray-900
                        cursor-pointer select-none ml-1'>
                                    Miễn phí hủy phòng</label>
                            </div>

                            <div className='w-full lg:w-3/12 my-2 flex justify-start items-center relative '>
                                <input id='GiuongLon' type='checkbox' className='w-7 h-7' />
                                <label htmlFor='GiuongLon' className='text-lg font-medium text-gray-900
                        cursor-pointer select-none ml-1 inline-block'>
                                    Giường lớn
                                </label>
                                <div className='group flex flex-row'>
                                    <span className='hover:scale-105 cursor-pointer '>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-700">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <div className='w-11/12 rounded-lg bg-slate-900 opacity-80
                            text-white font-medium p-1 absolute mt-[-70px] ml-[-50%] invisible 
                            group-hover:visible'>
                                        <p>Giướng lớn có thể bao gồm: giường đôi/queen/king. Phù hợp cho 2 người lớn.</p>
                                        <div className='w-[6px] h-[6px] rotate-45  bg-slate-900 opacity-85
                                    ml-[55%] absolute'></div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full lg:w-3/12 my-2 flex flex-col justify-start items-start relative'>
                                <p className='text-lg font-medium text-gray-900'>Hiển thị giá</p>
                                <p className='text-lg font-bold text-cyan-600 flex flex-row cursor-pointer select-none'
                                    onClick={() => { setDsHienThiGiaState(!dsHienThiGiaState); }}>
                                    {hienThiGia.length > 25 ? hienThiGia.slice(0, 25) + '...' : hienThiGia}
                                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                    </svg>
                                    </span>
                                </p>
                                <div className={`bg-white shadow-1 shadow-gray-500 p-3 rounded-md absolute
                            top-[50px] ${dsHienThiGiaState ? 'block' : 'hidden'}`}>
                                    {arrHienThiGia.map((item) => (
                                        <p className={`text-lg font-bold ${item === hienThiGia ? 'text-cyan-600'
                                            : 'text-gray-900'} my-2 cursor-pointer select-none`}
                                            onClick={() => {
                                                setHienThiGia(item);
                                                setDsHienThiGiaState(!dsHienThiGiaState);
                                            }}>
                                            {item}</p>))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* typeroom danh sach phong */}
                    {hotel?.type_rooms?.map((item) => (item.id !== undefined ?
                        <DetailRoom key={item.id} typeRoom={item}
                            listImage={getListImageByTypeRoomId(item.id)}
                            listConvenient={hotel.convenients} /> : null))}
                </div>
                <div className='w-10/12 flex justify-end items-end'>

                    <div className='flex relative justify-start items-center h-26 bg-blue-400 w-11/12
             my-10 rounded-lg'>
                        <img src='/background/taiappbg.webp' className='h-full absolute  ml-16 left-[-90px]' />
                        <img src='/background/taiapp.webp' className='h-full absolute scale-125 left-[-90px]' />
                        <div className='z-9 flex flex-col pl-10'>
                            <p className='text-white text-2xl'><b>Bạn có thể đặt được phòng với giá tốt hơn đấy!</b></p>
                            <p className='text-white text-lg font-semibold'>Những người dùng khác luôn tìm được phòng với giá thấp hơn khi đặt trên app
                                của chúng tôi. Bạn cũng tải app ngay nhé!</p>
                        </div>
                        <button className='text-cyan-400 bg-white text-xl font-bold
                    p-2 rounded-lg absolute right-4'>Tải app</button>
                    </div>


                </div>
            </main> : null
    )
}
