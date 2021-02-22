import React from "react";
import moment from "moment";
import { scaleTime, timeDay } from "d3";
import { AreaChart, Area, Tooltip, YAxis, XAxis } from "recharts";

const HeroWidget = ({ width, height, fields, data, selected, range }) => {
  const scale = scaleTime();
  const domain = scale.domain([moment(range[0]).unix(), moment(range[1]).unix()])
  const ticks = domain.ticks(timeDay.every(1));
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
      <Tooltip
        labelFormatter={(label) => {
          return moment.unix(label).format("dddd, Do MMM");
          // return moment.unix(label).format("HH:mm:ss");
        }} />
      {selected.map((item, idx) => {
        const field = fields.find(({ field }) => field === item);
        return (
          <Area
            name={field.name}
            dot={{ stroke: field.color, strokeWidth: 2 }}
            key={`${item}-area`}
            yAxisId={idx}
            isAnimationActive={false}
            type="monotone"
            dataKey={item}
            stroke={field.color}
            strokeWidth={8}
            fillOpacity={1 / selected.length * 1.5}
            fill="url(#colorUv)"
          />
        )
      })}
      {selected.map((item, idx) => (
        <YAxis
          key={`${item}-yaxis`}
          yAxisId={idx}
          mirror
          tick={{
            fill: fields.find(({ field }) => field === item).color
          }}
          axisLine={{
            stroke: fields.find(({ field }) => field === item).color
          }} />
      ))}
      <XAxis
        mirror
        tick={{
          fill: "white",
        }}
        tickSize={25}
        tickLine={{
          stroke: "white"
        }}
        dataKey="time"
        type="number"
        scale="time"
        tickFormatter={(tick) => {
          // return moment.unix(tick).format("HH:mm:ss");
          return moment.unix(tick).format("ddd");
        }}
        ticks={ticks}
        // domain={domain}
        domain={['dataMin', 'dataMax']}
        // domain={[moment(range[0]).unix(), moment(range[1]).unix()]}
      />
    </AreaChart>
  )
}

export default HeroWidget;