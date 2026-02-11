
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';
import { STABLECOIN_HISTORY } from '../constants';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="retro-bevel bg-[#ffffcc] p-2 text-xs border border-black shadow-md">
        <p className="font-bold border-b border-black mb-1">{`Time: ${label}`}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {`${p.name}: $${p.value}B`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StablecoinChart: React.FC = () => {
  return (
    <div className="h-[400px] w-full mt-4">
      <h2 className="text-2xl font-bold text-center mb-4 underline decoration-double">
        STABLECOIN MARKET CAP GROWTH (2018-2024)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={STABLECOIN_HISTORY} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12, fontFamily: 'monospace' }}
            stroke="#000"
          />
          <YAxis 
            tickFormatter={(value) => `$${value}B`}
            tick={{ fontSize: 12, fontFamily: 'monospace' }}
            stroke="#000"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px', fontFamily: 'Comic Sans MS' }} />
          
          <Line 
            name="ETH (USDC/USDT)" 
            type="stepAfter" 
            dataKey="eth" 
            stroke="#0000ff" 
            strokeWidth={3}
            dot={{ r: 6, fill: '#0000ff', stroke: '#000', strokeWidth: 1 }}
            activeDot={{ r: 8 }}
          />
          <Line 
            name="TRON (USDT)" 
            type="stepAfter" 
            dataKey="tron" 
            stroke="#ff0000" 
            strokeWidth={3}
            dot={{ r: 6, fill: '#ff0000', stroke: '#000', strokeWidth: 1 }}
          />
          <Line 
            name="TOTAL" 
            type="monotone" 
            dataKey="total" 
            stroke="#008000" 
            strokeWidth={2}
            strokeDasharray="5 5"
          />

          {STABLECOIN_HISTORY.map((entry, index) => (
            entry.annotation ? (
              <ReferenceDot 
                key={index}
                x={entry.year} 
                y={entry.total} 
                r={15} 
                fill="yellow" 
                stroke="red" 
                strokeWidth={2}
                label={{ position: 'top', value: entry.annotation, fill: 'red', fontSize: 14, fontWeight: 'bold', fontFamily: 'Comic Sans MS' }}
              />
            ) : null
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StablecoinChart;
