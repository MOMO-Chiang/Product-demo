import React from 'react';

export type PageHeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const PageHeader: React.FC<PageHeaderProps> = (props) => (
  <header {...props} className={`nrg-page-header ${props.className || ''}`} />
);
