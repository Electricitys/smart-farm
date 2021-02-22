import React from 'react';

const AspectRatio = ({ children, className = "", ratio, style = {} }) => {
  const r = ratio.split(":");
  const val = 100 / parseFloat(r[0]) * parseFloat(r[1]);
  return (
    <div className={className} style={{ position: 'relative', width: "100%", paddingTop: `${val}%`, ...style }}>
      <div style={{ position: 'absolute', top: 0, left: 0, height: "100%", width: "100%" }}>{children}</div>
    </div>
  )
};

export default AspectRatio;