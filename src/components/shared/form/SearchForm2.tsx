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

const SearchForm2 = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<SearchForm>(initForm);
    const [rangeDay, setRangeDay] = useState<DateRange | undefined>();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLInputElement>(null);

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
                    className='h-12 bg-blue-200 border border-blue-200 text-white text-lg rounded-lg 
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
            <div className='w-11/12 lg:w-[30%] mx-3 my-4 lg:my-0'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-blue-200 border font-bold border-blue-200 text-white text-lg
                    outline outline-none text-left
           focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 h-[36px] rounded-lg'>
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
                    className='bg-white w-full h-12  rounded-lg text-blue-700'>
                    <SearchIcon color='#0000FF' />
                    Tìm khách sạn
                </Button>
            </div>
        </form>
    );
};

export default SearchForm2;
