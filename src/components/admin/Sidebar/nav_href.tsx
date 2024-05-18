import { CalendarDaysIcon, ClipboardMinusIcon, HomeIcon, LayoutDashboardIcon, MessageCircleIcon, SettingsIcon, Users2Icon } from "lucide-react";

export const sidebar_link = [
    {
        id:1 ,
        title:"Dashbroad",
        href: "/dashbroad",
        icon: <LayoutDashboardIcon />
    },
    {
        id:2,
        title:"Booking",
        href: "/booking",
        icon: <CalendarDaysIcon />
    },
     {
        id:3,
        title:"Room",
        href: "/room",
        icon: <HomeIcon />
    },
     {
        id:4,
        title:"Report",
        href: "/report",
        icon: <ClipboardMinusIcon />
    },
      {
        id:5,
        title:"Customer",
        href: "/cusomer",
        icon: <Users2Icon />
    },
      {
        id:6,
        title:"Support",
        href: "/support",
        icon: <MessageCircleIcon />
    },
      {
        id:7,
        title:"Setting",
        href: "/setting",
        icon: <SettingsIcon />
    },
]