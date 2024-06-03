"use client"
import NavigationHistory from "@/components/shared/NagigationHistory";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileForm } from "../../(profile)/me/profile-form";
import axios from "axios";
import { useAuth } from "@/hooks/useAuthContext";
import URL_Enum from "@/axios/URL_Enum";
import LocalStoreEnum from "@/axios/LocalStoreEnum";
import { getListBookingByGusetId } from "@/service/bookinghotel.service";
import Loading from "@/components/shared/Loading";
import { error } from "console";
import FormatDateDDD from "@/service/FormatDateDDD";
import { getListMessageByGusetId } from "@/service/message.service";
import FormatDate from "@/service/FormatDateString";

const getMonthLatter = (monthLatte: number) => {
    const currentDate = new Date();
    const month = currentDate.getMonth() - monthLatte + 1;
    return 'Tháng ' + month + ', năm ' + currentDate.getFullYear();
}

const PageHistory = () => {
    enum PageEnum {
        ThongBao = 'ThongBao',
        LichSu = 'LichSu',
        TaiKhoan = 'TaiKhoan',
        DangXuat = 'DangXuat'
    }
    enum SortEnum {
        ChinMuoiNgayQua = '90 ngày qua',
        MoiNhat = 'Mới nhất',
        CuNhat = 'Cũ nhất',
        MotThangTruoc = 'MotThangTruoc',
        HaiThangTruoc = 'HaiThangTruoc',
        BaThangTruoc = 'BaThangTruoc',
        Clear = 'Tất cả'
    }
    const route = useRouter();
    const [loadingBookingState, setLoadingBookingState] = useState<boolean>(false);
    const [modalErr, setModalErr] = useState<boolean>(false);
    const [modalErrValue, setModalErrValue] = useState<string>('');
    const [userGuest, setUserGuest] = useState<IGuest>();
    const getIGuest = () => {
        const IGusetStorage = (typeof localStorage !== undefined) ? localStorage.getItem(LocalStoreEnum.IGUEST) : null;
        console.log('IGusetStorage', IGusetStorage)
        if (IGusetStorage != null) {
            let jsonIGuest = JSON.parse(IGusetStorage);
            setUserGuest(jsonIGuest.result)
            console.log('userGuest', userGuest)
        }
        else {
            setModalErr(true)
            setModalErrValue('Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục.')
        }
    }

    const [listMessage, setListMessage] = useState<IMessage[]>([]);



    const searchParams = useSearchParams();
    const [pageName, setPageName] = useState<string>(searchParams.get('page') == 'notify' ? PageEnum.ThongBao : PageEnum.LichSu);

    const [sortDate, setSortDate] = useState<string>(SortEnum.MoiNhat);
    const [listBookingHotel, setListBookingHotel] = useState<IBooking[]>([]);

    useEffect(() => {
        setPageName(searchParams.get('page') == 'notify' ? PageEnum.ThongBao : PageEnum.LichSu);
        getIGuest();
    }, [])

    const getData = () => {
        if (pageName == PageEnum.ThongBao) {
            if (userGuest?.id != undefined) {
                setLoadingBookingState(true);
                const reponseHistory = getListBookingByGusetId(userGuest?.id)
                    .then(response => {
                        setListBookingHotel(response.result)
                        console.log('reponseHistory', response)
                    }).catch((err) => {
                        setModalErrValue('Lỗi truy cập vui lòng thử lại')
                        setModalErr(true)
                    }).finally(() => { setLoadingBookingState(false) })

            }
        }
        if (userGuest?.id != undefined) {
            setLoadingBookingState(true);
            const reponseMessage = getListMessageByGusetId(userGuest?.id)
                .then(response => {
                    setListMessage(response.result)
                    console.log('reponseHistory', response)
                }).catch((err) => {
                    setModalErrValue('Lỗi truy cập vui lòng thử lại')
                    setModalErr(true)
                }).finally(() => { setLoadingBookingState(false) })
        }
    }


    useEffect(() => {
        getData();
    }, [pageName])



    return (<main className="w-full flex justify-center items-center bg-slate-50 mb-10 p-3 flex-wrap">
        <Loading modalState={loadingBookingState} />
        <div className="w-10/12 flex flex-col border-b mb-2 justify-center items-start">
            <h2 className="text-2xl font-bold tracking-tight">Quản lý tài khoản</h2>
            <p className="text-muted-foreground">
                Quản lý thông tin cá nhân, tài khoản của bạn và lịch sử đặt chổ
            </p>
        </div>
        <div className="w-10/12 flex justify-center items-start">

            <div className="w-3/12">
                <NavigationHistory pageName={pageName} setPageName={setPageName} />
            </div>
            <div className="w-8/12 flex flex-col justify-start items-start">
                {/* thong bao va lich su dat phong */}
                {pageName !== PageEnum.TaiKhoan ?
                    <div className={`w-full p-3`}>
                        <div className="w-full flex flex-row flex-wrap ">
                            <p className={`${sortDate == SortEnum.MoiNhat ? 'text-white bg-cyan-500' : 'text-gray-900 bg-white'} border border-cyan-700 rounded-lg
                        px-3 py-2 mx-1 cursor-pointer hover:scale-105`}
                                onClick={() => setSortDate(SortEnum.MoiNhat)}>{SortEnum.MoiNhat}</p>

                            <p className={`${sortDate == SortEnum.CuNhat ? 'text-white bg-cyan-500' : 'text-gray-900 bg-white'} border border-cyan-700 rounded-lg
                        px-3 py-2 mx-1 cursor-pointer hover:scale-105`}
                                onClick={() => setSortDate(SortEnum.CuNhat)}>{SortEnum.CuNhat}</p>

                            <p className={`${sortDate == SortEnum.ChinMuoiNgayQua ? 'text-white bg-cyan-500' : 'text-gray-900 bg-white'} border border-cyan-700 rounded-lg
                        px-3 py-2 mx-1 cursor-pointer hover:scale-105`}
                                onClick={() => setSortDate(SortEnum.ChinMuoiNgayQua)}>{SortEnum.ChinMuoiNgayQua}</p>

                            <p className={`${sortDate == SortEnum.MotThangTruoc ? 'text-white bg-cyan-500' : 'text-gray-900 bg-white'} border border-cyan-700 rounded-lg
                        px-3 py-2 mx-1 cursor-pointer hover:scale-105`}
                                onClick={() => setSortDate(SortEnum.MotThangTruoc)}>{getMonthLatter(1)}</p>

                            <p className={`${sortDate == SortEnum.HaiThangTruoc ? 'text-white bg-cyan-500' : 'text-gray-900 bg-white'} border border-cyan-700 rounded-lg
                        px-3 py-2 mx-1 cursor-pointer hover:scale-105`}
                                onClick={() => setSortDate(SortEnum.HaiThangTruoc)}>{getMonthLatter(2)}</p>

                            <p className={`${sortDate == SortEnum.BaThangTruoc ? 'text-white bg-cyan-500' : 'text-gray-900 bg-white'} border border-cyan-700 rounded-lg
                        px-3 py-2 mx-1 cursor-pointer hover:scale-105`}
                                onClick={() => setSortDate(SortEnum.BaThangTruoc)}>{getMonthLatter(3)}</p>

                            <p className={`${sortDate == SortEnum.Clear ? 'text-white bg-cyan-500' : 'text-gray-900 bg-white'} border border-cyan-700 rounded-lg
                        px-3 py-2 mx-1 cursor-pointer hover:scale-105`}
                                onClick={() => setSortDate(SortEnum.Clear)}>{SortEnum.Clear}</p>
                        </div>
                        {/* lich su dat phong */}
                        <div className={`${pageName == PageEnum.LichSu ? 'block' : 'hidden'} w-full flex flex-row`}>
                            {listBookingHotel != undefined && listBookingHotel.length > 0 ?
                                <div className="w-full max-h-[320px] overflow-hidden overflow-y-auto p-2 border-t border-t-cyan-700 mt-2">
                                    {listBookingHotel.map((item, index) => (
                                        <div className="w-full border border-cyan-700 rounded-lg p-2 my-2 text-gray-800 bg-cyan-50
                                        hover:shadow hover:shadow-cyan-500">
                                            <p className="font-semibold">Mã phòng: {item?.RoomId}(Tên phòng: {item.room?.RoomName}) - Loại phòng: {item.room?.typeroom?.Name} - Khách sạn: {item.room?.typeroom?.hotel?.Name}</p>
                                            <p className="font-semibold">Mã phiếu đặt: {item?.id} </p>
                                            <p>Ngày nhận phòng: {item?.TimeRecive != undefined ? FormatDateDDD(item?.TimeRecive) : null} - Ngày trả phòng: {item?.TimeLeave != undefined ? FormatDateDDD(item?.TimeLeave) : null}</p>
                                            <p></p>
                                            <p>Chi phí: <span className="text-red-500 font-semibold">{item?.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> (Giảm giá: {item?.Discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} )</p>
                                            <p></p>
                                            <p className="w-full flex flex-row">
                                                <p className="w-9/12">Hình thức thanh toán: {item?.TypePay}</p>
                                                <button className="bg-cyan-700 text-white font-semibold px-5 py-2 border border-cyan-900
                                                rounded-lg hover:scale-105"
                                                    onClick={() => {
                                                        event?.preventDefault();
                                                        route.push(`/app/hotel/hotel_detail?id=${item.room?.typeroom?.HotelId}`)
                                                    }}>Xem chi tiết phòng</button>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                : <div className="w-full flex flex-row rounded-lg justify-center items-center my-4 border border-cyan-700
                        shadow-1 shadow-cyan-300 p-3">
                                    <img src="/icon/lichsudatphongtrong.webp" className="w-3/12" />
                                    <div className=" flex flex-col">
                                        <p className="font-bold text-gray-900 px-2">Không tìm thấy lịch sử đặt phòng</p>
                                        <p className="font-semibold text-gray-900 px-2">Bạn có thể xem thông tin lịch sử đặt phòng mới tại đây. Các giao dịch cũ sẽ được hiển thị trong Lịch sử đặt phòng của tôi.</p>
                                        <Link href='/app/hotel'
                                            className="px-2 font-bold text-lg text-cyan-500">Đi đến đặt phòng</Link>
                                    </div>
                                </div>}
                        </div>


                        {/* thong bao */}
                        <div className={`${pageName == PageEnum.ThongBao ? 'block' : 'hidden'} w-full flex flex-row`}>
                            {listMessage != undefined && listMessage.length > 0 ?
                                <div className="w-full flex flex-row rounded-lg justify-center items-start my-4  max-h-[320px] overflow-hidden overflow-y-auto">
                                    {listMessage.map((item) => (
                                        <div className="w-full flex flex-row rounded-lg justify-start items-start my-4 border border-cyan-700
                                        shadow-1 shadow-cyan-300 p-3 bg-cyan-50 hover:shadow hover:shadow-cyan-700">
                                            <img src="/icon/thongbaotrong.webp" className="w-1/12 scale-110" />
                                            <div className=" flex flex-col">
                                                <p className="font-bold text-gray-900 px-2">{item.Information}</p>
                                                <p className="font-semibold text-gray-900 px-2">{FormatDate(item.created_at)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                : <div className="w-full flex flex-row rounded-lg justify-center items-center my-4 border border-cyan-700
                        shadow-1 shadow-cyan-300 p-3">
                                    <img src="/icon/thongbaotrong.webp" className="w-1/12 scale-110" />
                                    <div className=" flex flex-col">
                                        <p className="font-bold text-gray-900 px-2">Bạn chưa có thông báo nào</p>
                                        <p className="font-semibold text-gray-900 px-2">Bạn có thể xem thông báo mới tại đây. Các thông báo cũ sẽ được hiển thị trong Thông báo của tôi.</p>
                                    </div>
                                </div>}
                        </div>
                    </div>
                    : <div className="w-full p-3 flex flex-row rounded-lg justify-center items-center ml-3 border border-cyan-700
                    shadow-1 shadow-cyan-300">
                        <ProfileForm />
                    </div>
                }



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
    </main>);
}

export default PageHistory;