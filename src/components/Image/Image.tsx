import React from 'react';

interface IProps {
  src: string;
  src2x?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Image = ({ src, src2x, alt, width, height, className, ...rest }: IProps) => {
  const srcSet = (!src2x) ? undefined : `${src} 1x, ${src2x} 2x`;

  return (
    <img
      src={src}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
};