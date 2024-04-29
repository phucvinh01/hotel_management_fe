import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TabsContent } from '@/components/ui/tabs'
import React, { SetStateAction } from 'react'

const FormHotelInfo = () => {
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
                  id='name'
                  defaultValue='Pedro Duarte'
                />
              </div>
              <div className='space-y-1'>
                <div>
                  <Label htmlFor='city'>Thành phố</Label>
                  <Select name='city'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a fruit' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Thành phố</SelectLabel>
                        <SelectItem value='apple'>Apple</SelectItem>
                        <SelectItem value='banana'>Banana</SelectItem>
                        <SelectItem value='blueberry'>Blueberry</SelectItem>
                        <SelectItem value='grapes'>Grapes</SelectItem>
                        <SelectItem value='pineapple'>Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor='district'>Huyện</Label>
                  <Select name='district'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a fruit' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Huyện</SelectLabel>
                        <SelectItem value='apple'>Apple</SelectItem>
                        <SelectItem value='banana'>Banana</SelectItem>
                        <SelectItem value='blueberry'>Blueberry</SelectItem>
                        <SelectItem value='grapes'>Grapes</SelectItem>
                        <SelectItem value='pineapple'>Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='strees'>Tên đường, xã</Label>
                  <Input
                    id='strees'
                    defaultValue='Pedro Duarte'
                  />
                </div>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='phone'>Số điện thoại</Label>
                <Input
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
                type='time'
                id='time-checkin'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='time-checkout'>Thời gian check-out</Label>
              <Input
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