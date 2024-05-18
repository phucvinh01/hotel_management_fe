'use client'

import LocalStoreEnum from "@/axios/LocalStoreEnum";
import URL_Enum from "@/axios/URL_Enum";
import Loading from "@/components/shared/Loading";
import { useAuth } from "@/hooks/useAuthContext";
import CalculateTotalDay from "@/service/CalculateTotalDay";
import FormatDateDDD from "@/service/FormatDateDDD";
import FormatDate from "@/service/FormatDateString";
import FormatStringToDate from "@/service/FormatStringToDate";
import GenerateId from "@/service/generateId";
import { getAvartaHotelByIdHotel } from "@/service/images.service";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";

const todoGetPriceDiscoun = (price: number, discount: number): number => {
    return price - price * discount / 100;
}
const todoSubstractDate = (dateInput: Date, totalDaySubstract: number): string => {
    const dateInput_ = FormatDate(dateInput);
    if (dateInput_ != null) {
        const currentDate = new Date(Number.parseInt(dateInput_.split('/')[2])
            , Number.parseInt(dateInput_.split('/')[1]), Number.parseInt(dateInput_.split('/')[0]));
        currentDate.setDate(currentDate.getDate() - totalDaySubstract);
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth()).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    return '';

}
interface IProps {
    roomId: string;
    QuantityMember: string;
    QuantityRoom: number;
}
const Booking = () => {
    const TotalRoom = (typeof localStorage !== 'undefined') ? localStorage.getItem(LocalStoreEnum.TOTAL_ROOM) : 1;
    console.log('TotalRoom', TotalRoom);
    const { user, logout } = useAuth();
    const route = useRouter();
    const searchParams = useSearchParams();
    const [modalChinhSachDoiHuyState, setModalChinhSachDoiHuyState] = useState<boolean>(false);
    // const { room_id } = router.query;
    //const { roomId, QuantityMember, QuantityRoom } = props;
    const [room, setRoom] = useState<IRoom>();
    const [modalErr, setModalErr] = useState<boolean>(false);
    const [modalErrValue, setModalErrValue] = useState<string>('');

    const [userGuest, setUserGuest] = useState<IGuest>();
    const [loadingBookingState, setLoadingBookingState] = useState<boolean>(true);
    const [stepState, setStepState] = useState<1 | 2 | 3>(1);
    const [avartaHotel, setAvartaHotel] = useState<IHotelImage>();

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalDay, setTotalDay] = useState<number>(0);

    const [listMember, setListMember] = useState<IMemberBooking[]>([]);

    const [memberName, setMemberName] = useState<string>('')
    const [memberBirth, setMemberBirth] = useState<string | null>(null);
    const [memberGender, setMemberGender] = useState<boolean>(true);


    const IdBooking = GenerateId("bookinghotel");

    useEffect(() => {
        console.log('user', user);
        const fetchUser = (url: string) => {
            setLoadingBookingState(true);
            axios.get(url).then((response) => {
                console.log('room', response.data.result);
                if (response.data.result === 'NOT_FOUND') { setModalErr(false); }
                else {
                    setUserGuest(response.data.result);
                }
                setUserGuest(response.data.result);
            }).catch((err) => { console.log(err); })
                .finally(() => { setLoadingBookingState(false); })
        }
        fetchUser(URL_Enum.BaseURL_Api + 'guest/get-one-by-email?email=' + user?.email);

    }, []);
    useEffect(() => {
        if (searchParams.get('room_id') == null
            || searchParams.get('room_id') == ''
            || searchParams.get('room_id') == undefined)
            route.push('hotel_detail');
        console.log('param', searchParams.get('room_id'));
        const fetchData = (url: string) => {
            setLoadingBookingState(true);
            axios.get(url).then((response) => {
                console.log('room', response.data.result);
                if (response.data.result === 'NOT_FOUND') { setModalErr(false); }
                else {
                    setRoom(response.data.result);
                    setTotalDay(CalculateTotalDay(new Date(response.data.result.TimeRecive),
                        new Date(response.data.result.TimeLeave)));
                    setTotalPrice((CalculateTotalDay(new Date(response.data.result.TimeRecive),
                        new Date(response.data.result.TimeLeave)) * (response.data.result.typeroom.Price
                            - response.data.result.typeroom.Price * response.data.result.Discount / 100
                        )) * Number.parseInt(TotalRoom != null ? TotalRoom : '1'));
                }

                //search avarta hotel
                getAvartaHotelByIdHotel(response.data.result.typeroom.HotelId)
                    .then((subResponse) => {
                        if (subResponse != false) {
                            setAvartaHotel(subResponse);
                        }
                        console.log('response.data.result', subResponse)
                    });

            }).catch((err) => { console.log(err); setModalErr(false) })
                .finally(() => {
                    setLoadingBookingState(false);
                    console.log('loading state', loadingBookingState);
                });
        };
        fetchData(URL_Enum.BaseURL_Api + 'room/get-one-by-id?id=' + searchParams.get('room_id'));

    }, []);


    const handleAddMember = (event?: Event) => {
        if (event) { event.preventDefault(); }
        if (memberName == undefined || memberName == '') {
            setModalErrValue('Họ tên thành viên không được để trống');
            setModalErr(true);
        }
        else {
            const member: IMemberBooking = {
                id: GenerateId('memberbookhotel'), BookHotelId: IdBooking,
                FullName: memberName, DateOfBirth: FormatStringToDate(memberBirth ?? '', '-', 'YMD'), Sex: memberGender,
                created_at: null, updated_at: null
            }
            setListMember([...listMember, member]);
        }
        console.log('ddddd', memberBirth)
    }

    return (
        <main className="w-full h-full flex justify-center items-center bg-slate-50">
            {/* <Loading modalState={loadingBookingState} /> */}
            {room != undefined ? <div className="mb-8 w-full flex flex-col justify-center
             items-center">
                <div className="w-full flex flex-row h-22 bg-slate-300 justify-center items-center">
                    <div className="w-4/12">
                        <p>Traveloka</p>

                    </div>
                    <div className="w-8/12 flex flex-row items-center justify-end font-semibold mr-5">
                        <p className={`w-7 h-7 rounded-full flex justify-center items-center mx-2
                        ${stepState === 1 ? 'bg-blue-500 text-slate-50' : 'bg-gray-100'}`}
                        >1</p>
                        <p className={`h-10 rounded-full flex justify-center items-center
                        ${stepState === 1 ? 'text-blue-500 ' : 'text-gray-900'}`}
                        >Đặt</p>
                        <p className={`w-7 h-7 rounded-full flex justify-center items-center mx-2
                        ${stepState === 2 ? 'bg-blue-500  text-slate-50' : 'bg-gray-100'}`}
                        >2</p>
                        <p className={`h-10 rounded-full flex justify-center items-center
                        ${stepState === 2 ? 'text-blue-500' : 'text-gray-900'}`}
                        >Thanh toán</p>
                        <p className={`w-7 h-7 rounded-full flex justify-center items-center mx-2
                        ${stepState === 3 ? 'bg-blue-500  text-slate-50' : 'bg-gray-100'}`}
                        >3</p>
                        <p className={`h-10 rounded-full flex justify-center items-center
                        ${stepState === 3 ? 'text-blue-500' : 'text-gray-900'}`}
                        >Gửi phiếu xác nhận</p>
                    </div>
                </div>
                <div className="w-full bg-slate-200 flex justify-center items-center">
                    <div className="w-10/12">
                        <p className="text-2xl my-3"><b>Đặt phòng của bạn</b></p>
                        <p className="text-gray-500 font-semibold text-lg">Hãy đảm bảo tất cả thông tin chi tiết trên trang này đã chính
                            xác trước khi tiến hành thanh toán.</p>
                        <div className="w-full flex flex-row">
                            <div className="w-7/12 p-3">
                                <div className="w-full flex flex-row justify-center items-center">
                                    <img src={URL_Enum.BaseURL_Avarta + userGuest?.Avarta} className="w-20 h-20 rounded-full" />
                                    <p className="text-lg">Đăng nhập với tên <span><b>{userGuest?.Name}</b></span></p>
                                </div>

                                <form className="w-full flex flex-row justify-start items-start
                                p-3 bg-white rounded-lg flex-wrap">
                                    <p className="w-full text-xl font-semibold text-gray-900">Thông tin người đặt</p>
                                    <div className="w-1/2 flex flex-col pr-2">
                                        <div className="w-full flex justify-start items-center text-lg my-2">
                                            <span className="w-4/12 flex flex-row ">Họ và tên <span className="text-danger">*</span>:</span>
                                            <input type="text" name="hoten" value={userGuest?.Name} readOnly
                                                className="w-8/12 h-[22px] outline outline-cyan-400 px-2 rounded-md mx-1
                                                cursor-not-allowed text-lg " id="hoten" />
                                        </div>

                                        <div className="w-full flex justify-start items-center text-lg my-2">
                                            <span className="w-4/12 flex flex-row">Số điện thoại <span className="text-danger">*</span>:</span>
                                            <input type="text" name="hoten" value={userGuest?.TelephoneContact} readOnly
                                                className="w-8/12 h-[22px] outline outline-cyan-400 px-2 rounded-md mx-1
                                                cursor-not-allowed text-lg" id="hoten" />
                                        </div>
                                    </div>

                                    <div className="w-1/2 flex flex-col pl-2">
                                        <div className="w-full flex justify-start items-center text-lg my-2">
                                            <span className="w-4/12 flex flex-row ">Email <span className="text-danger">*</span>:</span>
                                            <input type="email" name="hoten" value={userGuest?.EmailContact} readOnly
                                                className="w-8/12 h-[22px] outline outline-cyan-400 px-2 rounded-md mx-1
                                                cursor-not-allowed text-lg " id="hoten" />
                                        </div>

                                        <div className="w-full flex justify-start items-center text-lg my-2">
                                            <span className="w-4/12 flex flex-row">Ghi chú:</span>
                                            <input type="text" name="hoten" placeholder="Thêm ghi chú..."
                                                className="w-8/12 h-[22px] outline outline-cyan-400 px-2 rounded-md mx-1
                                                cursor-pointer text-lg" id="hoten" />
                                        </div>


                                    </div>
                                    <p className="w-full text-xl font-semibold text-gray-900">Thêm người đi cùng</p>
                                    <div className="flex w-full flex-row flex-wrap">
                                        <div className="w-4/12 flex flex-col justify-start items-start text-lg my-2 px-2">
                                            <span className="w-full flex flex-row ">Họ tên <span className="text-danger">*</span>:</span>
                                            <input type="text" name="subhoten" placeholder="Nhập họ tên người đi cùng.."
                                                className="w-full h-[22px] outline outline-cyan-400 px-2 rounded-md mx-1
                                                cursor-pointer text-lg "
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setMemberName(event.target.value);
                                                }} />
                                        </div>

                                        <div className="w-4/12 flex flex-col justify-start items-start text-lg my-2 px-2">
                                            <span className="w-full flex flex-row ">Ngày sinh:</span>
                                            <input type="date" name="subhoten" placeholder="Nhập họ tên người đi cùng.."
                                                className="w-full h-[22px] outline outline-cyan-400 px-2 rounded-md mx-1
                                                cursor-pointer text-lg "
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setMemberBirth(event.target.value);
                                                }} />
                                        </div>

                                        <div className="w-4/12 flex flex-col justify-start items-start text-lg my-2 px-2">
                                            <span className="w-full flex flex-row ">Giới tính <span className="text-danger">*</span>:</span>
                                            <div className="flex flex-row">
                                                <input type="radio" id="raNam" name="memberGender" value="1"
                                                    checked={memberGender == true} className="w-12"
                                                    onChange={() => {
                                                        setMemberGender(false);
                                                    }} />
                                                <label htmlFor="raNam" className="ml-1">Nam</label>
                                                <input type="radio" id="raNu" name="memberGender" value="0"
                                                    checked={memberGender == false} className="w-12 ml-4"
                                                    onChange={() => {
                                                        setMemberGender(false);
                                                    }} />
                                                <label htmlFor="raNu" className="ml-1">Nữ</label>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-end items-end text-lg my-2 ">
                                            <button className="w-4/12 py-1 bg-blue-500 rounded-lg text-white font-bold"
                                                onClick={() => { handleAddMember(event) }}>Thêm</button>
                                        </div>
                                        <p className="w-full text-xl font-semibold text-gray-900">Danh sách người đi cùng</p>
                                        <div className="w-full flex justify-start items-end text-lg my-2 ">
                                            {listMember != undefined && listMember.length > 0
                                                ? <table className="w-full table-auto order-collapse border border-green-800">
                                                    <thead className="bg-green-100">
                                                        <th className="border border-green-600 w-1/12">STT</th>
                                                        <th className="border border-green-600 w-4/12">Họ tên</th>
                                                        <th className="border border-green-600 w-4/12">Ngày sinh</th>
                                                        <th className="border border-green-600 w-2/12">Giới tính</th>
                                                        <th className="border border-green-600 w-1/12"></th>
                                                    </thead>
                                                    <tbody>
                                                        {listMember.map((item, index) => (
                                                            <tr className="hover:bg-green-100">
                                                                <td className="px-1 border border-green-600 w-1/12">{index}</td>
                                                                <td className="px-1 border border-green-600 w-4/12">{item.FullName}</td>
                                                                <td className="px-1 border border-green-600 w-4/12">{FormatDate(item.DateOfBirth)?.split(' ')[0]}</td>
                                                                <td className="px-1 border border-green-600 w-2/12">{item.Sex ? 'Nam' : 'Nữ'}</td>
                                                                <td className="border border-green-600 w-1/12 pl-[15px]">
                                                                    <span className="cursor-pointer" onClick={() => {
                                                                        setListMember(listMember =>
                                                                            listMember.filter((fitem, findex) => { return findex != index }))
                                                                    }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square-fill text-danger hover:scale-105" viewBox="0 0 16 16">
                                                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                                                                        </svg>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table> : <p>Chưa có người ở cùng, hãy thêm nếu bạn có người đi cùng.</p>}

                                        </div>

                                        {/* git code */}
                                        <div className="w-full flex flex-row justify-center items-center text-lg my-2 
                                        bg-cyan-100 py-3 px-2 rounded-lg">
                                            <div className="w-4/12 flex flex-col"><p className="w-full flex flex-row mx-1 text-lg ">Nhập mã giảm giá</p>
                                                <span className="w-full flex flex-row mx-1 font-semibold text-danger text-xs">Nhập mã giảm giá nếu có</span></div>
                                            <input type="text" id="gitCode" name="gitCode"
                                                className="w-8/12 h-[22px] outline outline-cyan-400 px-2 rounded-md mx-1
                                                      cursor-pointer text-lg "
                                                placeholder="Nhập mã giảm giá" />

                                        </div>

                                        {/* gia */}
                                        <div className="w-full flex flex-row justify-start items-start text-lg my-2 
                                        bg-cyan-100 py-3 px-2 rounded-lg flex-wrap">
                                            <p className="w-full text-xl font-bold text-gray-900 underline">Chi tiết giá</p>
                                            <span className="w-full flex flex-row mx-1 font-semibold text-cyan-500 text-sm">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill text-cyan-500" viewBox="0 0 16 16">
                                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                                    </svg>
                                                </span>
                                                Thuế và phí là các khoản được chúng tôi chuyển trả cho khách sạn. Mọi thắc mắc về thuế và hóa đơn, vui lòng tham khảo Điều khoản và Điều kiện của chúng tôi để được giải đáp
                                            </span>

                                            {/* gia phong */}
                                            <div className="w-1/2 flex flex-col">
                                                <p className="font-semibold mr-1 text-lg text-gray-800 ">Giá phòng</p>
                                                <p>
                                                    <span className="font-semibold mr-1 text-lg text-gray-800 ">
                                                        (x{TotalRoom} Phòng)
                                                    </span>
                                                    <span className="font-semibold mr-1 text-lg text-gray-800 ">
                                                        {room.typeroom?.Name}, (x{totalDay}Đêm)
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="w-1/2 flex flex-col">
                                                <p className="font-semibold mr-1 text-lg text-transparent ">_</p>
                                                <p>
                                                    <span className="font-semibold mr-1 text-lg text-gray-800 ">
                                                        {room.typeroom?.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                        (x{totalDay})
                                                        = {((room.typeroom?.Price ?? 0) * totalDay * Number.parseInt(TotalRoom ?? '1')).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </span>
                                                </p>
                                            </div>

                                            {/* thue vat */}
                                            {room.Bao_Gom_Thue_Va_Phi ? <span className="w-full font-semibold mr-1 text-lg text-red-500 ">
                                                Đã bao gồm thuế VAT(8%)
                                            </span> :
                                                <div className="w-full flex flex-row my-2">
                                                    <p className="w-1/2 font-semibold mr-1 text-lg text-gray-800 ">Giá chưa bao gồm VAT, bạn phải trả thêm:
                                                        <br /><label className="text-sm text-danger">VAT = 8% giá trị phiếu đặt</label></p>
                                                    <p className="w-1/2 font-semibold mr-1 text-lg text-gray-800 ">
                                                        {(totalPrice * 8 / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </p>
                                                </div>}

                                            {/* gia phong co khuyen mai */}
                                            {room.Discount > 0 ?
                                                <><div className="w-1/2 flex flex-col my-2">
                                                    <p className="font-semibold mr-1 text-lg text-gray-800 ">Giá phòng sau giảm giá</p>
                                                    <span className="font-semibold mr-1 text-lg text-red-500 ">
                                                        Phòng được giảm: {room.Discount}%
                                                    </span>
                                                </div>
                                                    <div className="w-1/2 flex flex-col my-2">
                                                        <p>
                                                            <span className="font-bold mr-1 text-2xl text-red-500 ">
                                                                = {(totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </span>
                                                        </p>
                                                    </div></>
                                                : null}

                                            {/* gia phong phai tra */}
                                            <div className="w-1/2 flex flex-col">
                                                <p className="font-semibold mr-1 text-lg text-gray-800 ">Giá phòng phải thanh toán</p>
                                            </div>
                                            <div className="w-1/2 flex flex-col">
                                                <span className="font-bold mr-1 text-2xl text-red-500 ">
                                                    = {room.Bao_Gom_Thue_Va_Phi ?
                                                        totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                        : (totalPrice + (totalPrice * 8 / 100)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </span>
                                            </div>

                                            {/* and form dat */}
                                            <p className="font-bold mr-1 text-lg w-full flex flex-row justify-center items-center my-2 text-cyan-500 ">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history text-cyan-600" viewBox="0 0 16 16">
                                                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                                                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                                                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                                                    </svg>
                                                </span>
                                                Hãy giữ phòng này ngay trước khi nó tăng cao hơn!</p>

                                            <button className="w-full bg-orange-500 p-2 text-white font-bold rounded-lg">Tiếp tục thanh toán</button>

                                            <p className="font-semibold mr-1 text-sm my-2 text-cyan-500 text-center ">
                                                <span>Bằng việc tiếp tục thanh toán, bạn đã đồng ý với</span>
                                                <Link href="" className=" font-bold underline"> Điều khoản & Điều kiện </Link>
                                                <span>cũng như Chính sách quyền riêng tư của chúng tôi.</span></p>
                                        </div>
                                    </div>



                                </form>
                            </div>
                            <div className="w-5/12 flex flex-col rounded-lg mb-5">
                                <div className="flex flex-col bg-white rounded-lg p-3">
                                    <div className="w-full flex flex-row relative">
                                        <img src={`${URL_Enum.BaseURL_Image}${avartaHotel?.FileName}`} className="w-full rounded-md" />
                                        {room.Discount != undefined && room.Discount > 0 ?
                                            <div className=" h-10 rounded-e-full bg-red-500 text-white font-bold p-2
                                        absolute flex justify-center items-center">Giảm ngay {room.Discount}%</div> : null}
                                    </div>
                                    <div className="w-full flex flex-row justify-start items-center">
                                        <img src="/icon/hotel_icon.webp" className="w-10 h-10" />
                                        <p className="text-2xl"><b>{room.typeroom?.hotel?.Name}</b></p>
                                    </div>
                                    <hr />
                                    <div className="flex flex-row w-full my-2">
                                        {/* ngay nhan phong */}
                                        <div className="w-2/5 flex flex-col justify-center items-center border border-gray-400 rounded-lg">
                                            <p className="text-gray-700 w-full text-center">Nhận phòng</p>
                                            <p className="text-gray-700 w-full text-center"><b>{FormatDateDDD(room.TimeRecive).split(',').slice(0, 2)}</b></p>
                                            <p className="text-gray-700 w-full text-center"><b>{FormatDateDDD(room.TimeRecive).split(',').slice(2, 3)}</b></p>
                                        </div>
                                        <div className="w-1/5">

                                        </div>
                                        {/* ngay tra phong */}
                                        <div className="w-2/5 flex flex-col justify-center items-center border border-gray-400 rounded-lg">
                                            <p className="text-gray-700 w-5/12">Trả phòng</p>
                                            <p className="text-gray-700 w-full text-center"><b>{FormatDateDDD(room.TimeLeave).split(',').slice(0, 2)}</b></p>
                                            <p className="text-gray-700 w-full text-center"><b>{FormatDateDDD(room.TimeLeave).split(',').slice(2, 3)}</b></p>
                                        </div>
                                    </div>


                                    <div className="w-full flex flex-row justify-start items-center">
                                        <p className="text-gray-700 text-xl"><b>{room.typeroom?.Name}</b></p>
                                        <hr />
                                    </div>

                                    <div className="w-full flex flex-row justify-start items-center">
                                        <p className="text-gray-700 w-5/12 flex flex-row">
                                            <span className="mr-1">
                                                <img src="/icon/TreEmVaThuCung.webp" className="w-5 h-5" />
                                            </span>
                                            Khách/phòng</p>
                                        <p className="text-gray-700 w-7/12"><b>{room.typeroom?.MaxQuantityMember}  khách</b></p>
                                        <hr />
                                    </div>

                                    <div className="w-full flex flex-row justify-start items-center">
                                        <p className="text-gray-700 w-5/12 flex flex-row">
                                            <span className="mr-1">
                                                <img src="/icon/giuong.webp" className="w-5 h-5" />
                                            </span>Giường/phòng</p>
                                        <p className="text-gray-700 w-7/12"><b>{room.typeroom?.SoLuongGiuong + ' ' + room.typeroom?.TenLoaiGiuong} </b></p>
                                        <hr />
                                    </div>

                                    {room.Breakfast ?
                                        <div className="w-full flex flex-row justify-start items-center">
                                            <p className="text-gray-700 w-5/12 flex flex-row">
                                                <span className="mr-1">
                                                    <img src="/icon/AmThuc.webp" className="w-5 h-5" />
                                                </span>Giường/phòng</p>
                                            <p className="text-gray-700 w-7/12"><b>{room.typeroom?.SoLuongGiuong + ' ' + room.typeroom?.TenLoaiGiuong} </b></p>
                                            <hr />
                                        </div> : null}

                                    <div className="w-full flex flex-row justify-start items-center">
                                        <p className="text-gray-700 w-5/12 flex flex-row">
                                            {!room.NoMoking ? <span className="mr-1">
                                                <img src="/icon/NoSmoke.webp" className="w-5 h-5" />
                                            </span> : null}
                                            {room.Wifi ? <span className="mr-1">
                                                <img src="/icon/wifi.webp" className="w-5 h-5" />
                                            </span> : null}

                                        </p><hr />
                                    </div>
                                    <hr />
                                    <div className="flex felx-col w-full my-1">
                                        <div className="flex flex-row font-bold text-xl items-start justify-start w-1/2">
                                            <img src="/icon/GiayTo.webp" className="w-8 h-8" />
                                            <span>Tổng Giá Phòng</span>
                                            <span></span>
                                        </div>

                                        <div className="flex flex-col font-bold text-lg items-end w-1/2">
                                            {room.Discount != undefined && room.Discount > 0 ?
                                                <>
                                                    <span className="line-through font-semibold text-gray-700 text-xl mr-1">
                                                        {room.typeroom?.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </span>
                                                    <span className="font-bold mr-1 text-2xl text-red-500 ">
                                                        {todoGetPriceDiscoun(room.typeroom?.Price ?? 0, room.Discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/Đêm
                                                    </span>
                                                    <span className="text-green-600 font-semibold">Giá tốt nhất</span>
                                                </>
                                                : <span className="font-bold mr-1 text-2xl text-red-500 ">
                                                    {todoGetPriceDiscoun(room.typeroom?.Price ?? 0, room.Discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/Đêm
                                                </span>}
                                            <span className="font-semibold mr-1 text-lg text-gray-800 ">
                                                x{totalDay} Đêm
                                            </span>
                                            <span className="font-semibold mr-1 text-lg text-gray-800 ">
                                                x{TotalRoom} Phòng
                                            </span>

                                            <span className="font-bold mr-1 text-2xl text-red-500 ">
                                                {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </span>
                                            <span className="font-bold mr-1 text-sm text-red-500 ">
                                                {room.Bao_Gom_Thue_Va_Phi ? 'Đã bao gồm thuế VAT' : 'Chưa bao gồm thuế VAT'}
                                            </span>

                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col bg-white rounded-lg p-3 my-2">
                                    <p className="text-gray-700 w-full flex flex-row text-lg font-bold">
                                        <span className="mr-1">
                                            <img src="/icon/GiayTo.webp" className="w-6 h-6" />
                                        </span>Chính sách hủy và đổi lịch</p>
                                    {room.Cancel ? <p className="text-gray-700 w-full flex flex-row text-lg font-semibold items-center my-1 ml-3">
                                        <span>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcSystemStatusOkDoneFill16"><g clipPath="url(#clip0_1563_15870)"><path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM12.2071 6.70711C12.5976 6.31658 12.5976 5.68342 12.2071 5.29289C11.8166 4.90237 11.1834 4.90237 10.7929 5.29289L7 9.08579L5.20711 7.29289C4.81658 6.90237 4.18342 6.90237 3.79289 7.29289C3.40237 7.68342 3.40237 8.31658 3.79289 8.70711L6.29289 11.2071C6.68342 11.5976 7.31658 11.5976 7.70711 11.2071L12.2071 6.70711Z" fill="#0BC175"></path></g><defs><clipPath id="clip0_1563_15870"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>
                                        </span>
                                        Miễn phí hủy phòng trước {FormatDate(room.TimeRecive)?.split(' ')[0]}
                                    </p> : null}

                                    {room.ChangeTimeRecive ? <p className="text-gray-700 w-full flex flex-row text-lg font-semibold items-center my-1 ml-3">
                                        <span>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcSystemStatusOkDoneFill16"><g clipPath="url(#clip0_1563_15870)"><path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM12.2071 6.70711C12.5976 6.31658 12.5976 5.68342 12.2071 5.29289C11.8166 4.90237 11.1834 4.90237 10.7929 5.29289L7 9.08579L5.20711 7.29289C4.81658 6.90237 4.18342 6.90237 3.79289 7.29289C3.40237 7.68342 3.40237 8.31658 3.79289 8.70711L6.29289 11.2071C6.68342 11.5976 7.31658 11.5976 7.70711 11.2071L12.2071 6.70711Z" fill="#0BC175"></path></g><defs><clipPath id="clip0_1563_15870"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>
                                        </span>
                                        Có thể đổi lịch trước {FormatDate(room.TimeRecive)?.split(' ')[0]}
                                    </p> : null}
                                    {!room.ChangeTimeRecive && !room.Cancel ? <p className="text-gray-700 w-full flex flex-row text-lg font-semibold items-center my-1 ml-3">
                                        Phòng không thể đổi hoặc hủy đặt phòng
                                    </p> : null}

                                    {room.ChangeTimeRecive || room.Cancel ? <p className=" w-full flex 
                                    flex-row text-lg font-semibold items-center my-1 ml-3 cursor-pointer text-blue-500 underline"
                                        onClick={() => { setModalChinhSachDoiHuyState(true) }}>
                                        Xem chi tiết
                                    </p> : null}



                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* modal err */}
                <div id="popup-modal" className={`w-full ${modalErr ? 'block' : 'hidden'} h-full flex
            z-50 fixed inset-0 justify-center items-center`} style={{ background: 'rgb(0 0 0 / 85%)' }}>
                    <div className="p-4 w-full max-w-md max-h-full flex justify-center items-center mb-[100px]">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent
                             hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex 
                             justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="popup-modal" onClick={() => { setModalErr(false) }}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{modalErrValue}</h3>
                                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={() => { setModalErr(false) }}>
                                    Tôi hiểu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal chinh sach doi huy */}
                <div className={`w-full ${modalChinhSachDoiHuyState ? 'block' : 'hidden'} h-full flex
            z-50 fixed inset-0 justify-center items-center`} style={{ background: 'rgb(0 0 0 / 85%)' }}>
                    <div className="p-4 w-5/12 flex justify-center items-center mb-[100px]">
                        <div className="w-full relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent
                             hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex 
                             justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => { setModalChinhSachDoiHuyState(false) }}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <p className="text-gray-700 w-full flex flex-row text-lg font-bold">
                                    <span className="mr-1">
                                        <img src="/icon/GiayTo.webp" className="w-6 h-6" />
                                    </span>Chính sách hủy và đổi lịch</p>

                                {room.Cancel ? <p className="text-green-600 w-full flex flex-row text-lg font-semibold items-center my-1 ml-3">
                                    <span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcSystemStatusOkDoneFill16"><g clipPath="url(#clip0_1563_15870)"><path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM12.2071 6.70711C12.5976 6.31658 12.5976 5.68342 12.2071 5.29289C11.8166 4.90237 11.1834 4.90237 10.7929 5.29289L7 9.08579L5.20711 7.29289C4.81658 6.90237 4.18342 6.90237 3.79289 7.29289C3.40237 7.68342 3.40237 8.31658 3.79289 8.70711L6.29289 11.2071C6.68342 11.5976 7.31658 11.5976 7.70711 11.2071L12.2071 6.70711Z" fill="#0BC175"></path></g><defs><clipPath id="clip0_1563_15870"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>
                                    </span>
                                    Miễn phí hủy phòng trước {FormatDate(room.TimeRecive)?.split(' ')[0]}
                                </p> : null}

                                {room.ChangeTimeRecive ? <p className="text-green-600 w-full flex flex-row text-lg font-semibold items-center my-1 ml-3">
                                    <span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcSystemStatusOkDoneFill16"><g clipPath="url(#clip0_1563_15870)"><path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM12.2071 6.70711C12.5976 6.31658 12.5976 5.68342 12.2071 5.29289C11.8166 4.90237 11.1834 4.90237 10.7929 5.29289L7 9.08579L5.20711 7.29289C4.81658 6.90237 4.18342 6.90237 3.79289 7.29289C3.40237 7.68342 3.40237 8.31658 3.79289 8.70711L6.29289 11.2071C6.68342 11.5976 7.31658 11.5976 7.70711 11.2071L12.2071 6.70711Z" fill="#0BC175"></path></g><defs><clipPath id="clip0_1563_15870"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>
                                    </span>
                                    Có thể đổi lịch trước {FormatDate(room.TimeRecive)?.split(' ')[0]}
                                </p> : null}
                                <hr />
                                <div className="w-full flex flex-row">
                                    <div className="w-1/12 flex flex-col">
                                        <div className="w-full flex items-end justify-end relative">
                                            <div className="h-[40px] w-[1px] bg-green-700"></div>
                                            <div className="w-[8px] h-[8px] rounded-full bg-green-700 absolute
                                        right-[-3.5px] top-3"></div>
                                        </div>
                                        <div className="w-full flex items-end justify-end relative">
                                            <div className="h-[40px] w-[1px] bg-amber-950"></div>
                                            <div className="w-[8px] h-[8px] rounded-full bg-amber-950 absolute
                                        right-[-3.5px] top-4"></div>
                                        </div>
                                        <div className="w-full flex items-end justify-end relative">
                                            <div className="h-[40px] w-[1px] bg-red-500"></div>
                                            <div className="w-[8px] h-[8px] rounded-full bg-red-500 absolute
                                        right-[-3.5px] top-5"></div>
                                        </div>
                                    </div>

                                    <div className="w-11/12 flex flex-col">
                                        <div className="w-full flex items-center justify-start pl-3">
                                            <div className="h-[40px]  text-green-700">
                                                Miễn phí hủy phòng trước
                                                <p className="text-left font-semibold">{todoSubstractDate(room.TimeRecive, 3)}</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center justify-start pl-3">
                                            <div className="h-[40px] text-amber-950">
                                                Phí hủy phòng là  ₫5.709.165. Mức phí này áp dụng nếu hủy trước
                                                <p className="text-left font-semibold">{FormatDate(room.TimeRecive)}</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center justify-start pl-3">
                                            <div className="h-[40px] text-red-500">
                                                Phí hủy phòng là  ₫16.613.669. Mức phí này áp dụng nếu hủy sau
                                                <p className="text-left font-semibold">{FormatDate(room.TimeRecive)}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <hr />
                                <p className="text-left">
                                    Đặt phòng này có thể đổi lịch nhưng có thể phải chịu phí hủy phòng nếu thực hiện thay đổi sau {FormatDate(room.TimeRecive)}.
                                </p>
                                <p className="text-left">•  Bất kỳ mã giảm giá hoặc điểm đã sử dụng trong đặt phòng ban đầu sẽ không thể áp dụng cho đặt phòng mới.
                                </p>
                                <p className="text-left"> •  Phí đổi lịch có thể được áp dụng dựa trên sự chênh lệch giá giữa đặt phòng cũ và mới.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
                : null}

            {/* <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button> */}






        </main>

    );
}
export default Booking;