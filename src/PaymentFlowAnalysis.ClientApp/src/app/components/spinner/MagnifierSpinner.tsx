import React from 'react';
import './magnifier-spinner.scss';
import magnifierSVG from '@shared/assets/spinners/Magnify-1s-80px.svg';

export type MagnifierSpinnerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

/**
 * 放大鏡 Spinner 元件
 * @returns MagnifierSpinner
 */
export const MagnifierSpinner: React.FC<MagnifierSpinnerProps> = (props) => (
  <div className={`ldio-magnifier-spinner ${props.className || ''}`}>
    <img src={magnifierSVG} />
  </div>
);
