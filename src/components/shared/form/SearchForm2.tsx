'use client';;
import { Button } from '@/components/ui/button';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import {
    BabyIcon,
    HomeIcon,
    MinusIcon,
    PersonStandingIcon,
    PlusIcon,
    SearchIcon,
} from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange2 } from './DayRangePicker2';

const dropDownData: SuggestLocationSearch[] = [
    {
        city: 'Đà Nẵng',
        country: 'Việt Nam',
        tag: 'Vùng',
        num_of_hotel: 1777,
    },
    {
        city: 'Nha Trang',
        country: 'Việt Nam',
        tag: 'Vùng',
        num_of_hotel: 1777,
    },
    {
        city: 'Đà Lạt',
        country: 'Việt Nam',
        tag: 'Thành Phố',
        num_of_hotel: 1777,
    },
    {
        city: 'Hồ Chí Minh',
        country: 'Việt Nam',
        tag: 'Thành Phố',
        num_of_hotel: 1777,
    },
];

const initForm: SearchForm = {
    address: '',
    amount_room: 1,
    check_in: new Date(),
    check_out: new Date(),
    amount_adult: 0,
    amount_children: 0,
};
interface searchForm2Props {
    //currentAddress: string;
    currentScreen: string;
    handleGoToElement: (KeyElement: string) => void;
}

const SearchForm2 = (props: searchForm2Props) => {
    const { currentScreen, handleGoToElement } = props;
    const [scrollYSearchForm2, setScrollYSearchForm2] = useState<number>(0);
    const [scroll, setScroll] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<SearchForm>(initForm);
    const [rangeDay, setRangeDay] = useState<DateRange | undefined>();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollYSearchForm2(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        if (scrollY > 20) {
            setScroll(true);
        } else {
            setScroll(false);
        }
        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [scrollY]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (rangeDay) {
            formData.check_in = rangeDay?.from;
            formData.check_out = rangeDay?.to;
        }


        console.log(formData);
    }


    return (
        <div className={` z-[999] w-full ${scrollY > 20 ? 'fixed top-0' : ''} mb-[70px] `}>
            <form
                className='flex flex-col lg:flex-row  justify-center  items-center w-full py-6
                bg-gradient-to-b from-sky-700 via-sky-500 to-blue-500'
                onSubmit={handleSubmit}>
                {/* {"City, region, country, hotel"} */}
                <div className='w-11/12 lg:w-[30%] relative mx-3 my-4 lg:my-0'>
                    <span className='absolute pt-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-700">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>

                    </span>
                    <input
                        ref={inputRef}
                        required
                        value={formData.address}
                        onBlur={() => {
                            // Nếu click vào component gợi ý, không ẩn suggestions
                            if (!suggestionsRef.current) {
                                setShowSuggestions(false);
                            }
                        }}
                        onFocus={() => {
                            setShowSuggestions(true);
                        }}
                        type='text'
                        id='address'
                        name='address'
                        className='h-12 bg-blue-200 border border-blue-200 text-white text-lg rounded-3xl 
                     w-full font-bold pl-6  cursor-pointer hover:bg-white hover:text-black'
                        placeholder='Thành phố, khách sạn, điểm đến'
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, address: e.target.value }))
                        }
                    />{' '}
                    {showSuggestions && (
                        <div
                            ref={suggestionsRef}
                            className='z-20 absolute top-[40px] w-full bg-white rounded-2xl p-5 transition-transform '>
                            {dropDownData.map((data) => (
                                <div
                                    key={data.city}
                                    className='flex justify-between mt-4 border-b cursor-pointer'
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            address: `${data.city}, ${data.country}`,
                                        }))
                                    }>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-medium'>{data.city}</p>
                                        <p className='text-xs text-gray'>{data.country}</p>
                                    </div>
                                    <div className='flex flex-col gap-1 items-end'>
                                        <p className='tag px-1 text-sm'>{data.tag}</p>
                                        <p className='text-xs text-gray'>{data.num_of_hotel}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='w-11/12 lg:w-[30%] mx-3 my-4 lg:my-0'>
                    <DatePickerWithRange2 setRangeDay={setRangeDay} />
                </div>
                <div className='w-11/12 lg:w-[30%] mx-3 my-4 lg:my-0 z-[99999]'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='bg-blue-200 border font-bold border-blue-200 text-white text-lg
                    outline outline-none text-left z-[99999]
           focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 h-[36px] rounded-3xl'>
                            {formData.amount_adult} người lớn, {formData.amount_children} Trẻ
                            em, {formData.amount_room} phòng
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className='container flex gap-4 flex-col py-4 w-[330px]'>
                                <div className='flex justify-between items-center '>
                                    <div className='flex gap-3'>
                                        <HomeIcon className='text-cyan-500' />
                                        <p>Số phòng</p>
                                    </div>
                                    <div className='flex gap-3 justify-center items-center'>
                                        <Button
                                            className={`${formData.amount_room <= 1 ? 'hover:cursor-alias' : ''
                                                }`}
                                            disabled={formData.amount_room <= 1}
                                            onClick={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    amount_room: prev.amount_room - 1,
                                                }))
                                            }
                                            variant={'ghost'}>
                                            <MinusIcon className='text-cyan-500' />
                                        </Button>
                                        <p className='px-1 border-b border-[#333]'>
                                            {formData.amount_room}
                                        </p>
                                        <Button
                                            onClick={() => {
                                                if (formData.amount_room >= formData.amount_adult) {
                                                    toast({
                                                        variant: 'destructive',
                                                        title: 'Uh oh! Something went wrong.',
                                                    });
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        amount_room: formData.amount_adult,
                                                    }));
                                                } else
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        amount_room: formData.amount_room + 1,
                                                    }));
                                            }}
                                            variant={'ghost'}>
                                            <PlusIcon className='text-cyan-500' />
                                        </Button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center '>
                                    <div className='flex gap-3'>
                                        <PersonStandingIcon className='text-cyan-500' />
                                        <p>Người lớn</p>
                                    </div>
                                    <div className='flex gap-3 justify-center items-center'>
                                        <Button
                                            className={`${formData.amount_adult <= 1 ? 'cursor-not-allowed' : ''
                                                }`}
                                            disabled={formData.amount_adult <= 1}
                                            onClick={() =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    amount_adult: formData.amount_adult - 1,
                                                }))
                                            }
                                            variant={'ghost'}>
                                            <MinusIcon className='text-cyan-500' />
                                        </Button>
                                        <p className='px-1 border-b border-[#333]'>
                                            {formData.amount_adult}
                                        </p>
                                        <Button
                                            onClick={() =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    amount_adult: formData.amount_adult + 1,
                                                }))
                                            }
                                            variant={'ghost'}>
                                            <PlusIcon className='text-cyan-500' />
                                        </Button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center '>
                                    <div className='flex gap-3'>
                                        <BabyIcon className='text-cyan-500' />
                                        <p>Trẻ em</p>
                                    </div>
                                    <div className='flex gap-3 justify-center items-center'>
                                        <Button
                                            className={`${formData.amount_children <= 0 ? 'cursor-not-allowed' : ''
                                                }`}
                                            disabled={formData.amount_children <= 0}
                                            onClick={() =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    amount_children: formData.amount_children - 1,
                                                }))
                                            }
                                            variant={'ghost'}>
                                            <MinusIcon className='text-cyan-500' />
                                        </Button>
                                        <p className='px-1 border-b border-[#333]'>
                                            {formData.amount_children}
                                        </p>
                                        <Button
                                            onClick={() =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    amount_children: formData.amount_children + 1,
                                                }))
                                            }
                                            variant={'ghost'}>
                                            <PlusIcon className='text-cyan-500' />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='w-11/12 lg:w-[10%] mx-3 my-4 lg:my-0 flex justify-center items-center'>
                    <Button
                        variant={'secondary'}
                        type='submit'
                        className='bg-white w-full h-12  rounded-3xl text-blue-700'>
                        <SearchIcon color='#0000FF' />
                        Tìm khách sạn
                    </Button>
                </div>
            </form>

            {/* handle scroll */}
            <div className='w-full flex flex-row items-start justify-center px-4 bg-slate-50 absolute
            shadow-2 shadow-gray-500'>
                <div className='w-8/12 flex flex-row py-1 px-5'>
                    <p className={`text-gray-700 text-xl cursor-pointer ${currentScreen == 'TongQuan' ? 'border-b-2 border-blue-700' : 'border-none'}
                p-3 transition ease-in-out duration-500`} onClick={() => { handleGoToElement('TongQuan') }}><b>Tổng quan</b></p>
                    <p className={`text-gray-700 text-xl cursor-pointer  ${currentScreen == 'Phong' ? 'border-b-2 border-blue-700' : 'border-none'}
                p-3 transition ease-in-out duration-500`} onClick={() => { handleGoToElement('Phong') }}><b>Phòng</b></p>
                    <p className={`text-gray-700 text-xl cursor-pointer ${currentScreen == 'ViTri' ? 'border-b-2 border-blue-700' : 'border-none'}
                p-3 transition ease-in-out duration-500`} onClick={() => { handleGoToElement('ViTri') }}><b>Vị trí</b></p>
                    <p className={`text-gray-700 text-xl cursor-pointer ${currentScreen == 'TienIch' ? 'border-b-2 border-blue-700' : 'border-none'}
                p-3 transition ease-in-out duration-500`} onClick={() => { handleGoToElement('TienIch') }}><b>Tiện ích</b></p>
                    <p className={`text-gray-700 text-xl cursor-pointer ${currentScreen == 'ChinhSach' ? 'border-b-2 border-blue-700' : 'border-none'}
                p-3 transition ease-in-out duration-500`} onClick={() => { handleGoToElement('ChinhSach') }}><b>Chính sách</b></p>
                    <p className={`text-gray-700 text-xl cursor-pointer ${currentScreen == 'DanhGia' ? 'border-b-2 border-blue-700' : 'border-none'}
                p-3 transition ease-in-out duration-500`} onClick={() => { handleGoToElement('DanhGia') }}><b>Đánh giá</b></p>
                </div>
                <div className='flex flex-row w-4/12 justify-end items-center py-1 px-5'>
                    <a href='#' className='flex flex-row justify-end items-center'> <p className=' text-xl p-3 font-bold text-cyan-500'>Lên đầu trang</p>
                        <span ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-up text-cyan-500 font-bold" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4" />
                        </svg></span>
                    </a>


                </div>
            </div>
        </div>

    );
};

export default SearchForm2;
