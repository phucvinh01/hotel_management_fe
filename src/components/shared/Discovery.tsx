import { HotelIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'



const data = [
    {
        "id": 1,
        "name": "Việt Nam",
        "accommodation": 16763,
        "image": '/discovery/vietname.webp'
        },
         {
        "id": 2,
        "name": "Hàn quốc",
        "accommodation": 16763,
        "image": '/discovery/hanquoc.webp'
        }, {
        "id": 3,
        "name": "Indonesia",
        "accommodation": 16763,
        "image": '/discovery/indonesia.webp'
        }, {
        "id": 4,
        "name": "Malaysia",
        "accommodation": 16763,
        "image": '/discovery/malaysia.webp'
        }, {
        "id": 5,
        "name": "Thái Lan",
        "accommodation": 16763,
        "image": '/discovery/thailand.webp'
        }, {
        "id": 6,
        "name": "Singapo",
        "accommodation": 16763,
        "image": '/discovery/singapo.webp'
        },
]

const Discovery = () => {
  return (
    <section className='flex gap-4 flex-col g'>
        <div className='flex gap-3'>
            <HotelIcon />
            <p className='font-extrabold text-2xl'>Tái khám phá bản thân ở châu Á và những nơi khác</p>
        </div>
        <div className='grid grid-cols-3 gap-y-8'>
            {
                data.map((item) => 
                <div className='relative hover:cursor-pointer' key={item.id}>
                    <Image className='col-span-1 rounded-lg  '  src={item.image} height={210} width={384} alt={item.image} />
                    <div className='absolute p-6 top-0'>
                        <p className='text-white font-extrabold text-xl'>{item.name}</p>
                        <p className='text-white text-sm font-semibold'>{item.accommodation} accommadation</p>
                    </div>
                </div>
                )
            }
        </div>
    </section>
  )
}

export default Discovery