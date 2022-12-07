import React from 'react';
import cx from 'classnames';

export type CardHeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const CardHeader: React.FC<CardHeaderProps> = (props) => (
  <div
    {...props}
    className={cx('card-header nrg-card-header', props.className || '')}
  />
);
