import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { Select } from '@radix-ui/react-select';
import { Dispatch, SetStateAction } from 'react';
import CarouselImageTypeRoom from './casousel-image-typeroom';

type FormEditTypeRoomProps = {
  formData: SelectTypeRoom | undefined;
  setFormData: Dispatch<SetStateAction<SelectTypeRoom | undefined>>;
  imageTypeRoom: IHotelImage[] | undefined;
  className?: string;
};

const FormEditTypeRoom = ({
  formData,
  setFormData,
  imageTypeRoom,
  className,
}: FormEditTypeRoomProps) => {
  return (
    <div className={`grid grid-cols-12 gap-10 ${className} overflow-y-scroll max-h-[480px]`}>
      <div className='col-span-6 grid grid-cols-12 gap-2'>
        <h3 className=' col-span-12 text-[18px] underline my-2 font-bold'>
          Thông tin
        </h3>

        <div className='flex space-y-2 flex-col col-span-6'>
          <Label
            htmlFor='name'
            className='text-start'>
            Tên Loại Phòng
          </Label>
          <Input
            value={formData?.Name}
            required
            id='name'
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev!,
                Name: e.target.value,
              }))
            }
          />
        </div>
        <div className='flex space-y-2 flex-col col-span-6'>
          <Label
            htmlFor='floor'
            className='text-start'>
            Số sảnh
          </Label>
          <Input
            value={formData?.FloorArea}
            min={1}
            maxLength={4}
            id='floor'
            type='number'
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev!,
                FloorArea: e.target.value,
              }))
            }
          />
        </div>
        <div className='flex space-y-2 flex-col col-span-6'>
          <Label
            htmlFor='people'
            className='text-start'>
            Số người tối đa
          </Label>
          <Input
            value={formData?.MaxQuantityMember}
            min={1}
            maxLength={4}
            id='people'
            type='number'
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev!,
                MaxQuantityMember: e.target.value,
              }))
            }
          />
        </div>
        <div className='flex space-y-2 flex-col col-span-6'>
          <Label
            htmlFor='Price'
            className='text-start'>
            Giá
          </Label>
          <Input
            value={formData?.Price}
            min={0}
            maxLength={8}
            id='Price'
            type='number'
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev!,
                Price: e.target.value,
              }))
            }
          />
        </div>
        <h3 className=' col-span-12 text-[18px] underline my-3 font-bold'>
          Tiện nghi
        </h3>
        <div className='flex space-y-2 flex-col col-span-6'>
          <Label
            htmlFor='typebed'
            className='text-start'>
            Giường
          </Label>
          <Select
            defaultValue={formData?.TenLoaiGiuong}
            name='typebed'
            required
            onValueChange={(e) =>
              setFormData((prev) => ({ ...prev!, TenLoaiGiuong: e }))
            }>
            <SelectTrigger className=''>
              <SelectValue placeholder='Chọn loại giường' />
            </SelectTrigger>
            <SelectContent className='bg-white text-black dark:bg-black dark:text-white'>
              <SelectGroup>
                <SelectItem value={'Single'}>Single</SelectItem>
                <SelectItem value={'Double'}>Double</SelectItem>
                <SelectItem value={'Queen'}>Queen</SelectItem>
                <SelectItem value={'King'}>King</SelectItem>
                <SelectItem value={'Superking'}>Super king</SelectItem>
                <SelectItem value={'Murphy'}>Murphy</SelectItem>
                <SelectItem value={'Bunk'}>Bunk</SelectItem>
                <SelectItem value={'Round'}>Round</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex space-y-2 flex-col col-span-6'>
          <Label
            htmlFor='bed-quantity'
            className='text-start'>
            Số lượng giường
          </Label>
          <Input
            value={formData?.SoLuongGiuong}
            min={0}
            maxLength={8}
            id='bed-quantity'
            type='number'
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev!,
                SoLuongGiuong: e.target.value,
              }))
            }
          />
        </div>

        <h3 className=' col-span-12 text-[18px] underline my-2 font-bold'>
          Tiện ích
        </h3>

        <div className='grid grid-cols-12 col-span-12 px-3'>
          <h4 className='col-span-12 my-3 font-bold'>Phòng</h4>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              defaultChecked={
                formData?.Ban_Cong_San_Hien === 1 ? true : false
              }
              id='bacon'
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Ban_Cong_San_Hien: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='bacon'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Ban công
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              defaultChecked={formData?.Khu_Vuc_Cho === 1 ? true : false}
              id='wating-room'
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Khu_Vuc_Cho: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='wating-room'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Khu vực chờ
            </label>
          </div>
        </div>

        <div className='grid grid-cols-12 col-span-12 px-3'>
          <h4 className='col-span-12 my-3 font-bold'>Phòng tắm</h4>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              defaultChecked={formData?.Voi_Tam_Dung === 1 ? true : false}
              id='shower'
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Voi_Tam_Dung: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='shower'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Vòi tắm đứng
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              defaultChecked={formData?.Bon_Tam === 1 ? true : false}
              id='bath'
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Bon_Tam: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='bath'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Bồn tắm
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              defaultChecked={formData?.Nuoc_Nong === 1 ? true : false}
              id='hotwater'
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Nuoc_Nong: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='hotwater'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Nước nóng
            </label>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-2 col-span-12 px-3'>
          <h4 className='col-span-12 my-3'>Khác</h4>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              defaultChecked={formData?.May_Lanh === 1 ? true : false}
              id='air-machine'
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  May_Lanh: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='air-machine'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Máy lạnh
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              defaultChecked={formData?.Lo_Vi_Song === 1 ? true : false}
              id='microway'
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Lo_Vi_Song: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='microway'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Lò vi sóng
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              defaultChecked={formData?.May_Giat === 1 ? true : false}
              id='watsing-machine'
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  May_Giat: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='cancel'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Máy giặt
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              id='frige'
              defaultChecked={formData?.Tu_Lanh === 1 ? true : false}
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Tu_Lanh: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='frige'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Tủ lạnh
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              id='fax'
              defaultChecked={formData?.No_Moking === 1 ? true : false}
              onCheckedChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  No_Moking: e ? 1 : 0,
                }))
              }
            />
            <label
              htmlFor='fax'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Được hút thuốc
            </label>
          </div>
        </div>
      </div>
      <div className='col-span-12 grid place-items-center p-2'>
        <CarouselImageTypeRoom listData={imageTypeRoom} typeroom={formData?.id} hotel={formData?.HotelId} />
      </div>
    </div>
  );
};

export default FormEditTypeRoom;
