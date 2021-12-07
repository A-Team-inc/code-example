import React, { ReactNode } from 'react';

import s from './Container.scss';

interface ContainerProps {
  children: ReactNode;
  fullVH?: boolean;
  relative?: boolean;
  fullHeight?: boolean;
}

export const Container = ({ children, fullVH, relative, fullHeight }: ContainerProps) => (
  <section className={s(s.container, { fullVH, relative, fullHeight })}>{children}</section>
);
