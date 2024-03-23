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
import { DatePickerWithRange } from './DayRangePicker';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';

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

const SearchForm = () => {
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

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(rangeDay) {
      formData.check_in = rangeDay?.from;
      formData.check_out = rangeDay?.to ;
    }

    
    console.log(formData);
  }

  return (
    <form
      className='flex items-center w-full justify-stretch'
      onSubmit={handleSubmit}>
      {/* {"City, region, country, hotel"} */}
      <div className='w-[30%] relative'>
        <label
          htmlFor='address'
          className='search-input-label'>
          Thành phố, địa điểm hoặc tên khách sạn:
        </label>
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
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-2xl  block w-full p-2.5 '
          placeholder='Thành phố, khách sạn, điểm đến'
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
        />{' '}
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className='absolute top-[80px] w-full bg-white rounded-2xl p-5 transition-transform '>
            <p className='text-black font-semibold p-2 border-b-[2px] border-[#000]'>
              Điểm đến nổi tiếng
            </p>
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
      <div className='w-[30%]'>
        <label className='search-input-label'>
          Ngày nhận phòng và trả phòng:
        </label>
        <DatePickerWithRange setRangeDay={setRangeDay} />
      </div>
      <div className='w-[30%]'>
        <label className='search-input-label'>Khách và Phòng</label>
        <DropdownMenu>
          <DropdownMenuTrigger className='bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>
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
                    className={`${
                      formData.amount_room <= 1 ? 'hover:cursor-alias' : ''
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
                    className={`${
                      formData.amount_adult <= 1 ? 'cursor-not-allowed' : ''
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
                    className={`${
                      formData.amount_children <= 0 ? 'cursor-not-allowed' : ''
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
      <Button
        variant={'secondary'}
        type='submit'
        className='bg-orange-500 mt-[30px]  rounded-none rounded-e-2xl'>
        <SearchIcon color='#FFF' />
      </Button>
    </form>
  );
};

export default SearchForm;
