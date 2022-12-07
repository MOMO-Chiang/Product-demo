import React from 'react';

export type H2Props = React.HTMLAttributes<HTMLElement>;
export const H2: React.FC<H2Props> = (props) => (
  <h2 {...props} className={`nrg-h2 ${props.className || ''}`} />
);
