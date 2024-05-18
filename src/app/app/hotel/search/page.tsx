'use client'
import URL_Enum from "@/axios/URL_Enum";
import Star from "@/components/shared/Star";
import SearchForm3 from "@/components/shared/form/SearchForm3";
import { getHotelsByProvinceId, searchListHotelWithParam } from "@/service/hotel.service";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const todoGetAVGRate = (listRateHotel: IRate[] | undefined): string => {
    if (listRateHotel == undefined)
        return '0';
    if (listRateHotel.length <= 0)
        return '0';
    var avg = 0;
    listRateHotel.map((item) => {
        avg += item.Rating;
    });
    return (avg / listRateHotel.length).toFixed(1);
}
const SearchPage = () => {
    const searchParams = useSearchParams();
    const [maxPriceSearch, setMaxPriceSearch] = useState<number>(0);
    const [showFillterStar, setShowFillterStar] = useState<boolean>(true);
    const [showFillterConvenient, setShowFillterConvenient] = useState<boolean>(true);
    const [showFillterHotelCate, setShowFillterHotelCate] = useState<boolean>(true);
    const [listHotelSearch, setListHotelSearch] = useState<IHotel[]>([]);

    useEffect(() => {
        var p_province, p_totalnight, p_totalmember, p_totalmemberchild, p_totalroom, p_timereceive, p_provinceid;
        p_province = p_totalnight = p_totalmember = p_totalmemberchild = p_timereceive = p_totalroom = p_provinceid = '';
        if (searchParams.get('province'))
            p_province = searchParams.get('province');
        if (searchParams.get('totalnight'))
            p_totalnight = searchParams.get('totalnight');
        if (searchParams.get('totalmember'))
            p_totalmember = searchParams.get('totalmember');
        if (searchParams.get('totalmemberchild'))
            p_totalmemberchild = searchParams.get('totalmemberchild');
        if (searchParams.get('timereceive'))
            p_timereceive = searchParams.get('timereceive');
        if (searchParams.get('totalroom'))
            p_totalroom = searchParams.get('totalroom');

        if (searchParams.get('provinceid')) {
            p_provinceid = searchParams.get('provinceid');
            getHotelsByProvinceId(p_provinceid ?? '').then((response) => {
                setListHotelSearch(response.result);
            });

        }
        else {
            searchListHotelWithParam(p_province ?? '', p_totalnight ?? '', p_totalmember ?? '',
                p_totalmemberchild ?? '', p_timereceive ?? '', p_totalroom ?? '').then((response) => {
                    console.log('listhotel', response);
                    setListHotelSearch(response.result);
                });
        }

        //, p_totalnight, p_totalmember, p_totalmemberchild, p_totalroom, p_provinceid
        console.log('param', p_province)
    }, []);
    const arrConvenient = [
        'WiFi', 'Hồ bơi', 'Chỗ đậu xe', 'Nhà hàng', 'Lễ tân 24h', 'Thang máy', 'Lối dành cho xe lăn'
        , 'Trung tâm thể dục', 'Phòng họp', 'Đưa đón sân bay'];
    const arrHotelCate = ['Nhà nghỉ Homestay', 'Khách sạn', 'Nhà nghỉ', 'Khác'];
    return (
        <main className="mb-[40px]  bg-slate-100">
            <SearchForm3 />
            <div className="flex flex-row">
                <div className="w-3/12 flex px-3 py-1 flex-col">
                    <div className="flex w-full relative rounded-lg">
                        <img src="/background/bg20240514.webp" className="w-full rounded-lg " />
                        <div className="flex flex-col w-full h-full justify-center items-start
                    text-white absolute z-1 ml-3 cursor-pointer text-lg">
                            <p><b>Tại sao phải đặt giá cao</b> </p>
                            <p className="my-1"><b>Trong khi có giá thấp hơn</b></p>
                            <p>Tải app để nhận nhiều ưu đãi</p>
                        </div>
                    </div>
                    <div className="flex flex-col text-gray-800 bg-white my-2 rounded-lg p-2">
                        <p><b>Phạm vi giá</b></p>
                        <p>1 phòng, 1 đêm</p>
                        <div className="flex flex-row w-full">
                            <div className="w-5/12 px-2 py-2 rounded-lg border border-gray-400 text-center">VND 0</div>
                            <div className="w-2/12 flex justify-center items-center">
                                <div className="w-full h-[1px] bg-gray-400 mt-"></div></div>
                            <div className="w-5/12 px-2 py-2 rounded-lg border border-gray-400 text-center">VND {maxPriceSearch.toLocaleString()}</div>
                        </div>
                        <input type="range" defaultValue={0} max={100000000} onChange={(event) => {
                            setMaxPriceSearch(Number.parseFloat(event.target.value));
                        }} className="my-2" />
                    </div>
                    {/* hang sao */}
                    <div className="flex flex-col text-gray-800 bg-white my-2 rounded-lg p-2">
                        <div className="flex flex-row w-full">
                            <p className="w-9/12"><b>Phạm vi giá</b></p>
                            <span className="w-3/12 flex justify-end cursor-pointer"
                                onClick={() => { setShowFillterStar(!showFillterStar) }}>
                                {showFillterStar ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down text-blue-500 font-bold" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up  text-blue-500 font-bold" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                    </svg>}
                            </span>
                        </div>
                        <div className={`flex flex-col w-full ${showFillterStar ? 'block' : 'hidden'}`}>
                            <div className="flex flex-row w-full items-center">
                                <input type="checkbox" className="w-[20px] h-[20px]" name="cb1s" defaultChecked />
                                <span><Star color="text-yellow-500" size="5" star={1} /></span>
                            </div>

                            <div className="flex flex-row w-full items-center">
                                <input type="checkbox" className="w-[20px] h-[20px]" name="cb2s" defaultChecked />
                                <span><Star color="text-yellow-500" size="5" star={2} /></span>
                            </div>

                            <div className="flex flex-row w-full items-center">
                                <input type="checkbox" className="w-[20px] h-[20px]" name="cb3s" defaultChecked />
                                <span><Star color="text-yellow-500" size="5" star={3} /></span>
                            </div>

                            <div className="flex flex-row w-full items-center">
                                <input type="checkbox" className="w-[20px] h-[20px]" name="cb4s" defaultChecked />
                                <span><Star color="text-yellow-500" size="5" star={4} /></span>
                            </div>

                            <div className="flex flex-row w-full items-center">
                                <input type="checkbox" className="w-[20px] h-[20px]" name="cb5s" defaultChecked />
                                <span><Star color="text-yellow-500" size="5" star={5} /></span>
                            </div>
                        </div>
                    </div>

                    {/* tien nghi */}
                    <div className="flex flex-col text-gray-800 bg-white my-2 rounded-lg p-2">
                        <div className="flex flex-row w-full">
                            <p className="w-9/12"><b>Tiện nghi</b></p>
                            <span className="w-3/12 flex justify-end cursor-pointer"
                                onClick={() => { setShowFillterConvenient(!showFillterConvenient) }}>
                                {showFillterStar ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down text-blue-500 font-bold" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up  text-blue-500 font-bold" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                    </svg>}
                            </span>
                        </div>
                        <div className={`flex flex-col w-full ${showFillterConvenient ? 'block' : 'hidden'}`}>
                            {
                                arrConvenient.map((item, index) => (
                                    <div className="flex flex-row w-full items-center my-1">
                                        <input type="checkbox" className="w-[20px] h-[20px]" name={`cb${index + 1}Convenient`} defaultChecked />
                                        <span className="ml-1">{item}</span>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/*loai hinh luu tru */}
                    <div className="flex flex-col text-gray-800 bg-white my-2 rounded-lg p-2">
                        <div className="flex flex-row w-full">
                            <p className="w-9/12"><b>Loại hình lưu trú</b></p>
                            <span className="w-3/12 flex justify-end cursor-pointer"
                                onClick={() => { setShowFillterHotelCate(!showFillterHotelCate) }}>
                                {showFillterStar ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down text-blue-500 font-bold" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up  text-blue-500 font-bold" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                    </svg>}
                            </span>
                        </div>
                        <div className={`flex flex-col w-full ${showFillterHotelCate ? 'block' : 'hidden'}`}>
                            {
                                arrHotelCate.map((item, index) => (
                                    <div className="flex flex-row w-full items-center my-1">
                                        <input type="checkbox" className="w-[20px] h-[20px]" name={`cb${index + 1}HotelCate`} defaultChecked />
                                        <span className="ml-1">{item}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="w-9/12 flex flex-col text-gray-800 p-2">
                    <p className="text-white text-[15px] bg-blue-900 w-full h-[35px] py-2 my-1 pl-1 rounded-md
                    mr-2 flex flex-row">Sao phải trả nhiều hơn khi luôn có giá rẻ hơn trên App -
                        Click dấu "?" bên phải để tải ngay ứng dụng Traveloka và đặt khách sạn rẻ hơn!
                        <span >
                            <div className="w-[20px] h-[20px] rounded-full bg-white text-blue-900
                        ml-2 flex justify-center items-center font-bold cursor-pointer">?</div></span></p>
                    {
                        listHotelSearch !== undefined && Array.isArray(listHotelSearch) && listHotelSearch.length > 0 ?
                            listHotelSearch.map((item) => (
                                <Link href={`/app/hotel/hotel_detail?id=${item.id}`}>
                                    <div className="w-10/12 mx-1 p-2 flex flex-row rounded-lg border border-gray-300
                            bg-white hover:shadow-2 hover:shadow-blue-600 cursor-pointer my-1">
                                        <div className="w-5/12 flex flex-col ">
                                            <img src={`${URL_Enum.BaseURL_Image}${item.images.find((fItem) => {
                                                return fItem.HotelId == item.id;
                                            })?.FileName}`} className="w-full h-[150px] p-1 rounded-t-lg" />
                                            <div className="w-full flex flex-row">
                                                {item.images.filter((fItem) => {
                                                    return fItem.TypeRoom !== 'None;Ảnh bìa';
                                                }).map((mItem) => (
                                                    <img src={`${URL_Enum.BaseURL_Image}${mItem.FileName}`}
                                                        className="w-4/12 h-[60px] p-1" />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-7/12 flex flex-col rounded-lg">
                                            <div className="w-full flex flex-row">
                                                <p className="text-2xl text-gray-800 w-8/12">
                                                    <b>{item.Name.length > 90 ? item.Name.slice(0, 90) + '...' : item.Name}</b></p>
                                                <p className="flex flex-row justify-end items-start w-4/12 font-semibold"><img src="/icon/5285ed4483dbe0a200497d4c3de31128.webp" className="w-8 h-8" />
                                                    <span>{todoGetAVGRate(item.rates)}
                                                        <span className="text-[9px]">({item.rates?.length} đánh giá)</span></span></p>
                                            </div>
                                            <span className="text-blue-600 font-semibold flex flex-row items-end"><span><img src="/icon/iconhotel.webp" className="w-8 h-8" /></span>
                                                {item.Type}  <Star color="text-yellow-500" size="5" star={item.StarRate} /></span>
                                            <p className="w-full flex flex-row justify-start items-center font-semibold text-gray-900 text-lg">
                                                <span><img src="/icon/location.webp" className="w-5 h-5" /></span>
                                                <span className="ml-1">{item.Address}</span></p>

                                            <div>
                                                <ul className="flex flex-row my-1">
                                                    {item.convenients?.slice(0, 3).map((citem) => (
                                                        <li className="p-1 rounded-lg border border-gray-900 mx-2
                                                cursor-pointer">{citem.Title}</li>
                                                    ))}
                                                    {<li className="p-1 rounded-full border border-gray-900 mx-2
                                                cursor-pointer">{item.convenients != undefined &&
                                                            item.convenients?.length > 3 ? item.convenients?.length - 3 + '+' : null}</li>}
                                                </ul>
                                            </div>
                                            <p>{item.LocationDetail.length > 120 ?
                                                item.LocationDetail.slice(0, 120) + '...' : item.LocationDetail}</p>

                                            <div className="w-full h-full flex flex-col justify-end items-end">
                                                <span className="text-xl">Giá chỉ từ:
                                                    <span className="font-bold text-red-500 ml-1">{item.type_rooms != undefined ? item.type_rooms[0].Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Đang cập nhật'}</span>
                                                </span>
                                                <Link href={`/app/hotel/hotel_detail?id=${item.id}`}
                                                    className="p-2 bg-red-500 text-white font-bold text-lg rounded-lg
                                                hover:scale-105">Chọn phòng</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            : <p>Không tìm thấy kết quả phù hợp!!!</p>}
                </div>
            </div>

        </main>
    );
}
export default SearchPage;