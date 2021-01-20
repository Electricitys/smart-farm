import React from "react"
import { Line, LineChart, YAxis } from "recharts";

const WidgetChart = ({ field, color, height, width, data }) => {
  return (
    <LineChart height={height || 50} width={width || 50} data={data}>
      <Line
        isAnimationActive={false}
        type="monotone" dataKey={field} stroke={color} strokeWidth={3} />
      <YAxis mirror/>
    </LineChart>
  )
}

export default WidgetChart;