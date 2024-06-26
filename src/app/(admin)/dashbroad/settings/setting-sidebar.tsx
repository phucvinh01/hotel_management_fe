"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SettingsIcon, User } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-4",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
           
            pathname === item.href
              ? "bg-cyan-400"
              : "hover:bg-transparent hover:underline",
            "justify-start p-3 flex gap-4 items-center  rounded-3xl"
          )}
        >
         <SettingsIcon/> {item.title}
        </Link>
      ))}
    </nav>
  )
}