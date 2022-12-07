import React, { HTMLAttributes } from 'react';

export type DataTableHeaderProps = HTMLAttributes<HTMLElement>;

export const DataTableHeader: React.FC<DataTableHeaderProps> = (props) => (
  <div
    {...props}
    className={`nrg-data-table-header ${props.className || ''}`}
  />
);
