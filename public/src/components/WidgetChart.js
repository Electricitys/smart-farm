import React from "react";
import moment from "moment";
import { Line, LineChart, YAxis, XAxis } from "recharts";

const WidgetChart = ({ label, field, color, height, width, data }) => {
  return (
    <LineChart height={height || 50} width={width || 50} data={data}>
      <Line
        label={label}
        isAnimationActive={false}
        type="monotone" dataKey={field} stroke={color} strokeWidth={3} />
      <YAxis mirror />
      <XAxis
        mirror
        dataKey="time"
        scale="time"
        type="number"
        tickFormatter={(tick) => {
          // return moment.unix(tick).format("HH:mm:ss");
          return moment.unix(tick).format("ddd");
        }}
        domain={['dataMin', 'dataMax']} />
    </LineChart>
  )
}

export default WidgetChart;