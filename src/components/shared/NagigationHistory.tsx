"use client"
import { useState } from "react";

interface IProps {
    pageName: string,
    setPageName: (pageName: string) => void,
}
const NavigationHistory = (props: IProps) => {
    const { pageName, setPageName } = props;
    enum PageEnum {
        ThongBao = 'ThongBao',
        LichSu = 'LichSu',
        TaiKhoan = 'TaiKhoan',
        DangXuat = 'DangXuat'
    }
    return (<div className="w-full bg-cyan-50 flex flex-col p-3 rounded-lg font-semibold text-xl border border-cyan-700">
        <div className="flex flex-col w-full">
            {/* <img/> */}
        </div>
        <div className={`${pageName == PageEnum.ThongBao ? 'text-blue-500' : 'text-gray-900'} w-full flex flex-row justify-start items-center cursor-pointer hover:scale-95 my-2`}
            onClick={() => { setPageName(PageEnum.ThongBao) }}>
            <span >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell text-blue-500 font-bold" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
            </span>
            Thông báo
        </div>

        <div className={`${pageName == PageEnum.LichSu ? 'text-blue-500' : 'text-gray-900'} w-full flex flex-row justify-start items-center cursor-pointer hover:scale-95 my-2`}
            onClick={() => { setPageName(PageEnum.LichSu) }}>
            <span >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-checklist text-blue-500 font-bold" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                    <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                </svg>
            </span>
            Lịch sử đặt phòng
        </div>

        <div className={`${pageName == PageEnum.TaiKhoan ? 'text-blue-500' : 'text-gray-900'} w-full flex flex-row justify-start items-center cursor-pointer hover:scale-95 my-2`}
            onClick={() => { setPageName(PageEnum.TaiKhoan) }}>
            <span >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill  text-blue-500 font-bold" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
            </span>
            Tài khoản
        </div>
        <hr />
        <div className={`${pageName == PageEnum.DangXuat ? 'text-blue-500' : 'text-gray-900'} w-full flex flex-row justify-start items-center cursor-pointer hover:scale-95 my-2`}
            onClick={() => { setPageName(PageEnum.DangXuat) }}>
            <span >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-power text-blue-500 font-bold" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1z" />
                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                </svg>
            </span>
            Đăng xuất
        </div>
    </div>);
}
export default NavigationHistory;