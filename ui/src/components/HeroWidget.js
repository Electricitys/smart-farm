import React from "react";
import { AreaChart, Area, Tooltip, YAxis } from "recharts";

const HeroWidget = ({ width, height, fields, data, selected }) => {
  return (
    <AreaChart
      height={height || 50}
      width={width || 50}
      data={data}
      margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="#11181f" stopOpacity={1} />
          <stop offset="90%" stopColor="#2c3e50" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Tooltip />
      {selected.map((item, idx) => (
        <Area
          key={`${item}-area`}
          yAxisId={idx}
          isAnimationActive={false}
          type="monotone"
          dataKey={item}
          stroke={fields.find(({ field }) => field === item).color}
          strokeWidth={8}
          fillOpacity={0.75}
          fill="url(#colorUv)"
        />
      ))}
      {selected.map((item, idx) => (
        <YAxis
          key={`${item}-yaxis`}
          yAxisId={idx}
          mirror
          axisLine={{
            stroke: fields.find(({ field }) => field === item).color
          }} />
      ))}
      {/* <Area
        isAnimationActive={false}
        type="monotone" dataKey="uv" stroke="#34495e" strokeWidth={8} fillOpacity={1} fill="url(#colorUv)" /> */}
    </AreaChart>
  )
}

export default HeroWidget;