import cn from 'classnames';
import React from 'react';

interface ISaveIcon {
  fill: string;
  stroke: string;
  strokeWidth: string;
  customClass?: string;
  isSaved?: boolean;
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
}

const SaveIcon = ({ fill, stroke, strokeWidth, onClick, isSaved, customClass }: ISaveIcon) => (
  <svg
    style={{ cursor: 'pointer' }}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    data-testid="save-icon"
    className={cn(customClass, { isSaved })}
  >
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <path d="M0 0L24 0 24 24 0 24z" transform="translate(-1279 -542) translate(1279 542)" />
          <path
            className="save_path"
            fill={fill}
            fillRule="nonzero"
            stroke={stroke}
            strokeWidth={strokeWidth}
            d="M12 20l-1.16-1.079C6.72 15.104 4 12.586 4 9.496 4 6.978 5.936 5 8.4 5c1.392 0 2.728.662 3.6 1.708C12.872 5.662 14.208 5 15.6 5 18.064 5 20 6.978 20 9.496c0 3.09-2.72 5.608-6.84 9.433L12 20z"
            transform="translate(-1279 -542) translate(1279 542)"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default SaveIcon;
