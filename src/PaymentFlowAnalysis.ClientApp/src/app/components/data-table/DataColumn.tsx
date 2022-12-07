import React, { HTMLAttributes } from 'react';

export type DataColumnProps = HTMLAttributes<HTMLTableCellElement>;

export const DataColumn: React.FC<DataColumnProps> = (props) => (
  <td {...props} className={`nrg-data-table-column ${props.className || ''}`} />
);
