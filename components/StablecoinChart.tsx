
import React, { useState, useEffect, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { StablecoinData } from '../types';

const LAMBO_PRICE = 200_000;

function parseCSV(text: string): StablecoinData[] {
  const lines = text.trim().split('\n');
  const rows = lines.slice(1);
  return rows.map(line => {
    const cols = line.split(',').map(c => c.replace(/"/g, '').trim());
    const dateStr = cols[0].slice(0, 7); // "2021-03"
    const ethereum = parseFloat(cols[1]) || 0;
    const tron = parseFloat(cols[2]) || 0;
    const solana = parseFloat(cols[3]) || 0;
    const bnb = parseFloat(cols[4]) || 0;
    const rest = cols.slice(5).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
    const total = ethereum + tron + solana + bnb + rest;
    return {
      date: dateStr,
      ethereum: +(ethereum / 1e9).toFixed(2),
      tron: +(tron / 1e9).toFixed(2),
      solana: +(solana / 1e9).toFixed(2),
      bnb: +(bnb / 1e9).toFixed(2),
      others: +(rest / 1e9).toFixed(2),
      total: +(total / 1e9).toFixed(2),
    };
  });
}

function formatLambos(billions: number): string {
  const count = Math.round((billions * 1e9) / LAMBO_PRICE);
  return count.toLocaleString();
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="retro-bevel bg-[#ffffcc] p-2 text-xs border border-black shadow-md">
        <p className="font-bold border-b border-black mb-1">{`Date: ${label}`}</p>
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

const LamboTooltip: React.FC<{ x: number; y: number; value: number }> = ({ x, y, value }) => {
  return (
    <div
      className="comic-sans"
      style={{
        position: 'absolute',
        left: x + 12,
        top: y - 40,
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        background: '#ffffe1',
        border: '1px solid #000',
        boxShadow: '2px 2px 0px #808080',
        padding: '6px 8px',
        fontSize: '11px',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <img src="/lambo.png" alt="lambo" style={{ width: 28, height: 'auto', imageRendering: 'auto' }} />
        <div>
          <div style={{ fontWeight: 'bold' }}>${value}B =</div>
          <div style={{ color: '#c00' }}>{formatLambos(value)} Lambos!</div>
        </div>
      </div>
      <div style={{
        width: 0,
        height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid #000',
        marginLeft: 10,
      }} />
    </div>
  );
};

const CustomYTick = ({ x, y, payload, onHover, onLeave }: any) => {
  const label = `$${payload.value}B`;
  return (
    <g
      onMouseEnter={(e) => onHover(payload.value, x, y)}
      onMouseLeave={onLeave}
    >
      <text
        x={x}
        y={y}
        dy={4}
        textAnchor="end"
        fill="#000"
        fontSize={12}
        fontFamily="monospace"
        style={{ cursor: 'pointer' }}
      >
        {label}
      </text>
    </g>
  );
};

const StablecoinChart: React.FC = () => {
  const [data, setData] = useState<StablecoinData[]>([]);
  const [lamboTip, setLamboTip] = useState<{ x: number; y: number; value: number } | null>(null);

  useEffect(() => {
    fetch('/Stablecoin_Supply_by_Chain.csv')
      .then(res => res.text())
      .then(text => setData(parseCSV(text)))
      .catch(err => console.error('Failed to load CSV:', err));
  }, []);

  const handleYHover = useCallback((value: number, x: number, y: number) => {
    setLamboTip({ x, y, value });
  }, []);

  const handleYLeave = useCallback(() => {
    setLamboTip(null);
  }, []);

  if (data.length === 0) {
    return (
      <div className="h-[400px] w-full mt-4 flex items-center justify-center italic text-gray-500">
        Loading chart data...
      </div>
    );
  }

  return (
    <div className="h-[450px] w-full mt-4" style={{ position: 'relative' }}>
      <h2 className="text-2xl font-bold text-center mb-4 underline decoration-double">
        STABLECOIN SUPPLY BY CHAIN (2021-2026)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fontFamily: 'monospace' }}
            stroke="#000"
            interval={5}
            angle={-30}
            textAnchor="end"
            height={50}
          />
          <YAxis
            tick={<CustomYTick onHover={handleYHover} onLeave={handleYLeave} />}
            stroke="#000"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px', fontFamily: 'Comic Sans MS' }} />

          <Line
            name="Ethereum"
            type="monotone"
            dataKey="ethereum"
            stroke="#627EEA"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            name="Tron"
            type="monotone"
            dataKey="tron"
            stroke="#ff0000"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            name="Solana"
            type="monotone"
            dataKey="solana"
            stroke="#9945FF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            name="BNB Chain"
            type="monotone"
            dataKey="bnb"
            stroke="#F3BA2F"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            name="Total"
            type="monotone"
            dataKey="total"
            stroke="#008000"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      {lamboTip && <LamboTooltip x={lamboTip.x} y={lamboTip.y} value={lamboTip.value} />}
    </div>
  );
};

export default StablecoinChart;
