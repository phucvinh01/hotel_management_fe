'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TabsContent } from '@/components/ui/tabs'
import axios from 'axios'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

const FormHotelInfo = ({setFormData, data}:{setFormData: Dispatch<SetStateAction<IHotel | undefined>>, data:IHotel | undefined}) => {
const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState<any>();
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState<any>();

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh/thành phố
    axios.get('https://vnprovinces.pythonanywhere.com/api/provinces/?is_border=false&is_coastal=false&basic=true&limit=100')
      .then(response => {
        setProvinces(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  useEffect(() => {
    // Nếu tỉnh được chọn, gọi API để lấy danh sách huyện/quận
    if (selectedProvince) {
      axios.get(`https://vnprovinces.pythonanywhere.com/api/provinces/${selectedProvince}/?basic=true
`)
        .then(response => {
          setDistricts(response.data.districts);
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  const handleProvinceChange = (selectedOption:any) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(undefined); // Đặt lại huyện/quận khi tỉnh/thành phố thay đổi
  };

  const handleDistrictChange = (selectedOption:any) => {
    setSelectedDistrict(selectedOption);
  };
  return (
        <div className='flex flex-row gap-4 w-full'>
          <Card className='w-2/3'>
            <CardHeader className='flex flex-row justify-between items-center'>
              <CardTitle>Thông tin chung</CardTitle>
              <CardDescription>Chi tiết khách sạn</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='name'>Tên khách sạn</Label>
                <Input
                value={data?.Name}
                 onChange={(e) => setFormData((prev) => ({ ...prev!, Name: e.target.value }))}
                  id='name'
                  type='text'
                />
              </div>
              <div className='space-y-1'>
                <div>
                  <Label htmlFor='city'>Thành phố</Label>
                  <Select name='city' 
                  value={selectedProvince}
                  onValueChange={(e) =>handleProvinceChange(e)}>
                    <SelectTrigger className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Thành phố</SelectLabel>
                        {
                          provinces.map((item:any, index:number) => {
                            return (
                              <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                            )
                          })
                          }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor='district'>Huyện</Label>
                  <Select name='district'
                  value={selectedDistrict}
                  onValueChange={(e) =>handleDistrictChange(e)}>
                    <SelectTrigger className='w-full'>
                      <SelectValue  />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Huyện</SelectLabel>
                        {
                          districts.map((item:any, index:number) => {
                            return (
                              <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                            )
                          })
                          }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='strees'>Tên đường, xã</Label>
                  <Input
                    id='strees'
                    type='text'
                    value={data?.Address}
                 onChange={(e) => setFormData((prev) => ({ ...prev!, Address:`${e.target.value}, ${selectedDistrict}, ${selectedProvince}` }))}
                  />
                </div>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='phone'>Số điện thoại</Label>
                <Input
                value={data?.Telephone}
                 onChange={(e) => setFormData((prev) => ({ ...prev!, Telephone: e.target.value }))}
                  id='phone'
                  type='tel'
                />
              </div>
            </CardContent>
          </Card>
           <Card className='w-1/3'>
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle>Thời gian làm việc</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='time-checkin'>Thời gian check-in</Label>
              <Input
              value={data?.TimeCheckIn}
                 onChange={(e) => setFormData((prev) => ({ ...prev!, TimeCheckIn: e.target.value }))}
                type='time'
                id='time-checkin'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='time-checkout'>Thời gian check-out</Label>
              <Input
              value={data?.TimeCheckOut}

                 onChange={(e) => setFormData((prev) => ({ ...prev!, TimeCheckOut: e.target.value }))}
                type='time'
                id='time-checkout'
              />
            </div>
          </CardContent>
        </Card>

          {/* <Card className='w-1/2'>
            <CardHeader className='flex flex-row justify-between items-center'>
              <CardTitle>Thông tin liên hệ</CardTitle>
            </CardHeader >
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='fullname'>Họ và tên</Label>
                <Input
                  id='fullname'
                  defaultValue='Pedro Duarte'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='email-contact'>Địa chỉ email</Label>
                <Input id='email-contact' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='phone-contact'>Số điện thoại</Label>
                <Input
                  id='phone-contact'
                  type='tel'
                />
              </div>
            </CardContent>
          </Card> */}
        </div>
  )
}

export default FormHotelInfo