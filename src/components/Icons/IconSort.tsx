import React from 'react';

interface IconSort {
  fill?: string;
  className?: string;
}

const IconSort = ({ fill = '#666', className }: IconSort) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <path
              d="M0 0L24 0 24 24 0 24z"
              transform="translate(-588 -158) translate(580 153) translate(8 5)"
            />
            <path
              className={`${className}__path`}
              fill={fill}
              fillRule="nonzero"
              d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
              transform="translate(-588 -158) translate(580 153) translate(8 5)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default IconSort;
