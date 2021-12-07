import React from 'react';

const ArrowIcon = ({ fill, rotate }: { fill: string; rotate?: string }) => (
  <svg width="13px" height="12px" viewBox="0 0 8 12" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-241.000000, -181.000000)" fill={fill}>
        <g transform="translate(241.000000, 181.000000)">
          <polygon
            transform={
              rotate || 'translate(3.705000, 6.000000) rotate(270) translate(-3.705000, -6.000000)'
            }
            points="7.41 1.41 6 0 1.24344979e-14 6 6 12 7.41 10.59 2.83 6"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default ArrowIcon;
