import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IGetRenvenuResutl } from '@/service/hotel.service';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PeiChart = ({ data }: { data: IGetRenvenuResutl | undefined }) => {
  return (
     <Card>
      <CardContent className='p-4'>
        <div className='flex w-full flex-wrap gap-3 sm:gap-5 mb-3'>
          <div className='flex'>
            <CardTitle>
              <p className='font-semibold text-primary'>Tỷ lệ đặt phòng</p>
              <p className='text-sm font-medium'>
                {""}
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
          height='100%'>
          <PieChart
            width={400}
            height={400}>
            <Pie
              data={data?.bookingByWeek}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'>
              {data?.bookingByWeek.map((entry: any, index: any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value='month'>
        <ResponsiveContainer
          width='100%'
          height='100%'>
          <PieChart
            width={400}
            height={400}>
            <Pie
              data={data?.bookingByMonth}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'>
              {data?.bookingByMonth.map((entry: any, index: any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
    </CardContent>
    </Card>
  );
};
