import URL_Enum from "@/axios/URL_Enum";
import FormatDate from "@/service/FormatDateString";
import { use, useState } from "react";


interface IProps {
    rateItem?: IRate;
    rateShortModaState: boolean;
    setRateShortModaState: (rateShortModaState: boolean) => void;
}
const RateShortModal = (props: IProps) => {
    const { rateItem, rateShortModaState, setRateShortModaState } = props;
    return (
        rateItem ? <>
            <div className={`w-full ${rateShortModaState ? 'block' : 'hidden'} h-full flex
        z-[999]9 fixed inset-0 justify-center items-center`} style={{ background: 'rgb(0 0 0 / 55%)' }}>
                <div className="w-9/12 h-[45%] flex flex-col rounded-2xl justify-start items-center
                bg-white shadow-10 shadow-blue-400 opacity-100 relative">
                    <div className="flex flex-row w-full p-3 mb-3 pb-5 justify-start items-start relative border-b
                     border-gray-500 bg-slate-100 rounded-t-lg">
                        <p className="font-bold text-xl text-gray-900">Đánh giá từ người dùng</p>
                        <button className="absolute right-5 top-5 bg-red-400 rounded-3xl" onClick={() => {
                            setRateShortModaState(false);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 w-8 h-8">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-row items-center w-full">
                        <div className="flex flex-row items-center w-3/12 border-r-2 border-blue-700">
                            <img src={`${URL_Enum.BaseURL_Avarta}${rateItem.guest.Avarta}`}
                                className="w-32 h-32 rounded-full" />
                            <p className="text-lg font-bold">{rateItem.guest.Name}</p>
                        </div>

                        <div className="flex flex-row flex-wrap justify-center items-start w-9/12 p-3">
                            <div className='flex flex-row w-9/12 h-full'>
                                <img src='/icon/5285ed4483dbe0a200497d4c3de31128.webp' className='w-8 h-8' />
                                <p>{rateItem.Rating}/10</p>
                            </div>
                            <div className="w-3/12">{FormatDate(rateItem.created_at)}</div>
                            <p className="font-semibold text-lg w-full">{rateItem.Description}</p>
                        </div>
                    </div>
                    <button className="absolute bottom-3 right-3 p-3 font-bold text-white bg-cyan-500 rounded-3xl"
                        onClick={() => { setRateShortModaState(!rateShortModaState) }}>Xem tất cả đánh giá</button>
                </div>
            </div>
        </>
            : null

    );
}
export default RateShortModal;