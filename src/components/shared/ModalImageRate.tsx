import URL_Enum from "@/axios/URL_Enum";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react";

interface IProps {
    listImageRate: string[];
    modalImageRateState: boolean;
    setModalImageRateState: (modalImageRateState: boolean) => void;
}
const ModalImageRate = (props: IProps) => {
    const { listImageRate, modalImageRateState, setModalImageRateState } = props;
    const [indexImageRateModal, setIndexImageRateModal] = useState<number>(0);
    const [imageModalCurrent, setImageModalCurrent] = useState<string>(URL_Enum.BaseURL_Rate + (listImageRate[0]));

    const handleNextImage = () => {
        if (indexImageRateModal >= listImageRate.length - 1) {
            setIndexImageRateModal(0);
            setImageModalCurrent(URL_Enum.BaseURL_Rate + listImageRate[0]);
        }
        else {
            setIndexImageRateModal(indexImageRateModal + 1);
            setImageModalCurrent(URL_Enum.BaseURL_Rate + listImageRate[indexImageRateModal + 1]);
        }

    }
    const handlePreviousImage = () => {
        if (indexImageRateModal == 0) {
            setIndexImageRateModal(listImageRate.length - 1);
            setImageModalCurrent(URL_Enum.BaseURL_Rate + listImageRate[listImageRate.length - 1]);
        }
        else {
            setIndexImageRateModal(indexImageRateModal - 1);
            setImageModalCurrent(URL_Enum.BaseURL_Rate + listImageRate[indexImageRateModal - 1]);
        }

    }

    return (
        <div className={`w-full ${modalImageRateState ? 'block' : 'hidden'} h-full flex
        z-[999]9 fixed inset-0 justify-center items-center`} style={{ background: 'rgb(0 0 0 / 55%)' }}>
            <div className="w-9/12 h-[95%] flex flex-col rounded-2xl justify-center items-center
                bg-black opacity-100">
                <div className="flex flex-row w-full relative p-3">
                    <p className="font-bold text-xl text-white">Hình ảnh đánh giá từ người dùng</p>
                    <button className="absolute right-5 top-5" onClick={() => {
                        setModalImageRateState(false);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-whiten w-8 h-8">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>

                    </button>
                </div>
                <div className="w-full flex flex-col justify-center h-[77%] items-center relative">
                    <img src={imageModalCurrent.split('/')[imageModalCurrent.split('/').length - 1]
                        == 'undefined' ? URL_Enum.BaseURL_Rate + listImageRate[0]
                        : imageModalCurrent
                    } className="w-8/12 max-h-[380px] my-5" />
                    <button className="bg-black opacity-50 w-9 h-9 absolute text-center
                            justify-center items-center flex text-white left-2 ml-3 rounded-full"
                        onClick={() => handlePreviousImage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                        </svg>

                    </button>
                    <button className="bg-black opacity-50 w-9 h-9 absolute text-center
                            justify-center items-center flex text-white right-12 mr-3 rounded-full"
                        onClick={() => handleNextImage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>

                    </button>
                </div>
                <div className="flex flex-col px-3 w-full p-3 justify-center items-center">

                    <Carousel className="w-full min-w-[280px]" id='slider'>
                        <CarouselContent className="w-full">
                            {listImageRate?.map((item, index) => (
                                <CarouselItem key={item} className="basis-1/5">
                                    <img src={`${URL_Enum.BaseURL_Rate}${item}`}
                                        alt={item}
                                        className={`w-full h-[90px] rounded-lg object-cover cursor-pointer
                                                ${indexImageRateModal === index ? 'border border-b-2 border-blue-700' : ''}`}
                                        onClick={() => {
                                            setIndexImageRateModal(index);
                                            setImageModalCurrent(URL_Enum.BaseURL_Rate + listImageRate[index]);
                                        }} />
                                </CarouselItem>
                            ))}
                        </CarouselContent >
                        {/* <CarouselPrevious className="ml-10 " />
                                <CarouselNext className="mr-10" /> */}
                    </Carousel>
                </div>
            </div>
        </div>

    );
}
export default ModalImageRate;