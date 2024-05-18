"use client"
import NavigationHistory from "@/components/shared/NagigationHistory";
import Link from "next/link";
import { useState } from "react";

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
    const [pageName, setPageName] = useState<string>(PageEnum.LichSu);
    const [sortDate, setSortDate] = useState<string>(SortEnum.MoiNhat);
    const [listBookingHotel, setListBookingHotel] = useState<IBooking[]>([]);
    return (<main className="w-full flex justify-center items-center bg-slate-50 mb-10 p-3">
        <div className="w-10/12 flex justify-center items-start">
            <div className="w-3/12">
                <NavigationHistory pageName={pageName} setPageName={setPageName} />
            </div>
            <div className="w-8/12 flex flex-col justify-start items-start">
                {/* thong bao va lich su dat phong */}
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
                            <div></div>
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
                        {listBookingHotel != undefined && listBookingHotel.length > 0 ?
                            <div></div>
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




            </div>

        </div>
    </main>);
}

export default PageHistory;