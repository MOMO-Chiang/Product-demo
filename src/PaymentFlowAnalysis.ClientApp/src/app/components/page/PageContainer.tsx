import React from 'react';

export type PageContainer = React.HTMLAttributes<HTMLElement>;

export const PageContainer: React.FC<PageContainer> = (props) => (
  <div
    {...props}
    className={`container-fluid nrg-page-container ${props.className || ''}`}
  />
);
