'use client';


import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAuth } from '@/hooks/useAuthContext';
import { getUserInfo, updateUserInfo } from '@/service/auth.service';
import { useEffect, useState } from 'react';
import splitDate from '@/lib/splitDate';


const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {

      message: 'Tên phải dài hơn hai ký tự',
    })
    .max(30, {
      message: 'Tên người dùng không được dài hơn 30 ký tự.',
    }),
  sex: z.string({
    required_error: 'Vui lòng chọn giới tính',
  }),
  day: z.string({
    required_error: 'Vui lòng chọn ngày để hiển thị.',
  }),
  month: z.string({
    required_error: 'Vui lòng chọn tháng để hiển thị.',
  }),
  year: z.string({
    required_error: 'Vui lòng chọn năm để hiển thị.',
  }),
  cccd: z
    .string({
      required_error: 'Căn cước công dân phải là 12 ký tự.',
    })
    .min(12)
    .max(12),

      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),

});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.

export function ProfileForm() {
  const { user } = useAuth();


  const [userInfo, setUserInfo] = useState<InfoUser | null | undefined>();
  const [splitDay, setSpitDay] = useState<DateParts | null>()



  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getUserInfo(user?.id as string);
      if (res) {
        setUserInfo(res);
        const daySplited = splitDate(res.DateOfBirth as string)
        setSpitDay(daySplited)
        console.log(typeof(splitDay?.day));
      }
    };
    fetchUserInfo();
  }, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: userInfo?.Name,
      cccd: userInfo?.CCCD,
      day: splitDay?.day,
      month:splitDay?.month,
      year:splitDay?.year,
      sex: userInfo?.Sex === 0 ? "Nam" : "Nữ"
      
    },
  });


  function onSubmit(data: ProfileFormValues) {

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });


    let gender = 0;
    if (data.sex === 'Nam') {
      gender = 0;
    } else {
      gender = 1;
    }

    let dob = `${data.day}/${data.month}/${data.year}`;

    const dataForm = {
      idAccount: user?.id,
      name: data.username,
      email: user?.email,
      phone: user?.Telephone,
      sex: gender,
      cccd: data.cccd,
      dob: dob,
    };

    const res = await updateUserInfo(dataForm);
    if (res) {
      const data = await getUserInfo(user?.id as string);
      toast({
        title: 'Data respone',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      setUserInfo(data)
    } else {
      toast({
        title: 'Failed',
      });
    }

  }

  const thirtyOneDays = getThirtyOneDays();
  const months = getMonths();
  const years = getYears();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đầy đủ</FormLabel>
              <FormControl>

                defaultValue={user?.name}

                  placeholder='shadcn'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tên trong hồ sơ được rút ngắn từ họ tên của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-4 justify-between'>

          <FormField
            control={form.control}
            name='sex'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={userInfo?.Name}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Giới tính' defaultValue={userInfo?.Sex === 0 ? "Nam": "Nữ"}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value={`Nam`}
                      textValue='Nam'>
                      Nam
                    </SelectItem>
                    <SelectItem
                      value={`Nữ`}
                      textValue='Nữ'>
                      Nữ
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-3'>
            <FormField
              control={form.control}
              name='day'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Ngày' defaultValue={`Ngày ${splitDay?.day}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {thirtyOneDays.map((item: string) => (
                        <SelectItem
                          key={item}
                          value={`${item}`}>
                          Ngày {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='month'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tháng sinh</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Tháng' defaultValue={splitDay?.month} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((item: any) => (
                        <SelectItem
                          key={item}
                          value={`${item}`}>
                          Tháng {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='year'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sinh</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Năm'  defaultValue={splitDay?.year} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map((item: any) => (
                        <SelectItem
                          key={item}
                          value={`${item}`}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='cccd'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Căn cước công dân của bạn là gì </FormLabel>
              <FormControl>
                <Input
                defaultValue={userInfo?.CCCD}
                  placeholder='shadcn'
                  {...field}
                />
              </FormControl>
              <FormDescription>Căn cước công dân gắn chíp</FormDescription>

        <FormField
          control={form.control}
          name='sex'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới tính</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Giới tính' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={`Nam`}>Nam</SelectItem>
                  <SelectItem value={`Nữ`}>Nữ</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-3'>
        <FormField
          control={form.control}
          name='day'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Ngày' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {thirtyOneDays.map((item: string) => (
                    <SelectItem
                      key={item}
                      value={`${item}`}>
                      Ngày {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='month'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tháng sinh</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Tháng' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map((item: any) => (
                    <SelectItem
                      key={item}
                      value={`${item}`}>
                      Tháng {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='year'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Năm sinh</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Năm' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((item: any) => (
                    <SelectItem
                      key={item}
                      value={`${item}`}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type='submit' variant={'secondary'} className='button-primary'>Cập nhật</Button>
      </form>
    </Form>
  );
}
