import React from 'react';
import cx from 'classnames';

export type CardBodyProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const CardBody: React.FC<CardBodyProps> = (props) => (
  <div
    {...props}
    className={cx('card-body nrg-card-body', props.className || '')}
  />
);
