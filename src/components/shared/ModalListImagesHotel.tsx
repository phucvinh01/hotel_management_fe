import URL_Enum from "@/axios/URL_Enum";
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
interface IProps {
    listImages: IHotelImage[];
    modalState: boolean;
    currentImage: number;
    setModalState: (modalState: boolean) => void;
}
const ModallistImagessHotel = (props: IProps) => {
    const { listImages, modalState, currentImage, setModalState } = props;
    const [listImagesTemp, setListImagesTemp] = useState<IHotelImage[]>(listImages);
    const [indexImageModal, setIndexImageModal] = useState<number>(currentImage);
    const [imageModalCurrent, setImageModalCurrent] = useState<string>(URL_Enum.BaseURL_Image + (listImagesTemp && listImagesTemp[indexImageModal]?.FileName));
    const getListTypeImage = (): TypeImage[] => {
        var listTypes: TypeImage[] = [];
        listTypes.push({ TypeName: 'Tất cả', Total: listImages?.length, FirstImage: null });
        listImages?.map((item) => {
            var listType = { TypeName: item.TypeRoom?.split(';')[1], Total: 0, FirstImage: null };
            listImages.map((jItem) => {
                if (jItem.TypeRoom?.split(';')[1] === listType.TypeName) {
                    listType.Total += 1;
                }
            });
            if (!listTypes.find((item) => {
                return item.TypeName === listType.TypeName;
            })) {
                listTypes.push(listType);
            }
        });
        return listTypes;
    }

    const getListImagesTemp = (TypeImage: string) => {
        if (TypeImage === 'Tất cả') {
            setListImagesTemp(listImages);
        }
        else {
            setListImagesTemp(listImages.filter((item) => {
                return item.TypeRoom?.split(';')[1] === TypeImage;
            }));
        }
        setIndexImageModal(0);
        setImageModalCurrent(URL_Enum.BaseURL_Image + listImagesTemp[0].FileName);
    }

    const handleNextImage = () => {
        if (indexImageModal >= listImagesTemp.length - 1) {
            setIndexImageModal(0);
            setImageModalCurrent(URL_Enum.BaseURL_Image + listImagesTemp[0].FileName);
        }
        else {
            setIndexImageModal(indexImageModal + 1);
            setImageModalCurrent(URL_Enum.BaseURL_Image + listImagesTemp[indexImageModal + 1].FileName);
        }

    }
    const handlePreviousImage = () => {
        if (indexImageModal == 0) {
            setIndexImageModal(listImagesTemp.length - 1);
            setImageModalCurrent(URL_Enum.BaseURL_Image + listImages[listImagesTemp.length - 1].FileName);
        }
        else {
            setIndexImageModal(indexImageModal - 1);
            setImageModalCurrent(URL_Enum.BaseURL_Image + listImagesTemp[indexImageModal - 1].FileName);
        }

    }
    const handleFillterList = (TypeName: string) => {
        getListImagesTemp(TypeName);
        setIndexImageModal(0);
        setImageModalCurrent(TypeName !== 'Tất cả' ? URL_Enum.BaseURL_Image +
            listImages.filter((item) => {
                return item.TypeRoom?.split(';')[1] === TypeName;
            })[0]?.FileName : URL_Enum.BaseURL_Image + listImages[0]?.FileName
        );
    }
    return (
        <div className={`w-full ${modalState ? 'block' : 'hidden'} h-full flex
        z-50 fixed inset-0 justify-center items-center`} style={{ background: 'rgb(0 0 0 / 85%)' }}>
            <div className="w-9/12 h-[95%] flex flex-col rounded-2xl
                bg-black opacity-100">
                <div className="flex flex-row w-full relative p-3">
                    <p className="font-bold text-xl text-white">Hình ảnh của khách sạn</p>
                    <button className="absolute right-5 top-5" onClick={() => {
                        setModalState(false);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-whiten w-8 h-8">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>

                    </button>
                </div>
                <div className="flex flex-col justify-center items-center relative">
                    <img src={imageModalCurrent}
                        className="w-8/12 rounded-lg max-h-[380px]" />
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

                    <p className="font-bold text-xl text-white absolute
                            left-49 bottom-0 m-5 p-2 rounded-lg bg-black opacity-50">
                        {listImagesTemp && listImagesTemp[indexImageModal].TypeRoom?.split(';')[1]}
                    </p>

                </div>
                {/* list hinh anh */}
                <div className="flex flex-col px-3 w-full mt-4 justify-center items-center">
                    <Carousel className="w-full" id='slider'>
                        <CarouselContent className="">
                            {getListTypeImage().map((item, index) => (
                                <CarouselItem key={index} className="basis-1/5">
                                    <p className="text-white font-bold bg-slate-600 text-center
                                    py-2 rounded-md cursor-pointer"
                                        onClick={() => { handleFillterList(item.TypeName) }}>{item.TypeName + ' (' + item.Total + ')'} </p>
                                </CarouselItem>
                            ))}
                        </CarouselContent >
                        {/* <CarouselPrevious className="ml-10 " />
                                <CarouselNext className="mr-10" /> */}
                    </Carousel>
                </div>

                <div className="flex flex-col px-3 w-full justify-center items-center mt-4">
                    <Carousel className="w-full" id='slider'>
                        <CarouselContent className="">
                            {listImagesTemp?.map((item, index) => (
                                <CarouselItem key={item.id} className="basis-1/5">
                                    <img src={`${URL_Enum.BaseURL_Image}${item.FileName}`}
                                        alt={item.FileName} className={`w-full
                                                h-[70px] rounded-lg object-cover cursor-pointer
                                                ${indexImageModal === index ? 'border border-b-2 border-blue-700' : ''}`}
                                        onClick={() => {
                                            setIndexImageModal(index);
                                            setImageModalCurrent(URL_Enum.BaseURL_Image + listImagesTemp[index].FileName);
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
export default ModallistImagessHotel;