import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/formatCurrency";
import { TopHotelRevenue } from "@/service/_superadmin.service";

type RecentSalesProps = {
  data:TopHotelRevenue[]
}

export function RecentSales({data}:RecentSalesProps) {

  return (
    <div className="space-y-8">
      {
        data && data.map((item, index) =>
        <div className="flex items-center" key={index}>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{item.hotel_name}</p>
          <p className="text-sm text-muted-foreground">
            {item.staff_email}
          </p>
        </div>
        <div className="ml-auto font-medium">{formatCurrency(item.total_revenue)}</div>
      </div>
        
        )
      }
    </div>
  )
}