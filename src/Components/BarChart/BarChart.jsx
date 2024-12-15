import { BarChart, ResponsiveContainer } from 'recharts';
import styles from './BarChart.module.css';

import { XAxis, YAxis } from 'recharts';



export default function BarChartComponent({data}) {
  return (
    <div className={styles.barChart}>
      <h2>Top Expenses</h2>
      <div className={styles.barContainer}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" axisLine={false} display="none" />
            <YAxis type="category" axisLine={false} dataKey="name" width={100}/>
            

          </BarChart>

        </ResponsiveContainer>

      </div>
    
    </div>
  );
}

