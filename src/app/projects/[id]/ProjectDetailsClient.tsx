"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface MetricsProps {
  name: string;
  users: number;
}

export default function ProjectDetailsClient({
  metrics,
  isBn
}: {
  metrics: MetricsProps[];
  isBn: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={metrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="#475569"
            tick={{ fill: '#94a3b8' }}
            tickLine={{ stroke: '#475569' }}
          />
          <YAxis
            stroke="#475569"
            tick={{ fill: '#94a3b8' }}
            tickLine={{ stroke: '#475569' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#1e293b',
              color: '#f8fafc',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
            }}
            itemStyle={{ color: '#06b6d4' }}
            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="users"
            name={isBn ? 'ব্যবহারকারী' : 'Users'}
            stroke="#06b6d4"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}