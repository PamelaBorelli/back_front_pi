import React from 'react';

const Legend = ({ items }) => (
  <div className="legend">
    {items.map((item, index) => (
      <div key={index} className="legend-item">
        <span className="legend-color" style={{ backgroundColor: item.color }}></span>
        <span className="legend-label">{item.label}</span>
      </div>
    ))}
  </div>
);

export default Legend;
