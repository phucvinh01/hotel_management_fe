'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FileData } from './upload-image';
import { INeighborhoob } from '@/service/_neighborhook.service';
import FromInsertNeiborhood from './form-insert-neighborhood';
import URL_Enum from '@/axios/URL_Enum';

type formHotelInfoProps = {
  setFormData: Dispatch<SetStateAction<Hotel | undefined>>;
  data: Hotel | undefined;
  files: FileData[];
  setFiles: (files: FileData[]) => void;
  setNeighborhood: Dispatch<SetStateAction<INeighborhoob[]>>;
  neighborhood: INeighborhoob[];
};

const FormHotelInfo = ({
  setFormData,
  data,
  files,
  setFiles,
  setNeighborhood,
  neighborhood,
}: formHotelInfoProps) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState<any>();
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState<any>();
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    axios
      .get(`${URL_Enum.BaseURL_Api}address/provices`)
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `${URL_Enum.BaseURL_Api}address/provices/district?id=${selectedProvince.code}`,
        )
        .then((response) => {
          setDistricts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching districts:', error);
        });
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  const handleProvinceChange = (selectedOption: any) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(undefined);
  };

  const handleDistrictChange = (selectedOption: any) => {
    setSelectedDistrict(selectedOption);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    const fullAddress =
      e.target.value +
      ', ' +
      selectedDistrict.name +
      ', ' +
      selectedProvince.name;
    console.log(fullAddress);
    setFormData((prev) => ({ ...prev!, Address: fullAddress }));
  };

  return (
    <div className='flex flex-row gap-4 w-full'>
      <Card className='w-1/2'>
        <CardHeader className='flex flex-row justify-between items-center'>
          <CardTitle>Thông tin chung</CardTitle>
          <CardDescription>Chi tiết khách sạn</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='space-y-1'>
            <Label htmlFor='name'>Tên khách sạn</Label>
            <Input
              required
              value={data?.Name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev!, Name: e.target.value }))
              }
              id='name'
              type='text'
            />
          </div>
          <div className='space-y-1'>
            <div>
              <Label htmlFor='city'>Thành phố</Label>
              <Select
                name='city'
                onValueChange={(e) => handleProvinceChange(e)}>
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Thành phố</SelectLabel>
                    {provinces.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((item: any, index: number) => {
                      return (
                        <SelectItem
                          key={index}
                          value={item}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor='district'>Huyện</Label>
              <Select
                name='district'
                onValueChange={(e) => handleDistrictChange(e)}>
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Huyện</SelectLabel>
                    {districts.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((item: any, index: number) => {
                      return (
                        <SelectItem
                          key={index}
                          value={item}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1'>
              <Label htmlFor='strees'>Tên đường, xã</Label>
              <Input
                id='strees'
                type='text'
                value={address}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='phone'>Số điện thoại</Label>
            <Input
              value={data?.Telephone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev!, Telephone: e.target.value }))
              }
              id='phone'
              type='number'
              maxLength={10}
              minLength={10}
              max={10}
            />
          </div>
          <Card className=''>
            <CardHeader className='flex flex-row justify-between items-center'>
              <CardTitle>Thời gian làm việc</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center gap-10'>
              <div className='space-y-1'>
                <Label htmlFor='time-checkin'>Thời gian check-in</Label>
                <Input
                  value={data?.TimeCheckIn}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev!,
                      TimeCheckIn: e.target.value,
                    }))
                  }
                  type='time'
                  id='time-checkin'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='time-checkout'>Thời gian check-out</Label>
                <Input
                  value={data?.TimeCheckOut}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev!,
                      TimeCheckOut: e.target.value,
                    }))
                  }
                  type='time'
                  id='time-checkout'
                />
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card className='w-1/2'>
        <CardHeader className='flex flex-row justify-between items-center'>
          <CardTitle>Địa điểm lận cận</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <FromInsertNeiborhood neighborhood={neighborhood} setNeiborhood={setNeighborhood} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FormHotelInfo;
