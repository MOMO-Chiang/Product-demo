import React, { HTMLAttributes } from 'react';

export type DataTableWrapperProps = HTMLAttributes<HTMLElement>;

export const DataTableWrapper: React.FC<DataTableWrapperProps> = (props) => (
  <div
    {...props}
    className={`nrg-data-table-wrapper ${props.className || ''}`}
  />
);
