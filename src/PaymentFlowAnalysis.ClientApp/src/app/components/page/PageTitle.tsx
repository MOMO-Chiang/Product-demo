import React from 'react';

export type PageTitleProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const PageTitle: React.FC<PageTitleProps> = (props) => (
  <h2 {...props} className={`nrg-page-title ${props.className || ''}`} />
);
