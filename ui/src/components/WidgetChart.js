import React, { useState } from "react"
import { Line, LineChart } from "recharts";

const WidgetChart = ({ name, color, height, width }) => {
  const [data] = useState([{
    name: name,
    uv: 0
  }, {
    name: name,
    uv: 500
  }, {
    name: name,
    uv: 350
  }, {
    name: name,
    uv: 0
  }])
  return (
    <LineChart height={height || 50} width={width || 50} data={data}>
      <Line
        isAnimationActive={false}
        type="monotone" dataKey="uv" stroke={color} strokeWidth={3} />
    </LineChart>
  )
}

export default WidgetChart;