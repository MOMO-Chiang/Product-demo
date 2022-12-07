import React from 'react';
import cx from 'classnames';

export type CardFooterProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const CardFooter: React.FC<CardFooterProps> = (props) => (
  <div
    {...props}
    className={cx('card-footer nrg-card-footer', props.className || '')}
  />
);
