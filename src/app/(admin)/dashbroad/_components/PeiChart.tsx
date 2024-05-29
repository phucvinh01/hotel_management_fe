import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IGetRenvenuResutl } from '@/service/hotel.service';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';


const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS_LIGHT = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7B68EE', '#4CAF50', '#FFA07A', '#36A2EB', '#FFD700', '#9370DB'];
const COLORS_DARK = ['#42a5f5', '#66bb6a', '#f9ce1d', '#ef5350', '#ab47bc', '#26a69a', '#ff7043', '#78909c', '#ec407a', '#8d6e63'];


// Trong đó, prefersDarkMode là biến kiểm tra chế độ dark mode

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
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={data?.booking_rate_typeroom}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data?.booking_rate_typeroom.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS_LIGHT[index % COLORS_LIGHT.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" align="right" verticalAlign="middle" />
    </PieChart>
  </ResponsiveContainer>
  <CardFooter>{/* Đây là phần chân trang của thẻ Card */}</CardFooter>
</Card>

  );
};
