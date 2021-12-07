import React from 'react';

interface IWatchIcon {
  isWatch?: boolean;
}

const WatchIcon = ({ isWatch }: IWatchIcon) =>
  isWatch ? (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>watchlist-fill</title>
      <g id="aseet-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="watchlist-fill">
          <polygon id="Path" points="0 0 20 0 20 20 0 20" />
          <path
            d="M14.2,2.5 L5.8,2.5 C4.9,2.5 4.2,3.3 4.2,4.2 L4.2,17.5 L10,15 L15.8,17.5 L15.8,4.2 C15.8,3.2 15.1,2.5 14.2,2.5 Z"
            id="Path"
            fill="#1EA0C0"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  ) : (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>watchlist-border</title>
      <g id="aseet-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="watchlist-border">
          <polygon id="Path" points="0 0 20 0 20 20 0 20" />
          <path
            d="M14.2,2.5 L5.8,2.5 C5,2.5 4.2,3.3 4.2,4.2 L4.2,17.5 L10,15 L15.8,17.5 L15.8,4.2 C15.8,3.2 15.1,2.5 14.2,2.5 Z M14.2,15 L10,13.2 L5.8,15 L5.8,4.2 L14.2,4.2 L14.2,15 L14.2,15 Z"
            id="Shape"
            fill="#666666"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );

export default WatchIcon;
