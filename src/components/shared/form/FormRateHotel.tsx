import { useState } from "react";
import RateStar from "./RateStar";
import RateStarLearnUp from "./RateStarClearnUp";
import RateStarConvenient from "./RateStarConvenient";
import RateStarService from "./RateStarConvenient copy";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { addNewRate } from "@/service/ratehotel.service";
import GenerateId from "@/service/generateId";
import BottomNotify from "../BottomNotify";

interface IProps {
    rateStar: number,
    setRateStar: (rataStar: number) => void,

    rateConvenient: number,
    setRateConvenient: (rateConvenient: number) => void,

    rateService: number,
    setRateService: (rateService: number) => void,

    rateClearnUp: number,
    setRateClearnUp: (rateClearnUp: number) => void,

    hotelId: string,

    listRate: IRate[],

    setListRate: (listRate: IRate[] | []) => void,

    setListRateTemp: (listRateTemp: IRate[]) => void,

}
export default function FormRateHotel(props: IProps) {
    const [notifyCate, setNotifyCate] = useState<'successfully' | 'error' | 'warning'>('successfully');
    const [notifyState, setNotifyState] = useState<boolean>(false);
    const [notifyMessage, setNotifyMessage] = useState<string>('');
    const { rateStar, setRateStar, rateConvenient, setRateConvenient, rateService, setRateService,
        rateClearnUp, setRateClearnUp, hotelId, listRate, setListRate, setListRateTemp } = props;

    const [description, setDescription] = useState<string>("");

    const [files, setFiles] = useState<FileList | null>(null);
    //const [files, setFiles] = useState<File | null>(null);

    const onSubmitForm = () => {
        if (description != '') {
            const response = addNewRate(files, GenerateId('ratehotel'),
                hotelId, 'G20240429111501', rateStar, description, rateClearnUp,
                rateConvenient, rateService);
            response.then(data => {
                if (data.status == 'successfully') {
                    setNotifyCate(data.status);
                    const rateResut = data.result;
                    if (rateResut != undefined) {
                        listRate?.push(rateResut);
                        setListRate(listRate);
                        setListRateTemp(listRate);
                    }
                    setRateStar(0);
                    setRateConvenient(0);
                    setRateService(0);
                    setRateClearnUp(0);
                    setDescription("");
                    setFiles(null);
                }
                else if (data.status == 'error') { setNotifyCate(data.status) }
                else if (data.status == 'warning') { setNotifyCate(data.status) }
                setNotifyMessage(data.message);
                setNotifyState(true);
                setTimeout(() => {
                    setNotifyState(false);
                }, 5000);
            });
        }
        else {
            setNotifyCate('error')
            setNotifyMessage('Vui lòng nhập đánh giá của bạn.');
            setNotifyState(true);
            setTimeout(() => {
                setNotifyState(false);
            }, 5000);
        }


    }

    return (
        <div className="flex flex-col w-full justify-center items-start p-3 ">
            <p className="text-lg font-semibold">Thêm đánh giá của bạn</p>
            <form className="flex flex-row w-full">
                <div className="flex flex-col w-5/12 justify-start items-start ">
                    <div className="flex flex-row w-full justify-start items-center ">
                        <img src="/icon/AvartaDefault.jpg" className="w-24 rounded-full" />
                        <div className="flex flex-row justify-start items-center text-lg ">
                            Username
                        </div>
                    </div>
                    <div className="w-11/12 h-[1px] bg-slate-100 "></div>

                    <div className="flex flex-row w-full justify-start items-center ">
                        <p className="w-3/12">Đánh giá:</p>
                        <div className="flex flex-row justify-start items-center p-3">
                            <RateStar color="text-blue-500" size="8" star={1}
                                rateStar={rateStar} setRateStar={setRateStar} />
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-start items-center ">
                        <p className="w-3/12">Mức độ sạch sẽ:</p>
                        <div className="flex flex-row justify-start items-center p-3">
                            <RateStarLearnUp color="text-blue-500" size="8" star={1}
                                rateClearnUp={rateClearnUp} setRateClearnUp={setRateClearnUp} />
                        </div>
                    </div>

                    <div className="flex flex-row w-full justify-start items-center ">
                        <p className="w-3/12">Mức độ dịch vụ:</p>
                        <div className="flex flex-row justify-start items-center p-3">
                            <RateStarService color="text-blue-500" size="8" star={1}
                                rateService={rateService} setRateService={setRateService} />
                        </div>
                    </div>

                    <div className="flex flex-row w-full justify-start items-center ">
                        <p className="w-3/12">Mức độ thoải mái:</p>
                        <div className="flex flex-row justify-start items-center p-3">
                            <RateStarConvenient color="text-blue-500" size="8" star={1}
                                rateConvenient={rateConvenient} setRateConvenient={setRateConvenient} />
                        </div>
                    </div>

                </div>

                <div className="flex flex-col w-7/12 justify-start items-center ">
                    <div className="flex flex-col w-full justify-start items-start ">
                        <p className="w-full">Thên nhận xét về khách sạn:</p>
                        <textarea className="w-full h-[90px] border border-cyan-700
                     focus:outline focus:outline-cyan-500 p-1 rounded-sm"
                            value={description}
                            onChange={(event) => { setDescription(event.target.value) }}></textarea>
                    </div>

                    <div className="flex flex-col w-full justify-start items-start ">
                        <p className="w-full">Thêm hình ảnh:</p>
                        {/* <label htmlFor="file-input" className="bg-blue-500 border border-cyan-700
                        px-3 py-1 text-white">Chọn ảnh</label> */}
                        <input type="file" id="file-input" multiple onChange={(event) => { setFiles(event.target.files) }} accept="image/*" />

                        {files && <Carousel className="w-full bg-cyan-50 p-2 px-5 border border-cyan-700 my-2" id='slider'>
                            <CarouselContent className="w-full bg-cyan-50 flex flex-row justify-center items-center">
                                {files && Array.from(files).map((item, index) => (
                                    <CarouselItem key={index} className="basis-1/4">
                                        <img src={`${URL.createObjectURL(item)}`} />
                                    </CarouselItem>

                                ))}
                            </CarouselContent >
                            <CarouselPrevious className="ml-14 " />
                            <CarouselNext className="mr-14" />
                        </Carousel>}

                    </div>

                    <div className="flex flex-col w-full justify-start items-start my-2">
                        <button className="bg-blue-600 px-3 py-1 text-lg font-medium text-white
                        border border-blue-700 shadow shadow-cyan-400 hover:scale-110"
                            onClick={(event) => {
                                event.preventDefault();
                                onSubmitForm()
                            }}>Thêm đánh giá</button>
                    </div>


                </div>
            </form>
            <BottomNotify message={notifyMessage} notifyCate={notifyCate} notifyState={notifyState} />
        </div>

    );
}