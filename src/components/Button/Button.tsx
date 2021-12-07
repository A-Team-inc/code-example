import React, { ReactNode } from 'react';

import { Link } from 'components/link/Link';

import s from './Button.scss';

interface ButtonProps {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  href?: string;
  className?: string;
  withArrow?: boolean;
  onClick?(): void;
}

export const Button = ({ children, href, onClick, className, primary, secondary, withArrow, ...rest }: ButtonProps) => {
  const passProps = { ...rest };
  const isLink = typeof href !== 'undefined';

  passProps.className = s(s.button, className, { primary, secondary, withArrow });

  if (isLink) {
    return (
      <Link className={s.button} to={href || '#'} {...passProps}>
        {children}
        {withArrow && <span className={s.arrow}>&rarr;</span>}
      </Link>
    );
  }

  return (
    <button className={s.button} onClick={onClick} {...passProps}>
      {children}
      {withArrow && <span className={s.button__arrow}>&rarr;</span>}
    </button>
  );
};
