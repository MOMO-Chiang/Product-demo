import React from 'react';
import './spinner.scss';
import spinnerSVG from '@shared/assets/spinners/Spinner-1s-120px.svg';

export type SpinnerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Spinner: React.FC<SpinnerProps> = (props) => {
  return (
    <div className={`ldio-spinner ${props.className || ''}`}>
      <img src={spinnerSVG} alt="spinner" />
    </div>
  );
};
