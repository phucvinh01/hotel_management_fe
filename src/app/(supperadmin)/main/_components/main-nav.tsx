import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/main/overview"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Tổng Quan
      </Link>
      <Link
        href="/main/analysis"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Phân tích
      </Link>
      <Link
        href="/main/hotel"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Khách sạn
      </Link>
      <Link
        href="/main/user"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        User
      </Link>
    </nav>
  )
}