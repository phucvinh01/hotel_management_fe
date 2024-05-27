import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IGetRenvenuResutl } from '@/service/hotel.service';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const BarChartComponent = ({ series }: { series: IGetRenvenuResutl | undefined }) => {
  const currentDate = new Date();

  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const formatDate = (date: any) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const firstDayOfWeekFormatted = formatDate(firstDayOfWeek);

  const todayFormatted = formatDate(currentDate);

  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex w-full flex-wrap gap-3 sm:gap-5 mb-3'>
          <div className='flex'>
            <CardTitle>
              <p className='font-semibold text-primary'>Tổng doanh thu</p>
              <p className='text-sm font-medium'>
                {firstDayOfWeekFormatted} - {todayFormatted}
              </p>
            </CardTitle>
          </div>
        </div>
        <Tabs
          defaultValue='week'
          className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='week'>Tuần</TabsTrigger>
            <TabsTrigger value='month'>Tháng</TabsTrigger>
          </TabsList>
          <TabsContent value='week'>
            <ResponsiveContainer
              width='100%'
              height={350}>
              <BarChart data={series?.week.revenueByDay}>
                <XAxis
                  dataKey='name'
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar
                  dataKey='total'
                  fill='currentColor'
                  radius={[4, 4, 0, 0]}
                  className='fill-primary'
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value='month'>
            <ResponsiveContainer
              width='100%'
              height={350}>
              <BarChart data={series?.month.revenueByWeek}>
                <XAxis
                  dataKey='name'
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar
                  dataKey='total'
                  fill='currentColor'
                  radius={[4, 4, 0, 0]}
                  className='fill-primary'
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
