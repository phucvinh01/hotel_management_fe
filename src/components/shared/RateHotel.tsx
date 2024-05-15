import { useState } from "react";
import Star from "./Star";
import URL_Enum from "@/axios/URL_Enum";
import FormatDate from "@/service/FormatDateString";
import ModalImageRate from "./ModalImageRate";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface IProps {
    listRate?: IRate[];
    avgRate: number;
    avgRateText: string;
    targetElementRefTongQuan: React.RefObject<HTMLDivElement>;
}
interface MucDoHaiLong {
    soLuong: number;
    tile: number;
    text: 'Kém' | 'Trung bình' | 'Hài lòng' | 'Rất tốt' | 'Tuyệt vời';
}
interface DichVu {
    soLuong: number; //dai dien cho muc do vd:1,2,3,4,5
    tile: number;
    text: 'Dịch vụ' | 'Thoải mái' | 'Sạch sẽ';
}
const RateHotel = (props: IProps) => {
    const [modalImageRateState, setModalImageRateState] = useState<boolean>(false);
    const [filterRateExistImage, setFilterRateExistImage] = useState<boolean>(true);
    const { listRate, avgRate, avgRateText, targetElementRefTongQuan } = props;
    const [listRateTemp, setListRateTemp] = useState<IRate[]>(listRate ? listRate : []);
    const [haiLong, setHaiLong] = useState<MucDoHaiLong[]>([]);
    const [dichVu, setDichVu] = useState<DichVu[]>([]);
    const arrFilterRate = ['Tất cả', 'Gần đây nhất', 'Điểm (Từ cao đến thấp)', 'Điểm (từ thấp đến cao)']
    const [hienFilterRate, setHienFilterRate] = useState<string>('Tất cả');
    const [dsFilterRateState, setDsFilterRateState] = useState<boolean>(false);//mac dinh an danh sach 
    const [listImageRateP, setListImageRateP] = useState<string[]>([]);
    const TinhMucDoDichVu = () => {
        var dvSachSe: DichVu = { soLuong: 0, tile: 0, text: 'Sạch sẽ' };
        var dvThoaiMai: DichVu = { soLuong: 0, tile: 0, text: 'Thoải mái' };
        var dvDichVu: DichVu = { soLuong: 0, tile: 0, text: 'Dịch vụ' };
        listRate?.map((item) => {
            dvSachSe.soLuong += item.Sach_Se;
            dvThoaiMai.soLuong += item.Thoai_Mai;
            dvDichVu.soLuong += item.Dich_Vu;
        });
        dvSachSe.tile = dvSachSe.soLuong / (listRate?.length || 1);
        dvThoaiMai.tile = dvThoaiMai.soLuong / (listRate?.length || 1);
        dvDichVu.tile = dvDichVu.soLuong / (listRate?.length || 1);
        dichVu.push(dvSachSe);
        dichVu.push(dvThoaiMai);
        dichVu.push(dvDichVu);
    }
    TinhMucDoDichVu();
    const TinhMucDoHaiLong = () => {
        var mucDoHaiLongKem: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Kém' };
        var mucDoHaiLongTB: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Trung bình' };
        var mucDoHaiLongHL: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Hài lòng' };
        var mucDoHaiLongRT: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Rất tốt' };
        var mucDoHaiLongTV: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Tuyệt vời' };
        listRate?.map((item) => {
            if (item.Rating < 5) {
                mucDoHaiLongKem.soLuong += 1;
            }
            else if (item.Rating < 7) {
                mucDoHaiLongTB.soLuong += 1;
            }
            else if (item.Rating < 8) {
                mucDoHaiLongHL.soLuong += 1;
            }
            else if (item.Rating < 9) {
                mucDoHaiLongRT.soLuong += 1;
            }
            else {
                mucDoHaiLongTV.soLuong += 1;
            }
        });
        mucDoHaiLongKem.tile = Number((mucDoHaiLongKem.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        mucDoHaiLongTB.tile = Number((mucDoHaiLongTB.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        mucDoHaiLongHL.tile = Number((mucDoHaiLongHL.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        mucDoHaiLongRT.tile = Number((mucDoHaiLongRT.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        mucDoHaiLongTV.tile = Number((mucDoHaiLongTV.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        haiLong.push(mucDoHaiLongKem);
        haiLong.push(mucDoHaiLongTB);
        haiLong.push(mucDoHaiLongHL);
        haiLong.push(mucDoHaiLongRT);
        haiLong.push(mucDoHaiLongTV);
    }
    TinhMucDoHaiLong();

    const handleClickFilterRate = (filter: string, existImage: boolean) => {
        if (listRate != undefined) {
            if (filter == 'Gần đây nhất') {
                setListRateTemp(
                    existImage ? listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }).sort((a, b) => {
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        return dateA.getTime() - dateB.getTime();
                    })
                        : listRate.sort((a, b) => {
                            const dateA = new Date(a.created_at);
                            const dateB = new Date(b.created_at);
                            return dateA.getTime() - dateB.getTime();
                        })
                );
            }
            else if (filter == 'Điểm (Từ cao đến thấp)') {
                existImage ? setListRateTemp(
                    listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }).sort((a, b) => b.Rating - a.Rating)
                )
                    : setListRateTemp(
                        listRate.sort((a, b) => b.Rating - a.Rating)
                    );
            }
            else if (filter == 'Điểm (từ thấp đến cao)') {
                setListRateTemp(
                    existImage ? listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }).sort((a, b) => a.Rating - b.Rating)
                        : listRate.sort((a, b) => a.Rating - b.Rating)
                );

            }
            else {
                setListRateTemp(
                    existImage ? listRate : listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }));
            }
        }

    }
    return (
        listRate && listRate.length > 0 ?
            <>
                <div className='my-3 w-full lg:w-10/12 flex flex-col flex-wrap
                     bg-slate-100 rounded-lg p-3' id='DanhGia' ref={targetElementRefTongQuan}>
                    <p className="text-2xl text-gray-900"><b>Đánh giá từ khách</b></p>
                    <p className="text-xl text-gray-900 my-2"><b>Xếp hạng & Điểm đánh giá chung</b></p>
                    <p className="text-lg text-gray-900 font-semibold">Từ {listRate.length} đánh giá của khách đã ở</p>
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-2/12 flex flex-col p-3">
                            <div className=" w-[150px] h-[150px] rounded-full bg-blue-800 flex flex-row p-3">
                                <div className="w-full rounded-full  border-4 border-whiten bg-blue-500 flex flex-row 
                                justify-center items-center ">
                                    <p className="text-7xl text-white"><b>{avgRate}</b></p>
                                </div>
                            </div>
                            <p className="text-4xl text-blue-500 text-center uppercase"><b>{avgRateText}</b></p>
                        </div>
                        {/* danh gia hai long */}
                        <div className="flex flex-col w-6/12 justify-start px-6">
                            <div className="flex flex-row w-ful items-center mb-3">
                                <p className="text-lg font-semibold text-left w-2/12">{haiLong[4].text}</p>
                                <div className="flex flex-row w-10/12 h-[12px] bg-white
                                border border-blue-500 rounded-md justify-start items-center">
                                    <div className={`h-full w-[${haiLong[4].tile.toString()}%] bg-blue-500 z-1`}></div>
                                </div>
                                <p className="text-lg font-semibold text-left w-2/12 ml-3">
                                    {haiLong[4].soLuong}/{listRate.length}
                                </p>
                            </div>

                            <div className="flex flex-row w-ful items-center my-3">
                                <p className="text-lg font-semibold text-left w-2/12">{haiLong[3].text}</p>
                                <div className="flex flex-row w-10/12 h-[12px] bg-white
                                border border-blue-500 rounded-md justify-start items-center">
                                    <div className={`h-full w-[${haiLong[3].tile.toString()}%] bg-blue-500 z-1`}></div>
                                </div>
                                <p className="text-lg font-semibold text-left w-2/12 ml-3">
                                    {haiLong[3].soLuong}/{listRate.length}
                                </p>
                            </div>

                            <div className="flex flex-row w-ful items-center my-3">
                                <p className="text-lg font-semibold text-left w-2/12">{haiLong[2].text}</p>
                                <div className="flex flex-row w-10/12 h-[12px] bg-white
                                border border-blue-500 rounded-md justify-start items-center">
                                    <div className={`h-full w-[${haiLong[2].tile.toString()}%] bg-blue-500 z-1`}></div>
                                </div>
                                <p className="text-lg font-semibold text-left w-2/12 ml-3">
                                    {haiLong[2].soLuong}/{listRate.length}
                                </p>
                            </div>

                            <div className="flex flex-row w-ful items-center my-3">
                                <p className="text-lg font-semibold text-left w-2/12">{haiLong[1].text}</p>
                                <div className="flex flex-row w-10/12 h-[12px] bg-white
                                border border-blue-500 rounded-md justify-start items-center">
                                    <div className={`h-full w-[${haiLong[1].tile.toString()}%] bg-blue-500 z-1`}></div>
                                </div>
                                <p className="text-lg font-semibold text-left w-2/12 ml-3">
                                    {haiLong[1].soLuong}/{listRate.length}
                                </p>
                            </div>

                            <div className="flex flex-row w-ful items-center my-3">
                                <p className="text-lg font-semibold text-left w-2/12">{haiLong[0].text}</p>
                                <div className="flex flex-row w-10/12 h-[12px] bg-white
                                border border-blue-500 rounded-md justify-start items-center">
                                    <div className={`h-full w-[${haiLong[0].tile.toString()}%] bg-blue-500 z-1`}></div>
                                </div>
                                <p className="text-lg font-semibold text-left w-2/12 ml-3">
                                    {haiLong[0].soLuong}/{listRate.length}
                                </p>
                            </div>
                        </div>

                        {/* danh gia dich vu */}
                        <div className="flex flex-col w-4/12 justify-start px-6 ">
                            <div className="flex flex-row w-ful items-center mb-3">
                                <p className="text-lg font-semibold text-left w-4/12">{dichVu[0].text}</p>
                                <span className="w-8/12"><Star color="text-blue-400" star={dichVu[0].tile} key={0} size="15px" /></span>
                            </div>

                            <div className="flex flex-row w-ful items-center  my-3">
                                <p className="text-lg font-semibold text-left w-4/12">{dichVu[1].text}</p>
                                <span className="w-8/12"><Star color="text-blue-400" star={dichVu[1].tile} key={1} size="15px" /></span>
                            </div>

                            <div className="flex flex-row w-ful items-center  my-3">
                                <p className="text-lg font-semibold text-left w-4/12">{dichVu[2].text}</p>
                                <span className="w-8/12"><Star color="text-blue-400" star={dichVu[2].tile} key={2} size="15px" /></span>
                            </div>
                        </div>
                    </div>
                    {/* filter */}
                    <div className=' flex flex-col rounded-lg justify-start items-start pl-4
                py-4'><p className='text-lg font-medium text-gray-900'>Sắp xếp</p>
                        <div className='w-full lg:w-8/12 flex flex-col lg:flex-row bg-white rounded-lg border-2
                        border-gray-100 py-3 px-2 shadow-3 shadow-gray-300'>

                            <div className='w-full lg:w-1/2 my-2 flex flex-col justify-start items-start relative'>
                                <p className='text-lg font-bold text-cyan-600 flex flex-row cursor-pointer select-none'
                                    onClick={() => {
                                        setDsFilterRateState(!dsFilterRateState);
                                    }}>
                                    <span>
                                        <svg className="w-6 h-6 text-cyan-600  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                                        </svg>

                                    </span>
                                    {hienFilterRate}
                                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                    </svg>
                                    </span>
                                </p>
                                <div className={`bg-white shadow-1 shadow-gray-500 p-3 rounded-md absolute z-10
                            top-[25px] ${dsFilterRateState ? 'block' : 'hidden'}`}>
                                    {arrFilterRate.map((item) => (
                                        <p className={`text-lg font-bold ${item === hienFilterRate ? 'text-cyan-600'
                                            : 'text-gray-900'} my-2 cursor-pointer select-none`}
                                            onClick={() => {
                                                setHienFilterRate(item);
                                                setDsFilterRateState(!dsFilterRateState);
                                                handleClickFilterRate(item, filterRateExistImage);
                                            }}>
                                            {item}</p>))}
                                </div>
                            </div>

                            <div className='w-full lg:w-1/2 my-2 flex justify-start items-center'>
                                <input id='filterRateExistImage' type='checkbox' className='w-7 h-7 cursor-pointer'
                                    onClick={() => {
                                        setFilterRateExistImage(!filterRateExistImage);
                                        handleClickFilterRate(hienFilterRate, !filterRateExistImage);
                                    }} />
                                <label htmlFor='filterRateExistImage' className='text-lg font-medium text-cyan-600 
                        cursor-pointer select-none ml-1'>
                                    Hiển thị đánh giá có hình ảnh</label>
                            </div>

                        </div>
                    </div>

                    {/* form them danh gia */}

                    {/* list danh gia */}
                    {listRateTemp.map((item) => (
                        <div className="flex flex-row w-full p-3 bg-white rounded-lg
                        border-2 border-gray-300 mb-3">
                            <div className="w-4/12 flex flex-col justify-start items-center">
                                <img src={`${URL_Enum.BaseURL_Avarta}${item.guest?.Avarta}`}
                                    className="w-[120px] h-[120px] rounded-full" />
                                <p>{item.guest.Name}</p>
                            </div>
                            <div className="w-8/12 flex flex-col">
                                <div className="w-full flex flex-row">
                                    <div className="flex flex-row  bg-cyan-200 rounded-xl w-1/6 justify-center items-center
                                    text-lg font-semibold">
                                        <img src="/icon/5285ed4483dbe0a200497d4c3de31128.webp" className="w-8 h-8" />
                                        <span>{item.Rating}/10</span>
                                    </div>
                                    <div className="flex flex-row rounded-xl w-5/6 justify-end items-center
                                    text-lg font-semibold">
                                        <p>{FormatDate(item.created_at)}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold">{item.Description}</p>
                                {item.HinhAnh ?
                                    <div className="w-full">
                                        <Carousel className="w-full" id='slider'>
                                            <CarouselContent className="">
                                                {item.HinhAnh.split(';').map((jitem, index) => (
                                                    <CarouselItem key={index} className="basis-1/5">
                                                        <img src={`${URL_Enum.BaseURL_Rate}${jitem}`}
                                                            alt={jitem} className={`w-full
                                                h-[70px] rounded-lg object-cover cursor-pointer`}
                                                            onClick={() => {
                                                                item.HinhAnh ? setListImageRateP(item.HinhAnh.split(';'))
                                                                    : setListImageRateP([])
                                                                setModalImageRateState(true)
                                                            }} />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent >
                                        </Carousel>
                                        {/* <img src={`${URL_Enum.BaseURL_Rate}${item.HinhAnh}`}
                                        className="w-5/12 h-[180px] rounded-md" /> */}
                                    </div> : null}
                            </div>
                        </div>
                    ))}
                </div>
                <ModalImageRate listImageRate={listImageRateP}
                    modalImageRateState={modalImageRateState}
                    setModalImageRateState={setModalImageRateState} />
            </>
            : <>
                <div className='my-3 w-full lg:w-10/12 flex flex-col flex-wrap
        bg-slate-100 rounded-lg p-3'>
                    <p className="text-2xl text-gray-900"><b>Đánh giá từ khách</b></p>
                    <p className="text-xl text-gray-900 font-semibold">Khách sạn chưa có thông tin đánh giá từ khách hàng.</p>
                </div>
            </>
    );

}
export default RateHotel;