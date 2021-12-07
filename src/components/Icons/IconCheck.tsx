import React from 'react';

const IconCheck = ({ fill = '#21A1BF' }: { fill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g fill={fill}>
        <g>
          <g>
            <path
              d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.04 9.96l-5.76 5.76c-.48.48-1.2.48-1.68 0l-2.64-2.64c-.48-.48-.48-1.2 0-1.68s1.2-.48 1.68 0l1.8 1.8 4.92-4.92c.48-.48 1.2-.48 1.68 0s.48 1.2 0 1.68z"
              transform="translate(-836 -1564) translate(130 1501) translate(706 63)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default IconCheck;
