    
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x} y={y } fill="white" textAnchor={x>cx? 'start' : 'end'} dominantBaseline="central">
      
    </text>
  )
}

export default function MyPieChart({ data } )  {
  // console.log(data)
  return (
    <ResponsiveContainer width="100%" height={100}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#0088FE"
          dataKey="value">
          {data.map((entry, index) =>( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}

        </Pie>
        <Legend iconType='rect' verticalAlign="bottom" />
        </PieChart>

        </ResponsiveContainer>
        );
        
}

