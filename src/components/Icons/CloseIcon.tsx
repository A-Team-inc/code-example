import React from 'react';

interface ICloseIcon {
  width?: string;
  height?: string;
  gFill?: string;
}

const CloseIcon = ({ width = '16px', height = '16px', gFill = '#999' }: ICloseIcon) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
    <g fill="none" fillRule="evenodd">
      <g fill={gFill} fillRule="nonzero">
        <g>
          <path
            d="M9.409 7.995l6.295-6.286c.392-.392.392-1.027 0-1.42-.391-.391-1.027-.391-1.419 0L8 6.587 1.715.29C1.323-.102.687-.102.295.29c-.391.392-.391 1.027 0 1.419l6.296 6.286-6.295 6.286c-.19.188-.296.443-.296.71 0 .266.106.522.296.71.187.188.443.295.71.295.266 0 .52-.107.709-.296L8 9.404l6.285 6.296c.188.19.443.296.71.296.266 0 .522-.107.71-.296.189-.187.295-.443.295-.71 0-.266-.106-.521-.296-.709L9.41 7.995z"
            transform="translate(-790 -162) translate(776 148) translate(14 14)"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default CloseIcon;
