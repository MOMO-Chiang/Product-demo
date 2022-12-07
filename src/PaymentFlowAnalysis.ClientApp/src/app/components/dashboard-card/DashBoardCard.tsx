import React from 'react';
import cx from 'classnames';

export type DashBoardCardProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const DashBoardCard: React.FC<DashBoardCardProps> = (props) => (
  <div className={cx('bg-success nrg-dashboard-card', props.className || '')}>
    <div {...props} className="inner" />
  </div>
);

export const DashBoardCardIcon: React.FC<DashBoardCardProps> = (props) => (
  <div className={cx('bg-success nrg-dashboard-card-icon', props.className || '')}>
    <div {...props} className="inner" />
  </div>
);
