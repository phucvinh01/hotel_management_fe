import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import VietnamMap from './viet-nam-map'
import BarChartTopBooking from './barchart-top-booking'
import TextRender from './TextRender'

const TabAnaLysis = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Số lượt đặt phòng ở các khu vực</CardTitle>                  
                  </CardHeader>
                  <CardContent>
                    <BarChartTopBooking/>
                  </CardContent>
                </Card>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Sự phân bố khách sạn trên hệ thống</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <VietnamMap/>
                  </CardContent>
                </Card>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Phân tích sự đặt phòng của khách hàng ở các khu vực</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TextRender/>
                  </CardContent>
                </Card>
              </div>
  )
}

export default TabAnaLysis