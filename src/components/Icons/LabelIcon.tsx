import React from 'react';

const LabelIcon = ({ num, fill }: { num: number; fill?: string }) => (
  <svg viewBox="0 0 48 50" version="1.1">
    <title>Group</title>
    <g id="Landing" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop/Landing-Sponsor" transform="translate(-109.000000, -1338.000000)">
        <g id="Group" transform="translate(109.000000, 1338.000000)">
          <path
            d="M7.11111111,0 L48,0 L48,0 L48,42.6666667 C48,46.5940249 44.8162471,49.7777778 40.8888889,49.7777778 L0,49.7777778 L0,49.7777778 L0,7.11111111 C-3.1132385e-15,3.18375289 3.18375289,2.49780084e-15 7.11111111,0 Z"
            id="Rectangle"
            fill={fill}
          />
          <text
            id="1"
            fontFamily="Poppins-Bold, Poppins"
            fontSize="24.8888889"
            fontWeight="bold"
            letterSpacing="30.2222222"
            fill="#FFFFFF"
          >
            <tspan x={num == 1 ? '20' : '16'} y="33">
              {num}
            </tspan>
          </text>
        </g>
      </g>
    </g>
  </svg>
);

export default LabelIcon;
