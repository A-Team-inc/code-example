import React from 'react';

interface ISpinner {
  width?: string;
  height?: string;
  style?: string;
}

const Spinner = ({
  width = '200px',
  height = '200px',
  style = 'margin: auto; display: block; shape-rendering: auto;'
}: ISpinner) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={style}
    width={width}
    height={height}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#1ea0c0"
      strokeWidth="10"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
  </svg>
);

export default Spinner;
