'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';
import { LocateIcon, SearchIcon } from 'lucide-react';
import { DatePickerWithRange } from './DayRangePicker';

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const SearchForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center w-full justify-stretch'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='w-[35%]'>
              <Popover>
                <PopoverTrigger className='flex flex-col gap-3 w-full'>
                  <FormLabel className='text-white'>
                    Thành phố, địa điểm hoặc tên khách sạn:
                  </FormLabel>
                  <FormControl className='w-full'>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='w-full'>
                        <Input
                          className='w-full rounded-none rounded-s-2xl py-4'
                          placeholder='Thành phố, địa điểm hoặc tên khách sạn:'
                          {...field}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-full'>
                        <DropdownMenuLabel className='w-[350px]'>
                          Điạ điểm đến phổ biến
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem  className='flex justify-between items-center'>
                          <div className='flex flex-col justify-start gap-1'>
                            <p className='font-semibold'>Đà Nẳng</p>
                            <p className='text-sm'>Việt Nam</p>
                          </div>
                          <div className='flex flex-col justify-end gap-1'>
                            <p className='tag'>Vùng</p>
                            <p className='text-[12px] text-gray-500'>
                              1.728 khách sạn
                            </p>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex justify-between items-center'> 
                          <div className='flex flex-col justify-start gap-1'>
                            <p className='font-semibold'>Đà Nẳng</p>
                            <p className='text-sm'>Việt Nam</p>
                          </div>
                          <div className='flex flex-col justify-end gap-1'>
                            <p className='tag'>Vùng</p>
                            <p className='text-[12px] text-gray-500'>
                              1.728 khách sạn
                            </p>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex justify-between items-center'> 
                          <div className='flex flex-col justify-start gap-1'>
                            <p className='font-semibold'>Đà Nẳng</p>
                            <p className='text-sm'>Việt Nam</p>
                          </div>
                          <div className='flex flex-col justify-end gap-1'>
                            <p className='tag'>Vùng</p>
                            <p className='text-[12px] text-gray-500'>
                              1.728 khách sạn
                            </p>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex justify-between items-center'> 
                          <div className='flex flex-col justify-start gap-1'>
                            <p className='font-semibold'>Đà Nẳng</p>
                            <p className='text-sm'>Việt Nam</p>
                          </div>
                          <div className='flex flex-col justify-end gap-1'>
                            <p className='tag'>Vùng</p>
                            <p className='text-[12px] text-gray-500'>
                              1.728 khách sạn
                            </p>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </PopoverTrigger>
                <PopoverContent>
                  Place content for the popover here.
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-[30%]'>
              <FormLabel className='text-white '>
                Ngày nhận phòng và trả phòng:
              </FormLabel>
              <FormControl>
                <DatePickerWithRange />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='w-[35%]'>
              <Popover>
                <PopoverTrigger className='flex flex-col gap-3 w-full'>
                  <FormLabel className='text-white'>Khách và Phòng</FormLabel>
                  <FormControl className='w-full'>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='w-full'>
                        <Input
                          className='w-full rounded-none  py-4'
                          placeholder='3 người lớn, 0 Trẻ em, 1 phòng'
                          {...field}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='flex justify-between items-center'> Profile</DropdownMenuItem>
                        <DropdownMenuItem className='flex justify-between items-center'> Billing</DropdownMenuItem>
                        <DropdownMenuItem className='flex justify-between items-center'> Team</DropdownMenuItem>
                        <DropdownMenuItem className='flex justify-between items-center'> Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </PopoverTrigger>
                <PopoverContent>
                  Place content for the popover here.
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <Button
          variant={'secondary'}
          type='submit'
          className='bg-orange-500 mt-[27px] rounded-none rounded-e-2xl'>
          <SearchIcon color='#FFF' />
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
