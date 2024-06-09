'use client'

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import LocalStoreEnum from '@/axios/LocalStoreEnum';
import { getListBookingByGusetId } from '@/service/bookinghotel.service';
import { getListMessageByGusetId } from '@/service/message.service';
import FormatDate from '@/service/FormatDateString';
export default function ModalNotify() {
    const route = useRouter();
    const [userGuest, setUserGuest] = useState<IGuest>();
    const [listMessage, setListMessage] = useState<IMessage[]>([]);
    const getIGuest = () => {
        const IGusetStorage = (typeof localStorage !== undefined) ? localStorage.getItem(LocalStoreEnum.IGUEST) : null;
        console.log('IGusetStorage', IGusetStorage)
        if (IGusetStorage != null) {
            let jsonIGuest = JSON.parse(IGusetStorage);
            setUserGuest(jsonIGuest.result)
            console.log('userGuest', userGuest)
        }
    }

    const getData = () => {
        if (userGuest?.id != undefined) {
            const reponseHistory = getListMessageByGusetId(userGuest?.id)
                .then(response => {
                    setListMessage(response.result)
                    console.log('reponseHistory', response)
                }).catch((err) => {
                    console.log(err)
                }).finally(() => { })
        }
    }
    useEffect(() => {
        getIGuest();
    }, [])

    useEffect(() => {
        getData();
    }, [])

    return (<div className="flex felx-row bg-white">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className='relative h-8 w-8 rounded-full bg-white'>
                    <div className='relative rounded-full p-1 border border-r-blue-500 hover:bg-blue-500'>
                        <div className={`w-[8px] h-[8px] text-sm bg-red-500 rounded-full
                absolute top-0 right-0`}></div>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-bell text-blue-500 hover:text-white" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </svg>
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-[320px] dark:bg-black dark:text-white text-black bg-white z-[9999999]'
                align='end'
                forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-row space-y-1 w-full justify-center items-center'>
                        <p className='w-2/3 text-lg font-medium leading-none'>
                            Thông báo
                        </p>

                        {/* <Link href={'/app/hotel/lichsu?page=notify'} className='w-2/3 text-lg font-medium leading-none text-blue-500 bg-red-500'>
                            <p>Xem tất cả</p>
                        </Link> */}
                        <Button onClick={() => { route.push('/app/hotel/lichsu?page=notify') }} className='w-1/3 text-lg font-medium leading-none text-blue-700
                        hover:bg-slate-100 bg-white'>
                            Xem tất cả
                        </Button>

                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='p-0'>

                        {
                            listMessage != undefined && listMessage.length > 0 ? listMessage.map((item) => (
                                <div
                                    //  onClick={() => { route.push('/app/hotel/lichsu?page=notify') }}
                                    className='w-full text-lg font-medium leading-none text-blue-700
                            hover:bg-slate-100 bg-white justify-start items-center h-auto'>
                                    <div className=' flex flex-row w-full'>
                                        <img src='/icon/thongbaotrong.webp' className='w-10 h-10 rounded-full' />
                                        <div className='flex flex-col justify-center items-start p-2'>
                                            <span className='text-md h-auto '>{item.Information}</span>
                                            <p className='text-sm'>{(FormatDate(item.created_at))}</p>
                                        </div>
                                    </div>
                                </div>
                            )) :
                                <div className='flex w-full flex-col justify-center items-center p-2 hover:bg-white'>
                                    <img src='/icon/thongbaotrong.webp' className='w-20 h-20 rounded-full' />
                                    <p>Chưa tìm thấy thông báo nào</p>
                                </div>
                        }

                    </DropdownMenuItem>

                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem></DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    </div>);
}